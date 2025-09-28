"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface ProductImageLensProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  zoom?: number;
  className?: string;
}

export default function ProductImageLens({
  src,
  alt,
  className,
  width = 500,
  height = 500,
  zoom = 2,
}: ProductImageLensProps) {
  const [lensVisible, setLensVisible] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLensPosition({ x, y });
  };

  return (
    <div
      className={`relative w-full h-[500px] flex justify-center items-center ${className}`}
      ref={containerRef}
    >
      {/* تصویر اصلی */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-h-full max-w-full object-contain"
        onMouseEnter={() => setLensVisible(true)}
        onMouseLeave={() => setLensVisible(false)}
        onMouseMove={handleMouseMove}
      />

      {/* لنز بزرگنمایی */}
      {lensVisible && (
        <div
          className="absolute pointer-events-none border-2 border-blue-500 rounded-full"
          style={{
            width: 150,
            height: 150,
            left: lensPosition.x - 75,
            top: lensPosition.y - 75,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `-${lensPosition.x * zoom - 75}px -${
              lensPosition.y * zoom - 75
            }px`,
          }}
        />
      )}
    </div>
  );
}
