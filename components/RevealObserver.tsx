"use client";

import { useEffect } from "react";

/**
 * 1. Subtle scroll-reveal for elements marked `data-reveal`
 *    (content stays fully visible without JavaScript and for reduced-motion users — see globals.css).
 * 2. Performance: pauses the decorative SVG/CSS animations in any section that is off-screen,
 *    so the browser only animates what the visitor can actually see.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observers: IntersectionObserver[] = [];

    // Pause animations outside the viewport.
    const regions = Array.from(document.querySelectorAll<HTMLElement>("main > section, footer"));
    regions.forEach((el) => el.setAttribute("data-paused", ""));
    const pauser = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-paused", !e.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );
    regions.forEach((el) => pauser.observe(el));
    observers.push(pauser);

    // Scroll reveal.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("js");
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
        else io.observe(el);
      });
      observers.push(io);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
