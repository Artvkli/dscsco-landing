"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  openLabel: string;
  closeLabel: string;
  /** Rendered inside the panel; any link click inside closes the menu. */
  children: ReactNode;
};

/**
 * Accessible disclosure menu for tablet and phone widths (≤1100px).
 * - Button exposes aria-expanded / aria-controls; Escape closes and returns focus to the button.
 * - Page scroll is locked while open; the menu closes itself if the viewport grows past the breakpoint.
 */
export default function MobileMenu({ openLabel, closeLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target: the header uses backdrop-filter, which would otherwise trap a fixed panel inside it.
  useEffect(() => setMounted(true), []);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        // Keep keyboard focus inside the menu (button + panel).
        const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const mq = window.matchMedia("(min-width: 1101px)");
    const onWide = () => mq.matches && close(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());

    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="menu-icon" data-open={open} aria-hidden="true">
          <span /><span /><span />
        </span>
      </button>
      {mounted &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            className="menu-panel"
            data-open={open}
            hidden={!open}
            onClick={(e) => {
              const link = (e.target as HTMLElement).closest("a");
              if (!link) return;
              const href = link.getAttribute("href") || "";
              const target = href.startsWith("#") ? document.getElementById(href.slice(1)) : null;
              if (!target) return close(false); // e.g. language links: let the browser navigate

              // The page is scroll-locked while the menu is open, so unlock first, then scroll to the section.
              e.preventDefault();
              document.documentElement.style.overflow = "";
              close(false);
              requestAnimationFrame(() => {
                const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
                history.pushState(null, "", href);
                if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
                target.focus({ preventScroll: true });
              });
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}
