import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    color: "#6366f1",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "C", level: 65 },
    ],
  },
  {
    label: "AI / ML",
    color: "#06b6d4",
    skills: [
      { name: "PyTorch", level: 78 },
      { name: "scikit-learn", level: 80 },
      { name: "EEGNet", level: 72 },
      { name: "NumPy / Pandas", level: 85 },
      { name: "Matplotlib", level: 80 },
    ],
  },
  {
    label: "Tools & Frameworks",
    color: "#a78bfa",
    skills: [
      { name: "Firebase", level: 75 },
      { name: "Unity", level: 60 },
      { name: "Streamlit", level: 70 },
    ],
  },
  {
    label: "Domains",
    color: "#34d399",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Brain-Computer Interface", level: 72 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el || triggered.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setTimeout(() => {
            if (el) el.style.width = level + "%";
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: 13, color: "#d4d4d8" }}>
          {name}
        </span>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 12, color: "#71717a" }}>
          {level}%
        </span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: 0,
            borderRadius: 2,
            background: `linear-gradient(to right, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
            transition: `width 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay * 0.15}s`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      data-testid="skills-section"
      style={{ position: "relative", padding: "120px 48px", background: "#000" }}
    >
      {/* Subtle background glow */}
      <div style={{ position: "absolute", top: "30%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: "rgba(99,102,241,0.04)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", padding: "4px 14px", borderRadius: 9999, border: "1px solid rgba(99,102,241,0.4)", fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", color: "#a5b4fc", textTransform: "uppercase", marginBottom: 20 }}
            data-testid="skills-badge"
          >
            Skills
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "clamp(36px, 5vw, 56px)", color: "#fff", margin: 0, lineHeight: 1.1 }}
          >
            Tools of the trade.
          </motion.h2>
        </div>

        {/* Grid of skill groups */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: 32 }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              {/* Group label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: group.color, boxShadow: `0 0 10px ${group.color}` }} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: 13, color: group.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {group.label}
                </span>
              </div>

              {/* Skill bars */}
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={group.color}
                  delay={gi * 0.1 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
        >
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.12em" }}>Certifications</span>
          <div style={{ height: 1, width: 24, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 9999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.4)", boxShadow: "0 0 16px rgba(99,102,241,0.12)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#818cf8", boxShadow: "0 0 6px #6366f1" }} />
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#c7d2fe", fontWeight: 400 }}>Machine Learning Specialization — Andrew Ng, Coursera 2026</span>
          </div>
        </motion.div>
      </div>

      {/* Currently Exploring marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ marginTop: 72, position: "relative", overflow: "hidden" }}
      >
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #000, transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #000, transparent)", zIndex: 1, pointerEvents: "none" }} />

        {/* Label */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Currently Exploring
          </span>
        </div>

        {/* Scrolling track */}
        <div style={{ display: "flex", gap: 14, width: "max-content", animation: "marquee 22s linear infinite" }}>
          {[
            "Deep Learning",
            "Reinforcement Learning",
            "Transformer Architectures",
            "OpenBCI",
            "Signal Processing",
            "Motor Imagery Classification",
            "Stable Diffusion",
            "LLM Fine-tuning",
            "Neuromorphic Computing",
            "Deep Learning",
            "Reinforcement Learning",
            "Transformer Architectures",
            "OpenBCI",
            "Signal Processing",
            "Motor Imagery Classification",
            "Stable Diffusion",
            "LLM Fine-tuning",
            "Neuromorphic Computing",
          ].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 18px",
                borderRadius: 9999,
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.25)",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400, fontSize: 13,
                color: "#a5b4fc",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#818cf8", display: "inline-block", boxShadow: "0 0 4px #6366f1" }} />
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
