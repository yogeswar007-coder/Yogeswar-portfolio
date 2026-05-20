import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { lenis } from "./lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export { lenis };

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const ro = new ResizeObserver(() => ScrollTrigger.refresh());
ro.observe(document.body);

createRoot(document.getElementById("root")!).render(<App />);
