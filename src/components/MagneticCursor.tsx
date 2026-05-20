import { useEffect, useRef } from "react";

type CursorMode = "default" | "interactive" | "heading";

const MODES: Record<CursorMode, { size: number; border: string; fill: string }> = {
  default: {
    size: 60,
    border: "rgba(255,255,255,0.3)",
    fill: "transparent",
  },
  interactive: {
    size: 80,
    border: "rgba(99,102,241,0.6)",
    fill: "rgba(99,102,241,0.12)",
  },
  heading: {
    size: 120,
    border: "rgba(255,255,255,0.15)",
    fill: "rgba(255,255,255,0.03)",
  },
};

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;
    let mode: CursorMode = "default";

    const applyMode = (nextMode: CursorMode) => {
      if (mode === nextMode) return;
      mode = nextMode;
      const config = MODES[nextMode];
      const half = config.size / 2;
      ring.style.width = `${config.size}px`;
      ring.style.height = `${config.size}px`;
      ring.style.marginLeft = `-${half}px`;
      ring.style.marginTop = `-${half}px`;
      ring.style.borderColor = config.border;
      ring.style.background = config.fill;
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("h1, h2")) {
        applyMode("heading");
        return;
      }
      if (target.closest("a, button, [data-cursor]")) {
        applyMode("interactive");
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (related?.closest("a, button, [data-cursor], h1, h2")) return;
      applyMode("default");
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          background: "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10002,
          marginLeft: -4,
          marginTop: -4,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 60,
          height: 60,
          border: "1px solid rgba(255,255,255,0.3)",
          background: "transparent",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10001,
          marginLeft: -30,
          marginTop: -30,
          transition:
            "width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease, background 0.25s ease",
          mixBlendMode: "normal",
        }}
      />
    </>
  );
}
