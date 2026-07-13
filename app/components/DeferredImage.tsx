"use client";

import { useEffect, useRef, useState } from "react";

type DeferredImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Load full-quality portfolio images only when they are close to the viewport. */
export default function DeferredImage({ src, alt, className }: DeferredImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      // Start the original image while the visitor is still reading the
      // preceding module, so high-resolution work is ready on arrival.
      { rootMargin: "1800px 0px" }
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <img
      ref={imageRef}
      src={shouldLoad ? src : undefined}
      data-source={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
