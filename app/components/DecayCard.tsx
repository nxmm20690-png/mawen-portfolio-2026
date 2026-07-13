"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

type DecayCardProps = {
  image: string;
  children?: ReactNode;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
};

export default function DecayCard({
  image,
  children,
  baseFrequency = 0.018,
  numOctaves = 8,
  seed = 4,
  maxDisplacement = 120,
  movementBound = 24,
}: DecayCardProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const cachedCursor = useRef({ x: 0, y: 0 });
  const size = useRef({ width: 1, height: 1 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Touch devices do not have a cursor to drive this effect. Keeping the
    // cards still also prevents the four-card guide from spreading apart.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const map = (x: number, a: number, b: number, c: number, d: number) => ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number) => Math.hypot(x1 - x2, y1 - y2);

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      size.current = { width: rect.width || 1, height: rect.height || 1 };
    };

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      cursor.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const values = { x: 0, y: 0, rz: 0, displacementScale: 0 };
    let frame = 0;
    const render = () => {
      values.x = lerp(values.x, map(cursor.current.x, 0, size.current.width, -60, 60), 0.1);
      values.y = lerp(values.y, map(cursor.current.y, 0, size.current.height, -60, 60), 0.1);
      values.rz = lerp(values.rz, map(cursor.current.x, 0, size.current.width, -5, 5), 0.1);
      values.x = Math.max(-movementBound, Math.min(movementBound, values.x));
      values.y = Math.max(-movementBound, Math.min(movementBound, values.y));

      gsap.set(wrap, { x: values.x, y: values.y, rotateZ: values.rz });

      const travelled = distance(cachedCursor.current.x, cursor.current.x, cachedCursor.current.y, cursor.current.y);
      values.displacementScale = lerp(values.displacementScale, map(travelled, 0, 160, 0, maxDisplacement), 0.08);
      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, { attr: { scale: values.displacementScale } });
      }
      cachedCursor.current = { ...cursor.current };
      frame = requestAnimationFrame(render);
    };

    measure();
    window.addEventListener("resize", measure);
    wrap.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div className="decay-card" ref={wrapRef}>
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid meet" className="decay-card-svg" aria-hidden="true">
        <filter id={`decay-filter-${seed}`}>
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            result="turbulence"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
        <image href={image} x="0" y="0" width="600" height="750" filter={`url(#decay-filter-${seed})`} preserveAspectRatio="xMidYMid meet" />
      </svg>
      <div className="decay-card-text">{children}</div>
    </div>
  );
}
