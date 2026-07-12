"use client";

import { CSSProperties, ElementType, useEffect, useMemo, useRef, useState } from "react";

type SplitTextProps = {
  text: string;
  tag?: ElementType;
  className?: string;
  delay?: number;
  splitType?: "chars" | "words";
  textAlign?: CSSProperties["textAlign"];
};

export default function SplitText({
  text,
  tag: Tag = "p",
  className = "",
  delay = 38,
  splitType = "chars",
  textAlign = "left",
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const pieces = useMemo(() => {
    if (splitType === "words") return text.split(/(\s+)/);
    return Array.from(text);
  }, [splitType, text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`split-text ${visible ? "is-visible" : ""} ${className}`} style={{ textAlign }}>
      {pieces.map((piece, index) => {
        const isSpace = /^\s+$/.test(piece);
        return (
          <span
            aria-hidden="true"
            className={`split-unit${isSpace ? " split-space" : ""}`}
            style={{ transitionDelay: `${index * delay}ms` }}
            key={`${piece}-${index}`}
          >
            {isSpace ? "\u00a0" : piece}
          </span>
        );
      })}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
