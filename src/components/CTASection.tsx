import { motion, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import VelocitySkew from "./VelocitySkew";
import { ENTRY_SPRING } from "../lib/motion";
import { useLenisProgress } from "../hooks/useLenisProgress";

export default function CTASection() {
  const progress = useLenisProgress();
  const orb1Raw = useTransform(progress, (latest) => {
    if (latest <= 0.75) return 500;
    return Math.min(820, 500 + (latest - 0.75) * 4 * 800);
  });
  const orb1Size = useSpring(orb1Raw, { stiffness: 20, damping: 15 });

  return (
    <section
      id="contact"
      data-testid="contact-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 48px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: orb1Size,
          height: orb1Size,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.12)",
          filter: "blur(130px)",
          animation: "orbDrift1 22s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "75%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(6,182,212,0.08)",
          filter: "blur(120px)",
          animation: "orbDrift2 18s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(139,92,246,0.07)",
          filter: "blur(110px)",
          transform: "translate(-50%, -50%)",
          animation: "orbBreathe 6s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <VelocitySkew style={{ position: "relative", zIndex: 1, maxWidth: 660 }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 18,
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: "#a1a1aa",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34,197,94,0.65)",
              animation: "pulse 1.8s ease-in-out infinite",
            }}
          />
          Available for opportunities
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.05 }}
          className="badge-pill"
          style={{ marginBottom: 28 }}
          data-testid="contact-badge"
        >
          Let's Connect
        </motion.div>

        <motion.h2
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(40px, 6vw, 72px)",
            background: "linear-gradient(to right, #fff 0%, #fff 45%, #e4e4e7 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            margin: "0 0 4px",
            lineHeight: 1.1,
          }}
        >
          Open to internships
        </motion.h2>
        <motion.h2
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.1 }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(40px, 6vw, 72px)",
            background: "linear-gradient(to right, #fff 0%, #fff 45%, #e4e4e7 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            margin: "0 0 24px",
            lineHeight: 1.1,
          }}
        >
          and collaborations.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.25 }}
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "#a1a1aa", marginBottom: 40 }}
          data-testid="contact-description"
        >
          I'm looking for AI/ML internship opportunities starting late 2026.<br />
          If you're building something interesting, let's talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.4 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}
        >
          <a
            href="mailto:syogeswar2007@gmail.com"
            data-testid="contact-email"
            className="mail-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "#4f46e5",
              color: "#fff",
              borderRadius: 8,
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.3s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "scale(1.04)";
              event.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.5)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "scale(1)";
              event.currentTarget.style.boxShadow = "none";
            }}
          >
            <Mail size={14} /> Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/yogeswar-stalin-a8bb32332"
            target="_blank"
            rel="noreferrer"
            data-testid="contact-linkedin"
            className="glass-card shimmer-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#fff",
              borderRadius: 8,
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              transition: "box-shadow 0.3s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "0 0 40px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
          >
            <ExternalLink size={14} /> LinkedIn
          </a>
        </motion.div>

        <motion.a
          href="https://github.com/yogeswar007-coder"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay: 0.55 }}
          className="github-reach"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: "#71717a",
            textDecoration: "none",
            transition: "color 0.25s ease",
          }}
        >
          or reach out on GitHub <span className="arrow">→</span>
        </motion.a>
      </VelocitySkew>
    </section>
  );
}
