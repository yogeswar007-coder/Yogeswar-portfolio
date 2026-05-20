import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TorusKnotCanvas from "./TorusKnotCanvas";
import VelocitySkew from "./VelocitySkew";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "9.0", label: "CGPA" },
  { value: "2×", label: "Hackathon Winner" },
  { value: "1", label: "Honours Research" },
  { value: "40+", label: "LeetCode" },
];

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !/^[0-9]/.test(value)) return;

    const target = parseFloat(value);
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        if (!ref.current) return;
        ref.current.textContent = value.endsWith("+")
          ? `${Math.floor(obj.val)}+`
          : value.endsWith("×")
          ? `${Math.floor(obj.val)}×`
          : obj.val.toFixed(value.includes(".") ? 1 : 0);
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      tween.kill();
      trigger.kill();
    };
  }, [value]);

  return (
    <div className="stat-item" style={{ textAlign: "center", padding: "0 16px", flex: "1 1 120px" }}>
      <div
        className="stat-number"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: 48,
          color: "#fff",
          lineHeight: 1,
          transition: "text-shadow 0.3s ease",
        }}
      >
        {/^[0-9]/.test(value) ? <span ref={ref}>0</span> : <span>{value}</span>}
      </div>
      <div
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          color: "#71717a",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-testid="about-section"
      className="scan-line"
      style={{ position: "relative", padding: "120px 48px", overflow: "hidden", background: "#000" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/intro-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, #000 0%, #000 20%, rgba(0,0,0,0.15) 42%, rgba(0,0,0,0.15) 58%, #000 80%, #000 100%)",
          pointerEvents: "none",
        }}
      />

      <VelocitySkew
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 64,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 55%", minWidth: 320 }}>
          <div className="badge-pill about-reveal" style={{ marginBottom: 24 }} data-testid="about-badge">
            About Me
          </div>

          <h2
            className="about-reveal"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 4vw, 56px)",
              color: "#fff",
              margin: "0 0 24px",
              lineHeight: 1.15,
            }}
          >
            Code, cognition,<br />and curiosity.
          </h2>

          <p
            className="about-reveal"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.75,
              color: "#a1a1aa",
              maxWidth: 500,
              marginBottom: 34,
            }}
            data-testid="about-description"
          >
            I'm Yogeswar Stalin, a second-year B.Tech CSE student at IIIT Sri City with a 9 CGPA.
            I work at the intersection of AI, machine learning, and brain-computer interfaces — building
            systems that blur the line between human intention and machine response.
          </p>

          <div
            ref={lineRef}
            className="about-reveal"
            style={{ height: 1, width: "100%", maxWidth: 560, background: "rgba(99,102,241,0.6)", marginBottom: 32 }}
          />

          <div
            className="about-reveal liquid-glass-soft"
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap", padding: 32, gap: 16 }}
            data-testid="about-stats"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", flex: "1 1 140px" }}>
                <StatCounter value={stat.value} label={stat.label} />
                {index < stats.length - 1 && (
                  <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.1)" }} className="desktop-only" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: "1 1 35%", minWidth: 300, display: "flex", justifyContent: "center" }}>
          <TorusKnotCanvas />
        </div>
      </VelocitySkew>
    </section>
  );
}
