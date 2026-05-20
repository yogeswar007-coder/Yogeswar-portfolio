import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { clamp } from "../lib/motion";

interface NeuralNetworkCanvasProps {
  rotationBoost?: MotionValue<number>;
}

interface NodeData {
  base: THREE.Vector3;
  position: THREE.Vector3;
  phase: number;
  drift: number;
  radius: number;
  hub: boolean;
}

interface EdgeData {
  a: number;
  b: number;
  strong: boolean;
}

interface PulseData {
  edgeIndex: number;
  start: number;
  duration: number;
  active: boolean;
  fired: boolean;
}

const seededRandom = (seed: number) => {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

function buildNetwork() {
  const rand = seededRandom(2026);
  const nodes: NodeData[] = [];
  const hubs: number[] = [];
  const regulars: number[] = [];

  for (let i = 0; i < 80; i++) {
    const hub = i < 24;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const radius = 1.2 + rand() * 1.75;
    const base = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * radius,
      Math.cos(phi) * radius * 0.72,
      Math.sin(phi) * Math.sin(theta) * radius,
    );

    nodes.push({
      base,
      position: base.clone(),
      phase: rand() * Math.PI * 2,
      drift: 0.35 + rand() * 0.55,
      radius: hub ? 0.09 : 0.055,
      hub,
    });
    (hub ? hubs : regulars).push(i);
  }

  const edges: EdgeData[] = [];
  const seen = new Set<string>();
  const addEdge = (a: number, b: number, strong = false) => {
    if (a === b) return false;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) return false;
    seen.add(key);
    edges.push({ a, b, strong });
    return true;
  };

  for (let i = 0; i < nodes.length; i++) {
    const distances = nodes
      .map((node, index) => ({
        index,
        distance: node.base.distanceTo(nodes[i].base),
      }))
      .filter((item) => item.index !== i)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    distances.forEach((item) => {
      if (edges.filter((edge) => !edge.strong).length < 100) addEdge(i, item.index);
    });
  }

  while (edges.filter((edge) => !edge.strong).length < 100) {
    addEdge(Math.floor(rand() * nodes.length), Math.floor(rand() * nodes.length));
  }

  while (edges.filter((edge) => edge.strong).length < 15) {
    addEdge(
      hubs[Math.floor(rand() * hubs.length)],
      hubs[Math.floor(rand() * hubs.length)],
      true,
    );
  }

  return { nodes, edges, hubs, regulars };
}

function NeuralScene({
  rotationBoost,
  activeRef,
}: {
  rotationBoost?: MotionValue<number>;
  activeRef: MutableRefObject<boolean>;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const materialRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const lineRefs = useRef<Array<THREE.BufferGeometry<any> | undefined>>([]);
  const pulseRefs = useRef<THREE.Mesh[]>([]);
  const flareRef = useRef<number[]>(Array.from({ length: 80 }, () => 0));
  const mouseRef = useRef({ x: 0, y: 0 });
  const pulseA = useRef<PulseData>({ edgeIndex: 0, start: 0, duration: 0.7, active: false, fired: false });
  const pulseB = useRef<PulseData>({ edgeIndex: 1, start: 0, duration: 0.7, active: false, fired: false });
  const lastPulseA = useRef(0);
  const lastPulseB = useRef(0);
  const network = useMemo(buildNetwork, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const startPulse = (pulse: MutableRefObject<PulseData>, elapsed: number, preferStrong = false) => {
    const candidates = network.edges
      .map((edge, index) => ({ edge, index }))
      .filter(({ edge, index }) => (!preferStrong || edge.strong) && index !== pulseA.current.edgeIndex);
    const next = candidates[Math.floor(Math.random() * candidates.length)]?.index ?? 0;
    pulse.current = { edgeIndex: next, start: elapsed, duration: 0.7, active: true, fired: false };
  };

  const updatePulse = (pulse: PulseData, mesh: THREE.Mesh | undefined, elapsed: number) => {
    if (!mesh || !pulse.active) {
      if (mesh) mesh.visible = false;
      return;
    }

    const progress = (elapsed - pulse.start) / pulse.duration;
    const edge = network.edges[pulse.edgeIndex];
    const from = network.nodes[edge.a].position;
    const to = network.nodes[edge.b].position;

    if (progress >= 1) {
      mesh.visible = false;
      if (!pulse.fired) {
        flareRef.current[edge.b] = 1;
        pulse.fired = true;
      }
      pulse.active = false;
      return;
    }

    const point = from.clone().lerp(to, progress);
    mesh.visible = true;
    mesh.position.copy(point);
    mesh.scale.setScalar(0.9 + Math.sin(progress * Math.PI) * 0.45);
  };

  useFrame(({ clock }) => {
    if (!activeRef.current) return;

    const elapsed = clock.getElapsedTime();
    const root = rootRef.current;
    const group = groupRef.current;

    if (root) {
      const targetX = THREE.MathUtils.degToRad(mouseRef.current.y * -10);
      const targetY = THREE.MathUtils.degToRad(mouseRef.current.x * 10);
      root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, targetX, 0.04);
      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, targetY, 0.04);
    }

    if (group) {
      const boost = clamp(rotationBoost?.get() ?? 0, -1, 1);
      group.rotation.y += 0.0006 + boost * 0.004;
    }

    network.nodes.forEach((node, index) => {
      node.position.set(
        node.base.x + Math.sin(elapsed * node.drift + node.phase) * 0.11,
        node.base.y + Math.cos(elapsed * node.drift * 0.85 + node.phase) * 0.09,
        node.base.z + Math.sin(elapsed * node.drift * 0.6 + node.phase * 1.4) * 0.1,
      );

      const mesh = meshRefs.current[index];
      const material = materialRefs.current[index];
      if (mesh) mesh.position.copy(node.position);
      if (material) {
        flareRef.current[index] = Math.max(0, flareRef.current[index] - 0.04);
        material.emissiveIntensity = 0.8 + flareRef.current[index] * 2.2;
      }
    });

    network.edges.forEach((edge, index) => {
      const geometry = lineRefs.current[index];
      const attribute = geometry?.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (!attribute) return;
      const a = network.nodes[edge.a].position;
      const b = network.nodes[edge.b].position;
      attribute.setXYZ(0, a.x, a.y, a.z);
      attribute.setXYZ(1, b.x, b.y, b.z);
      attribute.needsUpdate = true;
    });

    if (elapsed - lastPulseA.current > 2.5) {
      lastPulseA.current = elapsed;
      startPulse(pulseA, elapsed);
    }
    if (elapsed - lastPulseB.current > 4) {
      lastPulseB.current = elapsed;
      startPulse(pulseB, elapsed, true);
    }

    updatePulse(pulseA.current, pulseRefs.current[0], elapsed);
    updatePulse(pulseB.current, pulseRefs.current[1], elapsed);
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#000000", 0.06]} />
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} color="#6366f1" intensity={2} distance={8} />
      <pointLight position={[-3, -2, -3]} color="#06b6d4" intensity={1.5} distance={6} />
      <group ref={rootRef}>
        <group ref={groupRef}>
          {network.edges.map((edge, index) => (
            <line key={`${edge.a}-${edge.b}-${index}`}>
              <bufferGeometry
                ref={(geometry) => {
                  if (geometry) lineRefs.current[index] = geometry;
                }}
              >
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array(6), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={edge.strong ? "#8b5cf6" : "#6366f1"}
                transparent
                opacity={edge.strong ? 0.35 : 0.12}
                depthWrite={false}
              />
            </line>
          ))}

          {network.nodes.map((node, index) => (
            <mesh
              key={index}
              ref={(mesh) => {
                if (mesh) meshRefs.current[index] = mesh;
              }}
            >
              <sphereGeometry args={[node.radius, 16, 16]} />
              <meshStandardMaterial
                ref={(material) => {
                  if (material) materialRefs.current[index] = material;
                }}
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.8}
                roughness={0.35}
                metalness={0.08}
              />
            </mesh>
          ))}

          {[0, 1].map((index) => (
            <mesh
              key={`pulse-${index}`}
              ref={(mesh) => {
                if (mesh) pulseRefs.current[index] = mesh;
              }}
              visible={false}
            >
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color={index === 0 ? "#6366f1" : "#8b5cf6"} transparent opacity={0.95} />
            </mesh>
          ))}
        </group>
      </group>
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} intensity={0.8} radius={0.6} />
        <Vignette darkness={0.6} offset={0.3} />
      </EffectComposer>
    </>
  );
}

export default function NeuralNetworkCanvas({ rotationBoost }: NeuralNetworkCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop="always"
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <NeuralScene rotationBoost={rotationBoost} activeRef={activeRef} />
      </Canvas>
    </div>
  );
}
