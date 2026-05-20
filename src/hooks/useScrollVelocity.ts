import { useEffect } from "react";
import { motionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { lenis } from "../lib/lenis";
import { clamp } from "../lib/motion";

const velocityValue = motionValue(0);

export function useScrollVelocity(): MotionValue<number> {
  useEffect(() => {
    const update = ({ velocity = 0 }: { velocity?: number }) => {
      velocityValue.set(velocity);
    };

    lenis.on("scroll", update);
    return () => {
      lenis.off("scroll", update);
    };
  }, []);

  return velocityValue;
}

export function useVelocitySkew() {
  const velocity = useScrollVelocity();
  const skew = useTransform(velocity, (latest) => clamp(latest * -3, -4, 4));

  return useSpring(skew, { stiffness: 40, damping: 20, mass: 0.8 });
}
