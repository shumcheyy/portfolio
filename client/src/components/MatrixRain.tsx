import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  isActive: boolean;
}

export function MatrixRain({ isActive }: MatrixRainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const chars = '0123456789ABCDEF!@#$%^&*(){}[]|;:,.<>?';
    const columns = Math.floor(window.innerWidth / 14);

    // Clear existing characters
    container.innerHTML = '';

    for (let i = 0; i < columns; i++) {
      const char = document.createElement('div');
      char.className = 'matrix-char animate-matrix';
      char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
      char.style.left = (i * 14) + 'px';
      char.style.animationDelay = Math.random() * 20 + 's';
      char.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(char);
    }

    const interval = setInterval(() => {
      const chars_elements = container.querySelectorAll('.matrix-char');
      chars_elements.forEach(char => {
        if (Math.random() < 0.1) {
          char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
      container.innerHTML = '';
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="matrix-rain"
    />
  );
}
