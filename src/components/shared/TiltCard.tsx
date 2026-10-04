"use client";

import React, { useRef, useState } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
  sheen?: boolean;
}

export default function TiltCard({
  children,
  maxTilt = 8,
  className = "",
  sheen = true,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Number((y * -maxTilt).toFixed(2)),
      y: Number((x * maxTilt).toFixed(2)),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: tilt.active ? "transform 0.08s ease-out" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {sheen && tilt.active && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${(tilt.y / maxTilt + 0.5) * 100}% ${(-tilt.x / maxTilt + 0.5) * 100}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
