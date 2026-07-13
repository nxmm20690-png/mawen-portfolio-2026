"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type KVCircularRowsProps = {
  images: string[];
};

export default function KVCircularRows({ images }: KVCircularRowsProps) {
  const rows = useMemo(() => {
    const rowCount = 3;
    return Array.from({ length: rowCount }, (_, rowIndex) => images.filter((_, index) => index % rowCount === rowIndex));
  }, [images]);

  return (
    <div className="kv-circular-stack" aria-label="KV视觉设计作品横向滚动展示">
      {rows.map((row, rowIndex) => (
        <KVCircularRow images={row} rowIndex={rowIndex} key={`kv-row-${rowIndex}`} />
      ))}
    </div>
  );
}

function KVCircularRow({ images, rowIndex }: { images: string[]; rowIndex: number }) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const doubledImages = useMemo(() => [...images, ...images], [images]);
  const direction = rowIndex === 1 ? -1 : 1;

  useEffect(() => {
    const row = rowRef.current;
    const track = trackRef.current;
    if (!row || !track) return;

    let frame = 0;
    let previousTime = performance.now();
    let hasInitialPosition = false;

    const setInitialPosition = () => {
      if (hasInitialPosition) return;
      const loopWidth = track.scrollWidth / 2;
      if (!loopWidth) return;
      if (direction < 0) row.scrollLeft = loopWidth;
      hasInitialPosition = true;
    };

    const resizeObserver = new ResizeObserver(() => {
      hasInitialPosition = false;
      setInitialPosition();
    });
    resizeObserver.observe(track);

    const tick = (now: number) => {
      setInitialPosition();
      const loopWidth = track.scrollWidth / 2;

      if (loopWidth > 0 && !dragRef.current.active) {
        const elapsed = Math.min(now - previousTime, 48);
        const speed = elapsed * 0.052;
        const nextPosition = row.scrollLeft + direction * speed;

        row.scrollLeft = direction > 0
          ? nextPosition >= loopWidth
            ? nextPosition - loopWidth
            : nextPosition
          : nextPosition <= 0
            ? nextPosition + loopWidth
            : nextPosition;
      }
      previousTime = now;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [direction]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || !window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let isHorizontalSwipe: boolean | null = null;

    const resetTouchDrag = () => {
      dragRef.current.active = false;
      setDragging(false);
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      startX = touch.clientX;
      startY = touch.clientY;
      startScrollLeft = row.scrollLeft;
      isHorizontalSwipe = null;
      dragRef.current = { active: true, startX, scrollLeft: startScrollLeft, moved: false };
      setDragging(true);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || !dragRef.current.active) return;

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (isHorizontalSwipe === null && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 7) {
        isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
      }

      if (!isHorizontalSwipe) return;

      event.preventDefault();
      dragRef.current.moved = true;
      row.scrollLeft = startScrollLeft - deltaX;
    };

    row.addEventListener("touchstart", onTouchStart, { passive: true });
    row.addEventListener("touchmove", onTouchMove, { passive: false });
    row.addEventListener("touchend", resetTouchDrag, { passive: true });
    row.addEventListener("touchcancel", resetTouchDrag, { passive: true });

    return () => {
      row.removeEventListener("touchstart", onTouchStart);
      row.removeEventListener("touchmove", onTouchMove);
      row.removeEventListener("touchend", resetTouchDrag);
      row.removeEventListener("touchcancel", resetTouchDrag);
    };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const row = rowRef.current;
    if (!row) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: row.scrollLeft,
      moved: false,
    };
    row.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const row = rowRef.current;
    const drag = dragRef.current;
    if (!row || !drag.active) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) {
      drag.moved = true;
      event.preventDefault();
    }
    row.scrollLeft = drag.scrollLeft - delta;
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const row = rowRef.current;
    dragRef.current.active = false;
    if (row?.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <div
      className={`kv-circular-row kv-circular-row-${rowIndex + 1}${dragging ? " is-dragging" : ""}`}
      ref={rowRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") {
          if (dragRef.current.active) stopDrag(event);
        }
      }}
      onClickCapture={onClickCapture}
    >
      <div className="kv-circular-track" ref={trackRef}>
        {doubledImages.map((file, index) => (
          <a
            className="kv-circular-card"
            href={`/portfolio-assets/kv/${file}`}
            target="_blank"
            rel="noreferrer"
            key={`${file}-${index}`}
            style={{ "--card-tilt": `${((index % 5) - 2) * 1.2}deg` } as React.CSSProperties}
          >
            <img src={`/portfolio-assets/kv/${file}`} alt={`KV视觉设计作品 ${rowIndex * images.length + index + 1}`} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  );
}
