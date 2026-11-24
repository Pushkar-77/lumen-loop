"use client";

import React from "react";

interface AbstractCoverProps {
  variant: "rings" | "matrix" | "waves" | "conduit" | "radial" | "facets";
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export function AbstractCover({
  variant,
  primaryColor = "#2563EB",
  secondaryColor = "#C8A25A",
  className = "w-full h-48 sm:h-52",
}: AbstractCoverProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#131928] via-[#0E1422] to-[#0A0E18] border border-white/10 ${className}`}
      aria-hidden="true"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${primaryColor} 0%, transparent 60%), radial-gradient(circle at 30% 80%, ${secondaryColor} 0%, transparent 50%)`,
        }}
      />

      <svg
        className="w-full h-full relative z-10"
        viewBox="0 0 400 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-primary-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id={`grad-gold-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A25A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* VARIANT 1: Concentric Luxury Orbit Rings */}
        {variant === "rings" && (
          <g transform="translate(200, 110)">
            <circle r="95" stroke={primaryColor} strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
            <circle r="75" stroke={`url(#grad-primary-${variant})`} strokeWidth="1.5" opacity="0.6" />
            <circle r="52" stroke={secondaryColor} strokeWidth="1.2" strokeDasharray="8 4" opacity="0.8" />
            <circle r="32" stroke={primaryColor} strokeWidth="2" opacity="0.9" />
            <circle r="14" fill={`url(#grad-gold-${variant})`} />
            <circle r="5" fill="#0B0F19" />
            {/* Axis crosshairs */}
            <line x1="-120" y1="0" x2="120" y2="0" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
            <line x1="0" y1="-95" x2="0" y2="95" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
          </g>
        )}

        {/* VARIANT 2: Isometric Data Matrix */}
        {variant === "matrix" && (
          <g transform="translate(50, 30)">
            {[0, 1, 2, 3, 4].map((col) =>
              [0, 1, 2, 3].map((row) => (
                <circle
                  key={`${col}-${row}`}
                  cx={col * 70 + (row % 2) * 35}
                  cy={row * 40}
                  r="3.5"
                  fill={col === 2 && row === 1 ? secondaryColor : primaryColor}
                  opacity={(col + row) % 2 === 0 ? "0.7" : "0.3"}
                />
              ))
            )}
            {/* Connected benchmark vector line */}
            <path
              d="M 35 120 L 105 80 L 175 80 L 210 40 L 280 40"
              stroke={`url(#grad-primary-${variant})`}
              strokeWidth="2"
              fill="none"
            />
            <circle cx="210" cy="40" r="6" fill={secondaryColor} />
            <circle cx="210" cy="40" r="10" stroke={secondaryColor} strokeWidth="1" opacity="0.5" />
          </g>
        )}

        {/* VARIANT 3: Harmonic Compounding Waves */}
        {variant === "waves" && (
          <g transform="translate(0, 110)">
            <path
              d="M 0 35 C 80 -45, 140 65, 220 -25 C 300 -115, 340 35, 400 -40"
              stroke={primaryColor}
              strokeWidth="2.5"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 0 50 C 90 -25, 150 45, 230 -10 C 310 -65, 350 15, 400 -20"
              stroke={secondaryColor}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 0 65 C 100 -5, 160 25, 240 5 C 320 -15, 360 -5, 400 0"
              stroke="white"
              strokeWidth="0.75"
              fill="none"
              opacity="0.25"
            />
            {/* Focal peak node */}
            <circle cx="220" cy="-25" r="5" fill="#FAF9F6" />
            <circle cx="220" cy="-25" r="9" stroke={secondaryColor} strokeWidth="1" opacity="0.6" />
          </g>
        )}

        {/* VARIANT 4: Geometric Crystal Facets */}
        {variant === "facets" && (
          <g transform="translate(200, 110)">
            <polygon
              points="0,-80 75,-30 75,45 0,85 -75,45 -75,-30"
              stroke={`url(#grad-primary-${variant})`}
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
            <polygon
              points="0,-45 42,-15 42,25 0,50 -42,25 -42,-15"
              stroke={secondaryColor}
              strokeWidth="1"
              fill="none"
              opacity="0.8"
            />
            <line x1="0" y1="-80" x2="0" y2="-45" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
            <line x1="75" y1="-30" x2="42" y2="-15" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
            <line x1="75" y1="45" x2="42" y2="25" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
            <line x1="0" y1="85" x2="0" y2="50" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
            <line x1="-75" y1="45" x2="-42" y2="25" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
            <line x1="-75" y1="-30" x2="-42" y2="-15" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
            <circle cx="0" cy="0" r="6" fill={`url(#grad-gold-${variant})`} />
          </g>
        )}

        {/* VARIANT 5: Diagonal Conduit Pipeline */}
        {variant === "conduit" && (
          <g>
            <line x1="40" y1="180" x2="160" y2="60" stroke={primaryColor} strokeWidth="2" opacity="0.8" />
            <line x1="160" y1="60" x2="280" y2="60" stroke={secondaryColor} strokeWidth="2.5" opacity="0.9" />
            <line x1="280" y1="60" x2="360" y2="140" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            
            <circle cx="40" cy="180" r="5" fill="#FAF9F6" />
            <circle cx="160" cy="60" r="7" fill={secondaryColor} />
            <circle cx="280" cy="60" r="8" fill={primaryColor} />
            <circle cx="360" cy="140" r="5" fill="#C8A25A" />

            {/* Parallel circuit accents */}
            <line x1="80" y1="200" x2="200" y2="80" stroke="white" strokeWidth="0.75" opacity="0.2" />
            <line x1="200" y1="80" x2="320" y2="80" stroke="white" strokeWidth="0.75" opacity="0.2" />
          </g>
        )}

        {/* VARIANT 6: Radial Dial Horizon */}
        {variant === "radial" && (
          <g transform="translate(200, 160)">
            <path
              d="M -130 0 A 130 130 0 0 1 130 0"
              stroke={primaryColor}
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M -90 0 A 90 90 0 0 1 90 0"
              stroke={secondaryColor}
              strokeWidth="2.5"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M -50 0 A 50 50 0 0 1 50 0"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.4"
            />
            {/* Radial ticks */}
            {[-60, -30, 0, 30, 60].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = Math.sin(rad) * 95;
              const y1 = -Math.cos(rad) * 95;
              const x2 = Math.sin(rad) * 115;
              const y2 = -Math.cos(rad) * 115;
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={deg === 0 ? secondaryColor : "white"}
                  strokeWidth={deg === 0 ? "2" : "1"}
                  opacity={deg === 0 ? "0.9" : "0.35"}
                />
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
