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
  const dragRef = useRef({ active: false, hovering: false, startX: 0, scrollLeft: 0, moved: false });
  const isTouchViewportRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const doubledImages = useMemo(() => [...images, ...images], [images]);
  const direction = rowIndex === 1 ? -1 : 1;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const media = window.matchMedia("(hover: none) and (pointer: coarse)");
    let attached = false;

    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let draggingHorizontally = false;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startScrollLeft = row.scrollLeft;
      draggingHorizontally = false;
      dragRef.current.active = true;
      dragRef.current.hovering = false;
      dragRef.current.moved = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!dragRef.current.active || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (!draggingHorizontally && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 7) {
        draggingHorizontally = Math.abs(deltaX) > Math.abs(deltaY);
      }
      if (!draggingHorizontally) return;

      event.preventDefault();
      dragRef.current.moved = true;
      row.scrollLeft = startScrollLeft - deltaX;
    };

    const stopTouchDrag = () => {
      dragRef.current.active = false;
      draggingHorizontally = false;
    };

    const attachTouchHandlers = () => {
      if (attached) return;
      row.addEventListener("touchstart", onTouchStart, { passive: true });
      row.addEventListener("touchmove", onTouchMove, { passive: false });
      row.addEventListener("touchend", stopTouchDrag, { passive: true });
      row.addEventListener("touchcancel", stopTouchDrag, { passive: true });
      attached = true;
    };

    const detachTouchHandlers = () => {
      if (!attached) return;
      row.removeEventListener("touchstart", onTouchStart);
      row.removeEventListener("touchmove", onTouchMove);
      row.removeEventListener("touchend", stopTouchDrag);
      row.removeEventListener("touchcancel", stopTouchDrag);
      attached = false;
    };

    const syncInputMode = () => {
      isTouchViewportRef.current = media.matches;
      if (media.matches) attachTouchHandlers();
      else detachTouchHandlers();
    };

    syncInputMode();
    media.addEventListener("change", syncInputMode);

    return () => {
      media.removeEventListener("change", syncInputMode);
      detachTouchHandlers();
    };
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const setInitialPosition = () => {
      const half = row.scrollWidth / 2;
      if (rowIndex === 1) row.scrollLeft = half;
    };

    const timer = window.setTimeout(setInitialPosition, 80);
    const tick = () => {
      const half = row.scrollWidth / 2;

      if (half > 0 && !isTouchViewportRef.current && !dragRef.current.active && !dragRef.current.hovering) {
        const speed = 0.7;
        row.scrollLeft += direction * speed;
        if (direction > 0 && row.scrollLeft >= half) row.scrollLeft -= half;
        if (direction < 0 && row.scrollLeft <= 0) row.scrollLeft += half;
      }
    };

    const interval = window.setInterval(tick, 16);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [direction, rowIndex]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const row = rowRef.current;
    if (!row) return;
    dragRef.current = {
      active: true,
      hovering: dragRef.current.hovering,
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
    if (Math.abs(delta) > 4) drag.moved = true;
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
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        dragRef.current.hovering = true;
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        if (dragRef.current.active) stopDrag(event);
        dragRef.current.hovering = false;
      }}
      onClickCapture={onClickCapture}
    >
      <div className="kv-circular-track">
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
