// Hex particles decoration for hero and section accents.
export function HexParticles({ className }: { className?: string }) {
  const seeds = Array.from({ length: 14 }).map((_, i) => ({
    x: (i * 71) % 100,
    y: (i * 37 + 10) % 100,
    s: 12 + ((i * 13) % 40),
    d: 6 + ((i * 3) % 10),
    o: 0.05 + ((i * 7) % 25) / 100,
  }));
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden>
      {seeds.map((p, i) => (
        <g key={i} style={{ transformOrigin: `${p.x}% ${p.y}%` }}>
          <polygon
            points={`${p.x},${p.y - 1} ${p.x + 1},${p.y - 0.5} ${p.x + 1},${p.y + 0.5} ${p.x},${p.y + 1} ${p.x - 1},${p.y + 0.5} ${p.x - 1},${p.y - 0.5}`}
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="0.06"
            opacity={p.o}
            transform={`scale(${p.s / 20})`}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -0.8; 0 0"
              dur={`${p.d}s`}
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
        </g>
      ))}
    </svg>
  );
}
