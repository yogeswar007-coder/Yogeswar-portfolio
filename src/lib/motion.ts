export const CURSOR_SPRING = { stiffness: 150, damping: 18, mass: 0.6 };
export const CARD_SPRING = { stiffness: 260, damping: 22, mass: 0.4 };
export const ENTRY_SPRING = { stiffness: 60, damping: 15, mass: 1.2 };
export const TORUS_SPRING = { stiffness: 120, damping: 12, mass: 0.8 };
export const OVERLAY_SPRING = { stiffness: 200, damping: 28, mass: 1.0 };

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
