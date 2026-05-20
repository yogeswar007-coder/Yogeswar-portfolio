import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      if (barRef.current) barRef.current.style.height = pct * 100 + "%";
      if (dotRef.current) dotRef.current.style.top = pct * 100 + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 24,
        top: "50%",
        transform: "translateY(-50%)",
        height: 160,
        width: 2,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Track */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: "rgba(255,255,255,0.07)",
          borderRadius: 2,
        }}
      />
      {/* Fill */}
      <div
        ref={barRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "0%",
          background: "linear-gradient(to bottom, #6366f1, #a78bfa)",
          borderRadius: 2,
          boxShadow: "0 0 8px rgba(99,102,241,0.6)",
          transition: "height 0.08s linear",
        }}
      />
      {/* Glowing dot */}
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#a78bfa",
          boxShadow: "0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.4)",
          transition: "top 0.08s linear",
        }}
      />
    </div>
  );
}
