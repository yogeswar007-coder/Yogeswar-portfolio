import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { lenis } from "../lib/lenis";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function LiftText({ label }: { label: string }) {
  return (
    <>
      {label.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="letter"
          style={{ animationDelay: `${index * 0.025}s` }}
        >
          {letter}
        </span>
      ))}
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const update = ({ scroll = 0, direction = 0 }: { scroll?: number; direction?: number }) => {
      setScrolled(scroll > 80);
      if (direction === 1 && scroll > 120) setHidden(true);
      if (direction === -1 || scroll <= 120) setHidden(false);
    };

    lenis.on("scroll", update);
    return () => {
      lenis.off("scroll", update);
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    lenis.scrollTo(href, { offset: 0 });
  };

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 180, damping: 26 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 64,
          background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          borderTop: scrolled ? "0.5px solid rgba(99,102,241,0.2)" : "0.5px solid transparent",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <a
          href="#hero"
          data-testid="nav-logo"
          className="logo-link"
          onClick={(event) => {
            event.preventDefault();
            lenis.scrollTo(0);
          }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: 22,
            color: "#fff",
            textDecoration: "none",
            position: "relative",
            display: "inline-flex",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <span style={{ position: "relative" }}>
            Yogeswar Stalin
            <span
              className="logo-underline"
              style={{
                position: "absolute",
                bottom: -2,
                left: 0,
                height: 1,
                background: "#6366f1",
                width: 0,
                transition: "width 0.4s ease",
              }}
            />
          </span>
          <sup
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              lineHeight: 1,
              color: "#52525b",
              marginTop: 1,
            }}
          >
            ©
          </sup>
        </a>

        <div style={{ gap: 36 }} className="desktop-nav-links">
          {links.map((link) => (
            <button
              key={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              onClick={() => scrollTo(link.href)}
              className="nav-link-button"
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                letterSpacing: "0.04em",
                color: active === link.href ? "#a5b4fc" : "rgba(255,255,255,0.7)",
                textShadow: active === link.href ? "0 0 18px rgba(99,102,241,0.55)" : "none",
                transition: "color 0.3s, text-shadow 0.3s",
                position: "relative",
                padding: "4px 0",
              }}
            >
              <LiftText label={link.label} />
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: active === link.href ? 4 : 0,
                  height: 4,
                  borderRadius: "50%",
                  background: "#6366f1",
                  boxShadow: active === link.href ? "0 0 10px #6366f1" : "none",
                  transition: "width 0.3s, box-shadow 0.3s",
                }}
              />
            </button>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          data-testid="nav-download-cv"
          className="desktop-cv cv-pulse"
          style={{
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: 8,
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#fff",
            textDecoration: "none",
            transition: "background 0.3s, box-shadow 0.3s, transform 0.3s",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "#4f46e5";
            event.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.45)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "transparent";
            event.currentTarget.style.boxShadow = "none";
          }}
        >
          <ArrowDownToLine size={14} />
          Download CV
        </a>

        <button
          data-testid="nav-hamburger"
          onClick={() => setMobileOpen((open) => !open)}
          style={{ background: "none", border: "none", color: "#fff", display: "flex", padding: 4 }}
          className="mobile-menu-button"
          aria-label="Open navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 28, mass: 1 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.97)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {links.map((link, index) => (
              <motion.button
                key={link.href}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 28, delay: index * 0.08 }}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: 42,
                  color: active === link.href ? "#a5b4fc" : "#fff",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="/resume.pdf"
              download
              data-testid="mobile-download-cv"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 28, delay: links.length * 0.08 }}
              style={{
                color: "#a5b4fc",
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                textDecoration: "none",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 999,
                padding: "10px 18px",
              }}
            >
              Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
