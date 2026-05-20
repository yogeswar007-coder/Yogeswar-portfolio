import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useVelocitySkew } from "../hooks/useScrollVelocity";

export default function VelocitySkew({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const skewY = useVelocitySkew();

  return (
    <motion.div className={className} style={{ ...style, skewY }}>
      {children}
    </motion.div>
  );
}
