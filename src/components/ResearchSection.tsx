import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import VelocitySkew from "./VelocitySkew";
import { ENTRY_SPRING } from "../lib/motion";

const pipelineNodes = ["EEG Headset", "Python (EEGNet)", "LSL Stream", "Unity Engine", "Meta Quest Pro"];

const pill = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0 },
  transition: { type: "spring" as const, ...ENTRY_SPRING, delay },
});

function PipelineArrow({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const target = (index + 0.72) / (pipelineNodes.length - 1);
  const color = useTransform(progress, (latest) => (Math.abs(latest - target) < 0.035 ? "#ffffff" : "#52525b"));

  return (
    <motion.span
      style={{
        color,
        fontSize: 18,
        textShadow: useTransform(progress, (latest) =>
          Math.abs(latest - target) < 0.035 ? "0 0 12px rgba(6,182,212,0.65)" : "0 0 0 transparent",
        ),
      }}
    >
      {index === pipelineNodes.length - 2 ? "↔" : "→"}
    </motion.span>
  );
}

export default function ResearchSection() {
  const progress = useMotionValue(0);
  const dotLeft = useTransform(progress, [0, 1], ["0%", "calc(100% - 8px)"]);
  const [metrics, setMetrics] = useState({ latency: 48, accuracy: 87.3 });

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 1.8,
      repeat: Infinity,
      repeatDelay: 0.7,
      ease: "linear",
      onRepeat: () => progress.set(0),
    });

    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMetrics({
        latency: Math.round(48 + (Math.random() * 6 - 3)),
        accuracy: Number((87.3 + (Math.random() * 4 - 2)).toFixed(1)),
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="research"
      data-testid="research-section"
      style={{ position: "relative", padding: "120px 48px", overflow: "hidden", background: "#000" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/section3-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          animation: "kenburns 20s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, #000 0%, #000 20%, rgba(0,0,0,0.18) 42%, rgba(0,0,0,0.18) 58%, #000 80%, #000 100%)",
          pointerEvents: "none",
        }}
      />

      <VelocitySkew style={{ position: "relative", zIndex: 2, maxWidth: 768, margin: "0 auto", textAlign: "center" }}>
        <motion.div {...pill(0)} className="badge-pill" style={{ marginBottom: 24 }} data-testid="research-badge">
          Honours Research
        </motion.div>

        <motion.h2
          {...pill(0.12)}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(36px, 5vw, 64px)",
            color: "#fff",
            margin: "0 0 24px",
            lineHeight: 1.1,
          }}
        >
          Control VR<br />with your mind.
        </motion.h2>

        <motion.p
          {...pill(0.24)}
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            lineHeight: 1.75,
            color: "#a1a1aa",
            marginBottom: 56,
          }}
          data-testid="research-description"
        >
          HybridMind is a real-time BCI architecture where eye gaze steers movement direction and EEG motor imagery triggers in-game actions — simultaneously, with no physical controller required.
        </motion.p>

        <div style={{ position: "relative", overflow: "hidden", padding: "18px 0 10px" }}>
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 8 }}
            data-testid="bci-pipeline"
          >
            {pipelineNodes.map((node, index) => (
              <div key={node} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.4 + index * 0.3 }}
                  style={{
                    position: "relative",
                    background: "rgba(6,182,212,0.08)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    color: "#06b6d4",
                    padding: "10px 18px",
                    borderRadius: 9999,
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    boxShadow: "0 0 16px rgba(6,182,212,0.15)",
                    whiteSpace: "nowrap",
                  }}
                  data-testid={`pipeline-node-${index}`}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 9,
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 300,
                      fontSize: 10,
                      color: "rgba(6,182,212,0.4)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {node}
                </motion.div>
                {index < pipelineNodes.length - 1 && <PipelineArrow index={index} progress={progress} />}
              </div>
            ))}
          </div>

          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: dotLeft,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 12px #06b6d4",
              marginTop: -4,
              pointerEvents: "none",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ type: "spring", ...ENTRY_SPRING, delay: 0.7 }}
          className="glass-card"
          style={{
            margin: "30px auto 0",
            padding: "14px 18px",
            borderRadius: 12,
            display: "flex",
            gap: 18,
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 560,
          }}
        >
          {[
            { label: "EEG Hz", value: "256" },
            { label: "Latency", value: `~${metrics.latency}ms` },
            { label: "Accuracy", value: `${metrics.accuracy}%` },
          ].map((metric) => (
            <div key={metric.label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#52525b" }}>{metric.label}:</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: 12, color: "#06b6d4" }}>
                {metric.value}
              </span>
            </div>
          ))}
        </motion.div>
      </VelocitySkew>
    </section>
  );
}
