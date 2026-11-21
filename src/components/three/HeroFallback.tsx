import React from "react";

export function HeroFallback() {
  return (
    <div className="w-full h-full min-h-[420px] flex items-center justify-center p-6 relative select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/10 via-transparent to-[#C8A25A]/10 rounded-3xl pointer-events-none blur-2xl" />

      {/* Stylized Vector Funnel Graphic */}
      <div className="relative w-full max-w-[340px] flex flex-col items-center">
        <svg viewBox="0 0 340 380" className="w-full h-auto drop-shadow-[0_15px_35px_rgba(37,99,235,0.25)]" fill="none">
          <defs>
            <linearGradient id="fallbackGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C8A25A" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="goldCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#C8A25A" />
              <stop offset="100%" stopColor="#8A6B2A" />
            </linearGradient>
          </defs>

          {/* Floating Marketing Objects at top */}
          <g>
            {/* Heart */}
            <circle cx="80" cy="50" r="16" fill="rgba(251, 113, 133, 0.2)" stroke="#FB7185" strokeWidth="1.5" />
            <path d="M 75 48 C 75 44 80 44 80 48 C 80 44 85 44 85 48 C 85 53 80 56 80 56 C 80 56 75 53 75 48 Z" fill="#FB7185" />

            {/* Click Pointer */}
            <circle cx="170" cy="35" r="16" fill="rgba(96, 165, 250, 0.2)" stroke="#60A5FA" strokeWidth="1.5" />
            <path d="M 166 30 L 175 39 L 171 40 L 174 46 L 172 47 L 169 41 L 165 44 Z" fill="#60A5FA" />

            {/* Email Envelope */}
            <circle cx="260" cy="50" r="16" fill="rgba(200, 162, 90, 0.2)" stroke="#C8A25A" strokeWidth="1.5" />
            <rect x="252" y="44" width="16" height="12" rx="2" stroke="#C8A25A" strokeWidth="1.2" fill="none" />
            <path d="M 252 44 L 260 51 L 268 44" stroke="#C8A25A" strokeWidth="1.2" />
          </g>

          {/* Faceted Glass 3D Funnel Vector */}
          <polygon
            points="40,90 300,90 215,240 215,310 125,310 125,240"
            fill="url(#fallbackGlassGrad)"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
          />

          {/* Facet Reflection lines */}
          <line x1="170" y1="90" x2="170" y2="240" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="90" x2="145" y2="240" stroke="rgba(200, 162, 90, 0.4)" strokeWidth="1" />
          <line x1="240" y1="90" x2="195" y2="240" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1" />

          {/* Gold Coin dropping from bottom */}
          <ellipse cx="170" cy="350" rx="24" ry="10" fill="url(#goldCoinGrad)" stroke="#C8A25A" strokeWidth="1.5" />
          <text x="170" y="354" textAnchor="middle" fill="#0B0F19" fontSize="11" fontFamily="monospace" fontWeight="bold">
            ₹ / $
          </text>
        </svg>

        {/* Caption */}
        <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[#E8D5A3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A25A]" />
          <span>The Compounding Funnel Model · Illustrative</span>
        </div>
      </div>
    </div>
  );
}
