"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

type BubbleMenuProps = {
  logo: ReactNode;
  items: BubbleMenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
};

export default function BubbleMenu({
  logo,
  items,
  menuAriaLabel = "打开导航",
  menuBg = "#f2eee7",
  menuContentColor = "#202020",
  useFixedPosition = true,
}: BubbleMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nodes = wrapRef.current?.querySelectorAll(".bubble-menu__item");
    if (!nodes) return;

    if (open) {
      gsap.fromTo(
        nodes,
        { scale: 0, y: -18, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.52,
          ease: "back.out(1.55)",
          stagger: 0.055,
        }
      );
    } else {
      gsap.to(nodes, { scale: 0.92, y: -8, opacity: 0, duration: 0.22, ease: "power2.in" });
    }
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("bubble-menu-open", open);
    return () => document.body.classList.remove("bubble-menu-open");
  }, [open]);

  return (
    <nav
      ref={wrapRef}
      className={`bubble-menu${useFixedPosition ? " bubble-menu--fixed" : ""}`}
      style={
        {
          "--bubble-bg": menuBg,
          "--bubble-color": menuContentColor,
        } as React.CSSProperties
      }
      aria-label="主要导航"
    >
      <a className="bubble-menu__logo" href="#top" aria-label="返回首页" onClick={() => setOpen(false)}>
        {logo}
      </a>

      <div className={`bubble-menu__items${open ? " is-open" : ""}`}>
        {items.map((item) => (
          <a
            className="bubble-menu__item"
            href={item.href}
            aria-label={item.ariaLabel || item.label}
            key={item.href}
            onClick={() => setOpen(false)}
            style={
              {
                "--item-rotation": `${item.rotation ?? 0}deg`,
                "--item-hover-bg": item.hoverStyles?.bgColor || "#202020",
                "--item-hover-color": item.hoverStyles?.textColor || "#f2eee7",
              } as React.CSSProperties
            }
          >
            {item.label}
          </a>
        ))}
      </div>

      <button
        className={`bubble-menu__toggle${open ? " is-open" : ""}`}
        type="button"
        aria-label={menuAriaLabel}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}
