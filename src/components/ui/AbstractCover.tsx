import { cn } from "@/lib/utils";

/** Small deterministic hash so the same slug always yields the same artwork. */
function hash(seed: string): number {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

interface AbstractCoverProps {
  /** Usually the entry slug. Drives the generated geometry. */
  seed: string;
  className?: string;
}

/**
 * Original procedural artwork used whenever an entry has no image on disk.
 * Wireframe arcs over a faint technical grid, tinted with the accent colour.
 * It keeps card layouts intact instead of leaving a broken image behind.
 */
export function AbstractCover({ seed, className }: AbstractCoverProps) {
  const h = hash(seed);
  const rotation = h % 180;
  const nodes = 3 + (h % 3);
  const arcs = [0.34, 0.46, 0.58];

  return (
    <svg
      viewBox="0 0 480 270"
      role="img"
      aria-label="Abstract generated cover artwork"
      preserveAspectRatio="xMidYMid slice"
      className={cn("size-full bg-surface", className)}
    >
      <defs>
        <radialGradient id={`glow-${h}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${h}`} width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="var(--grid-line)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="480" height="270" fill={`url(#grid-${h})`} />
      <rect width="480" height="270" fill={`url(#glow-${h})`} />

      <g transform={`rotate(${rotation} 240 135)`} opacity="0.9">
        {arcs.map((scale, index) => (
          <ellipse
            key={scale}
            cx="240"
            cy="135"
            rx={200 * scale}
            ry={200 * scale * 0.42}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.34 - index * 0.08}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: nodes }, (_, index) => {
          const angle = ((h >> (index * 3)) % 360) * (Math.PI / 180);
          const radius = 200 * arcs[index % arcs.length];
          return (
            <circle
              key={index}
              cx={240 + Math.cos(angle) * radius}
              cy={135 + Math.sin(angle) * radius * 0.42}
              r="2.5"
              fill="var(--accent)"
              fillOpacity="0.7"
            />
          );
        })}
      </g>

      <circle cx="240" cy="135" r="26" fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
      <circle cx="240" cy="135" r="4" fill="var(--accent)" fillOpacity="0.75" />
    </svg>
  );
}
