import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import NeuralNetworkCanvas from "./NeuralNetworkCanvas";
import VelocitySkew from "./VelocitySkew";
import { ENTRY_SPRING } from "../lib/motion";
import { useScrollVelocity } from "../hooks/useScrollVelocity";
import { lenis } from "../lib/lenis";

const words1 = ["CS", "Engineer."];
const words2 = ["Builder.", "Dreamer."];

interface Props {
  loaded: boolean;
}

export default function HeroSection({ loaded }: Props) {
  const ref = useRef<HTMLElement>(null);
  const velocity = useScrollVelocity();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const delay = (n: number) => ({ delay: loaded ? n : 0 });

  return (
    <section
      ref={ref}
      id="hero"
      data-testid="hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        className="hero-canvas"
        style={{ position: "absolute", top: 0, bottom: 0, y: canvasY }}
      >
        <NeuralNetworkCanvas rotationBoost={velocity} />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.76) 36%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 48px",
          maxWidth: 690,
          y: textY,
        }}
      >
        <VelocitySkew>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ ...delay(0.2), type: "spring", ...ENTRY_SPRING }}
            className="badge-pill shimmer-pill"
            style={{ marginBottom: 28 }}
            data-testid="hero-badge"
          >
            Open to Internships · 2026
          </motion.div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(52px, 8vw, 96px)",
              lineHeight: 1.05,
              color: "#fff",
              margin: 0,
              marginBottom: 24,
            }}
          >
            <div className="hero-heading-line" style={{ marginBottom: 4 }}>
              {words1.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 34,
                    skewX: -3,
                    textShadow: "0 0 30px rgba(255,255,255,0.6)",
                  }}
                  animate={
                    loaded
                      ? {
                          opacity: 1,
                          y: 0,
                          skewX: 0,
                          textShadow: "0 0 0px rgba(255,255,255,0)",
                        }
                      : {
                          opacity: 0,
                          y: 34,
                          skewX: -3,
                          textShadow: "0 0 30px rgba(255,255,255,0.6)",
                        }
                  }
                  transition={{ ...delay(0.32 + index * 0.12), type: "spring", ...ENTRY_SPRING }}
                  data-testid={`hero-word-${index}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="hero-heading-line hero-heading-line--nowrap">
              {words2.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 34,
                    skewX: -3,
                    textShadow: "0 0 30px rgba(255,255,255,0.6)",
                  }}
                  animate={
                    loaded
                      ? {
                          opacity: 1,
                          y: 0,
                          skewX: 0,
                          textShadow: "0 0 0px rgba(255,255,255,0)",
                        }
                      : {
                          opacity: 0,
                          y: 34,
                          skewX: -3,
                          textShadow: "0 0 30px rgba(255,255,255,0.6)",
                        }
                  }
                  transition={{ ...delay(0.56 + index * 0.12), type: "spring", ...ENTRY_SPRING }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={
              loaded
                ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
            }
            transition={{ ...delay(1), duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="subtext-reveal"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: "#a1a1aa",
              maxWidth: 380,
              marginBottom: 36,
            }}
            data-testid="hero-subtext"
          >
            Second-year CS student at IIIT Sri City.<br />
            Building HybridMind — a real-time BCI system that<br />
            lets you control VR with your mind and eyes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ ...delay(1.3), type: "spring", ...ENTRY_SPRING }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
          >
            <a
              href="#projects"
              data-testid="cta-view-work"
              className="primary-cta"
              onClick={(event) => {
                event.preventDefault();
                lenis.scrollTo("#projects");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "#fff",
                color: "#000",
                borderRadius: 8,
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.3s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "scale(1.03)";
                event.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.45)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "scale(1)";
                event.currentTarget.style.boxShadow = "none";
              }}
            >
              <span className="cta-label">View My Work</span>
              <ArrowDown size={14} />
            </a>
            <a
              href="https://github.com/yogeswar007-coder"
              target="_blank"
              rel="noreferrer"
              data-testid="cta-github"
              className="glass-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                color: "#fff",
                borderRadius: 8,
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                transition: "box-shadow 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.05)";
                event.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.boxShadow = "0 0 40px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.05)";
                event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <Github size={14} /> GitHub
            </a>
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                color: "#52525b",
                padding: "0 4px",
              }}
            >
              2nd Year @ IIIT Sri City
            </span>
          </motion.div>
        </VelocitySkew>
      </motion.div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div className="scroll-line" style={{ width: 1, height: 40, background: "rgba(255,255,255,0.6)" }} />
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#fff",
            animation: "scrollBounce 1.5s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
            transform: "rotate(90deg)",
            marginTop: 8,
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
