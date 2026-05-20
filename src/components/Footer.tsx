import { motion } from "framer-motion";
import { Code2, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="site-footer"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 48px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span
        className="footer-copy"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: 13,
          color: "#71717a",
        }}
      >
        © 2026 Yogeswar Stalin. All rights reserved.
      </span>

      <span
        className="desktop-only"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 300,
          fontSize: 11,
          color: "#3f3f46",
          textAlign: "center",
        }}
      >
        Built with React + Three.js · IIIT Sri City · 2026
      </span>

      <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "flex-end" }}>
        {[
          { href: "https://github.com/yogeswar007-coder", Icon: Github, label: "GitHub" },
          { href: "https://www.linkedin.com/in/yogeswar-stalin-a8bb32332", Icon: Linkedin, label: "LinkedIn" },
          { href: "https://leetcode.com/u/yogeswar_07", Icon: Code2, label: "LeetCode" },
        ].map(({ href, Icon, label }, index) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            data-testid={`footer-${label.toLowerCase()}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 + index * 0.1, duration: 0.35 }}
            style={{
              color: "#a1a1aa",
              transition: "color 0.2s, transform 0.2s",
              display: "flex",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = "#fff";
              event.currentTarget.style.transform = "scale(1.15)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "#a1a1aa";
              event.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
