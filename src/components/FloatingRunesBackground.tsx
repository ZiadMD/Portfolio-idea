import { useEffect, useState } from 'react';

export default function FloatingRunesBackground() {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚬ', 'ᚱ', 'ᚴ', 'ᚼ', 'ᚾ', 'ᛁ', 'ᛅ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛘ', 'ᛚ', 'ᛦ'];
  const [particles, setParticles] = useState<Array<{ id: number, rune: string, left: string, top: string, size: number, delay: number, duration: number }>>([]);

  useEffect(() => {
    // Generate only on client side to avoid hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      rune: runes[Math.floor(Math.random() * runes.length)],
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * -20, // Negative delay so they start immediately
      duration: Math.random() * 10 + 15, // 15-25s moving slowly
    }));
    setParticles(generated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-40">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute font-runic text-arcane-glow/30"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}rem`,
            animation: `float-rune ${p.duration}s ease-in-out infinite alternate ${p.delay}s`
          }}
        >
          {p.rune}
        </div>
      ))}
    </div>
  );
}
