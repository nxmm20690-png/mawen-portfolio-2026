"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type MobileAheadImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

// Keeps the original asset untouched while starting mobile downloads before the image enters view.
export default function MobileAheadImage({ src, alt, ...props }: MobileAheadImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (!window.matchMedia("(max-width: 640px)").matches) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "1800px 0px" },
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, []);

  return <img ref={imageRef} src={shouldLoad ? src : undefined} alt={alt} decoding="async" {...props} />;
}
