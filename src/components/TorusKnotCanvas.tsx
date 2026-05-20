import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { TORUS_SPRING } from "../lib/motion";

function TorusScene({ activeRef }: { activeRef: MutableRefObject<boolean> }) {
  const mainRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const smallRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!activeRef.current) return;
    const elapsed = clock.getElapsedTime();

    if (mainRef.current) {
      mainRef.current.rotation.x += 0.006;
      mainRef.current.rotation.y += 0.009;
    }
    if (orbitRef.current) {
      orbitRef.current.position.set(Math.cos(elapsed * 0.55) * 1.25, Math.sin(elapsed * 0.55) * 0.8, Math.sin(elapsed * 0.55) * 0.6);
      orbitRef.current.rotation.y += 0.014;
    }
    if (smallRef.current) {
      smallRef.current.rotation.x -= 0.011;
      smallRef.current.rotation.y += 0.015;
    }
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[0, 0, 2]} color="#6366f1" intensity={3} distance={5} />
      <mesh ref={mainRef}>
        <torusKnotGeometry args={[1, 0.28, 180, 18]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.7}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <group ref={orbitRef}>
        <mesh ref={smallRef} scale={0.35}>
          <torusKnotGeometry args={[1, 0.28, 120, 12]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.55}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </>
  );
}

export default function TorusKnotCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
      transition={{ type: "spring", ...TORUS_SPRING }}
      style={{
        width: 360,
        height: 360,
        position: "relative",
      }}
    >
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <TorusScene activeRef={activeRef} />
      </Canvas>
    </motion.div>
  );
}
