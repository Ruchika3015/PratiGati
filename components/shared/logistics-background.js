'use client';

export function LogisticsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top-right terracotta glow */}
      <div
        className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-[0.07] dark:opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)), transparent 70%)',
        }}
      />

      {/* Bottom-left teal glow */}
      <div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.06] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary)), transparent 70%)',
        }}
      />

      {/* Center-right teal ambient */}
      <div
        className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)',
        }}
      />

      {/* Faint curved network lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04] dark:opacity-[0.06]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient id="bgLine1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <linearGradient id="bgLine2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <path d="M 100 200 Q 400 100 700 300 T 1100 250" stroke="url(#bgLine1)" strokeWidth="1.5" fill="none" />
        <path d="M 50 500 Q 350 400 650 600 T 1150 500" stroke="url(#bgLine2)" strokeWidth="1.5" fill="none" />
        <path d="M 200 700 Q 500 500 800 650 T 1100 600" stroke="url(#bgLine1)" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Small glowing data nodes */}
        <circle cx="100" cy="200" r="3" fill="hsl(var(--accent))" className="animate-node-pulse" />
        <circle cx="700" cy="300" r="3" fill="hsl(var(--secondary))" className="animate-node-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="1100" cy="250" r="3" fill="hsl(var(--primary))" className="animate-node-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="50" cy="500" r="3" fill="hsl(var(--accent))" className="animate-node-pulse" style={{ animationDelay: '1.5s' }} />
        <circle cx="650" cy="600" r="3" fill="hsl(var(--secondary))" className="animate-node-pulse" style={{ animationDelay: '2s' }} />
        <circle cx="1150" cy="500" r="3" fill="hsl(var(--primary))" className="animate-node-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="200" cy="700" r="2.5" fill="hsl(var(--accent))" className="animate-node-pulse" style={{ animationDelay: '1.8s' }} />
        <circle cx="800" cy="650" r="2.5" fill="hsl(var(--secondary))" className="animate-node-pulse" style={{ animationDelay: '0.8s' }} />
      </svg>
    </div>
  );
}
