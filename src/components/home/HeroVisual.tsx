import { cn } from "@/lib/utils";

/**
 * Original abstract visual for the hero: a dark body wrapped in wireframe
 * orbits, a traced racing line, and a faint technical grid. Everything is
 * drawn from theme tokens so it recolours with the theme, and the motion is
 * slow enough to read as depth rather than animation.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_68%)] blur-2xl" />

      <svg viewBox="0 0 520 520" fill="none" className="relative size-full">
        <defs>
          <radialGradient id="hero-body" cx="38%" cy="32%" r="78%">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="58%" stopColor="var(--surface)" />
            <stop offset="100%" stopColor="var(--bg)" />
          </radialGradient>

          <linearGradient id="hero-track" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0" />
          </linearGradient>

          <pattern id="hero-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="var(--grid-line)" strokeWidth="1" />
          </pattern>

          <clipPath id="hero-clip">
            <circle cx="260" cy="260" r="238" />
          </clipPath>
        </defs>

        <g clipPath="url(#hero-clip)">
          <rect width="520" height="520" fill="url(#hero-grid)" />
        </g>

        <circle
          cx="260"
          cy="260"
          r="238"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 8"
          opacity="0.7"
        />

        <g className="orbit-drift">
          <ellipse
            cx="260"
            cy="260"
            rx="205"
            ry="82"
            stroke="var(--accent)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <circle cx="465" cy="260" r="3.5" fill="var(--accent)" fillOpacity="0.85" />
        </g>

        <g className="orbit-drift-reverse">
          <ellipse
            cx="260"
            cy="260"
            rx="168"
            ry="168"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="1 7"
          />
          <circle cx="260" cy="92" r="2.5" fill="var(--accent-soft)" fillOpacity="0.8" />
        </g>

        <g transform="rotate(-28 260 260)">
          <ellipse
            cx="260"
            cy="260"
            rx="228"
            ry="118"
            stroke="var(--accent-alt)"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </g>

        {/* Core body */}
        <circle cx="260" cy="260" r="104" fill="url(#hero-body)" />
        <circle
          cx="260"
          cy="260"
          r="104"
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeOpacity="0.9"
        />
        <path
          d="M168 214c58 26 126 26 184 0"
          stroke="var(--border-strong)"
          strokeOpacity="0.8"
          strokeWidth="1"
        />
        <path
          d="M162 260h196"
          stroke="var(--border-strong)"
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <path
          d="M168 306c58-26 126-26 184 0"
          stroke="var(--border-strong)"
          strokeOpacity="0.8"
          strokeWidth="1"
        />

        {/* Traced line: an abstract racing path, not a real circuit */}
        <path
          d="M74 344c62-96 118 34 186-34s96-142 186-58"
          stroke="url(#hero-track)"
          strokeWidth="2"
          strokeLinecap="round"
          className="trace-line"
        />

        {/* Scattered nodes */}
        <g fill="var(--accent)" className="pulse-soft">
          <circle cx="118" cy="150" r="2" fillOpacity="0.6" />
          <circle cx="402" cy="140" r="1.5" fillOpacity="0.5" />
          <circle cx="418" cy="392" r="2" fillOpacity="0.55" />
          <circle cx="110" cy="386" r="1.5" fillOpacity="0.45" />
        </g>
      </svg>
    </div>
  );
}
