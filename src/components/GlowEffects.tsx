"use client";

export default function GlowEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" style={{ mixBlendMode: 'screen' }}>
      {/* Top Right Glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: '0%',
          right: '0%',
          width: '600px',
          height: '600px',
          backgroundColor: 'rgba(0, 190, 247, 0.25)',
          transform: 'translate(30%, -30%)',
          mixBlendMode: 'screen',
          willChange: 'opacity',
          animation: 'glowPulse 8s ease-in-out infinite',
        }}
      />
      
      {/* Bottom Left Glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: '0%',
          left: '0%',
          width: '600px',
          height: '600px',
          backgroundColor: 'rgba(0, 190, 247, 0.25)',
          transform: 'translate(-30%, 30%)',
          mixBlendMode: 'screen',
          willChange: 'opacity',
          animation: 'glowPulse 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}

