// Stylised world map SVG: highlights Sri Lanka origin and Spain base, with animated connection arcs.
export function WorldMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 500" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--champagne)" stopOpacity="0.15" />
          <stop offset="50%" stopColor="var(--champagne)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--turquoise)" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--champagne)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--champagne)" stopOpacity="0" />
        </radialGradient>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.1" fill="var(--foreground)" opacity="0.18" />
        </pattern>
      </defs>

      {/* Continents as abstract dotted silhouettes (schematic, not geographically precise) */}
      <g fill="url(#dots)">
        {/* Europe / Africa */}
        <path d="M420 100 Q480 90 520 105 L540 130 Q560 150 550 180 L560 220 Q580 260 560 310 L540 360 Q500 400 460 380 L420 360 Q400 320 410 280 L400 240 Q380 200 400 160 Z" />
        {/* Asia */}
        <path d="M560 90 Q640 80 720 100 L800 120 Q860 140 880 180 L870 240 Q840 290 780 310 L720 320 Q660 300 620 270 L580 230 Q560 190 570 150 Z" />
        {/* India + Sri Lanka */}
        <path d="M660 220 Q680 210 700 230 L710 260 Q705 290 685 310 L670 320 Q655 310 660 290 L655 260 Z" />
        <circle cx="682" cy="330" r="8" />
        {/* North America */}
        <path d="M110 130 Q180 110 260 130 L310 160 Q330 200 310 240 L280 280 Q220 300 160 270 L120 240 Q90 190 100 160 Z" />
        {/* South America */}
        <path d="M220 300 Q260 300 290 330 L300 380 Q280 430 240 440 L210 430 Q200 390 210 350 Z" />
      </g>

      {/* Origin: Sri Lanka */}
      <circle cx="682" cy="330" r="22" fill="url(#node)" />
      <circle cx="682" cy="330" r="5" fill="var(--champagne)" />
      <text x="682" y="360" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" opacity="0.85">
        Sri Lanka
      </text>

      {/* Base: Spain */}
      <circle cx="450" cy="185" r="18" fill="url(#node)" />
      <circle cx="450" cy="185" r="5" fill="var(--turquoise)" />
      <text x="450" y="170" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600" opacity="0.85">
        Spain
      </text>

      {/* Animated arcs */}
      <g fill="none" stroke="url(#arc)" strokeWidth="1.8" strokeLinecap="round" className="animate-draw">
        <path d="M682 330 Q 550 100 450 185" />
        <path d="M450 185 Q 320 100 200 180" />
        <path d="M450 185 Q 600 90 780 130" />
        <path d="M450 185 Q 380 320 260 380" />
      </g>

      {/* Little floating particles along the routes */}
      <g fill="var(--champagne)">
        <circle cx="560" cy="180" r="1.8"><animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="330" cy="130" r="1.8"><animate attributeName="opacity" values="1;0.2;1" dur="4s" repeatCount="indefinite" /></circle>
        <circle cx="680" cy="150" r="1.8"><animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}
