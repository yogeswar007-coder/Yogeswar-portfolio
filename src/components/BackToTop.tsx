import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 50,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.4)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease, background 0.2s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 0 16px rgba(99,102,241,0.2)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.25)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(99,102,241,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(99,102,241,0.2)";
      }}
    >
      <ArrowUp size={18} color="#a5b4fc" />
    </button>
  );
}
