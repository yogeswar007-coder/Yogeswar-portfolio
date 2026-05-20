import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: Props) {
  const [visible, setVisible] = useState(true);
  const [monogramExit, setMonogramExit] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / 2000) * 100));
      setProgress(next);
      if (next < 100) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const readyTimer = setTimeout(() => {
      setMonogramExit(true);
      onComplete();
    }, 2200);
    const splitTimer = setTimeout(() => setSplitting(true), 2500);
    const hideTimer = setTimeout(() => setVisible(false), 3200);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(readyTimer);
      clearTimeout(splitTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layoutId="loader"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={splitting ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              inset: "0 auto 0 0",
              width: "50%",
              background: "#000",
              zIndex: 10000,
            }}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={splitting ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              inset: "0 0 0 auto",
              width: "50%",
              background: "#000",
              zIndex: 10000,
            }}
          />

          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={monogramExit ? { opacity: 0, scale: 1.15 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
            }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(48px, 7vw, 72px)",
                letterSpacing: "0.15em",
                color: "#fff",
                marginBottom: 28,
                paddingLeft: "0.15em",
              }}
            >
              YS
            </span>
            <div style={{ position: "relative", width: 260 }}>
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, type: "spring", stiffness: 50, damping: 18 }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(to right, #6366f1 0 50%, #8b5cf6 50% 100%)",
                  }}
                />
              </div>
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 0,
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  color: "#a1a1aa",
                }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
