"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useSpring } from "framer-motion";

type ScatterTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

export function ScatterText({ text, className = "", as: Tag = "h1" }: ScatterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Tag className={className}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-pre">
            {word.split("").map((char, charIdx) => (
              <ScatterChar
                key={`${wordIdx}-${charIdx}`}
                char={char}
                mousePos={mousePos}
                containerRef={containerRef}
              />
            ))}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}

function ScatterChar({
  char,
  mousePos,
  containerRef,
}: {
  char: string;
  mousePos: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const charRef = useRef<HTMLSpanElement>(null);

  const getOffset = () => {
    if (!charRef.current || !containerRef.current) return { x: 0, y: 0 };
    const charRect = charRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
    const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

    const dx = charCenterX - mousePos.x;
    const dy = charCenterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 120;

    if (distance < radius && distance > 0) {
      const force = (1 - distance / radius) * 18;
      return {
        x: (dx / distance) * force,
        y: (dy / distance) * force,
      };
    }
    return { x: 0, y: 0 };
  };

  const offset = getOffset();
  const springX = useSpring(offset.x, { stiffness: 300, damping: 20 });
  const springY = useSpring(offset.y, { stiffness: 300, damping: 20 });

  // Update spring targets
  springX.set(offset.x);
  springY.set(offset.y);

  return (
    <motion.span
      ref={charRef}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      {char}
    </motion.span>
  );
}
