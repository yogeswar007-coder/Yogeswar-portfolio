import { useEffect } from "react";
import { motionValue } from "framer-motion";
import { lenis } from "../lib/lenis";

const progressValue = motionValue(0);

export function useLenisProgress() {
  useEffect(() => {
    const update = ({ progress = 0 }: { progress?: number }) => {
      progressValue.set(progress);
    };

    lenis.on("scroll", update);
    return () => {
      lenis.off("scroll", update);
    };
  }, []);

  return progressValue;
}
