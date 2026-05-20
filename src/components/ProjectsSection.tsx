import { motion } from "framer-motion";
import { Award, Code, Cpu, ExternalLink, Zap } from "lucide-react";
import VelocitySkew from "./VelocitySkew";
import { CARD_SPRING, ENTRY_SPRING } from "../lib/motion";

const cards = [
  {
    icon: Code, iconColor: "#6366f1",
    title: "Streak — Habit Tracker",
    desc: "Full-stack habit tracking app with streak counters and progress analytics. React.js, TypeScript, Node.js, MongoDB, Firebase Auth.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    bottom: { type: "link", label: "GitHub", href: "https://github.com/yogeswar007-coder" },
  },
  {
    icon: Cpu, iconColor: "#06b6d4",
    title: "HybridMind — BCI Research",
    desc: "Real-time VR control via EEG motor imagery + eye tracking. Eye gaze = navigation. Hand imagination = action. No controller.",
    tags: ["Python", "EEGNet", "LSL", "Unity", "Meta Quest"],
    bottom: { type: "tag", label: "Ongoing Research", color: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.4)", text: "#06b6d4" },
  },
  {
    icon: Award, iconColor: "#f59e0b",
    title: "Winner — HackAIthon 2026",
    desc: "AI-driven educational platform for personalized learning at the AI Agents Summit 2026. Led full development workflow end-to-end.",
    tags: ["AI Agents", "EdTech"],
    bottom: { type: "tag", label: "AI Agents Summit 2026 🏆", color: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#f59e0b" },
  },
  {
    icon: Zap, iconColor: "#6366f1",
    title: "Finalist — Agentica 2026",
    desc: "AI-powered document management platform with intelligent automation features. Built at Abhisarga'25.",
    tags: ["AI", "Document AI"],
    bottom: { type: "tag", label: "Abhisarga'25", color: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.3)", text: "#a5b4fc" },
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      style={{ position: "relative", padding: "120px 48px", overflow: "hidden", background: "#000" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/features-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, #000 0%, #000 20%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.22) 58%, #000 80%, #000 100%)",
          pointerEvents: "none",
        }}
      />

      <VelocitySkew style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ type: "spring", ...ENTRY_SPRING }}
            className="badge-pill"
            style={{ marginBottom: 20 }}
            data-testid="projects-badge"
          >
            Projects
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.1 }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "#fff",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Things I've<br />built and shipped.
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 24 }}>
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ type: "spring", ...ENTRY_SPRING, delay: index * 0.15 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 0 40px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                  transition: { type: "spring", ...CARD_SPRING },
                }}
                data-testid={`project-card-${index}`}
                className="project-card"
                style={{
                  borderRadius: 16,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  minHeight: 308,
                }}
              >
                <div
                  className="project-icon-wrap"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="project-icon-inner" style={{ display: "flex" }}>
                    <Icon size={20} color={card.iconColor} />
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 20, color: "#fff", margin: "0 0 8px" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.65, color: "#71717a", margin: 0 }}>
                    {card.desc}
                  </p>
                </div>

                {index === 0 && (
                  <div style={{ display: "flex", alignItems: "end", gap: 5, height: 24, marginTop: -2 }}>
                    {[12, 20, 16].map((height, barIndex) => (
                      <span
                        key={height}
                        className="mini-bar"
                        style={{
                          width: 6,
                          height,
                          borderRadius: 999,
                          background: "rgba(99,102,241,0.3)",
                          animationDelay: `${barIndex * 0.25}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 9999,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 11,
                        color: "#71717a",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginTop: 2 }} />

                <div style={{ marginTop: "auto" }}>
                  {card.bottom.type === "link" ? (
                    <a
                      href={(card.bottom as { href: string }).href}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`project-link-${index}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#a5b4fc",
                        textDecoration: "none",
                      }}
                    >
                      <ExternalLink size={13} /> {card.bottom.label}
                    </a>
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "4px 12px",
                        borderRadius: 9999,
                        background: (card.bottom as { color: string }).color,
                        border: `1px solid ${(card.bottom as { border: string }).border}`,
                        color: (card.bottom as { text: string }).text,
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 12,
                      }}
                    >
                      {card.bottom.label}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </VelocitySkew>
    </section>
  );
}
