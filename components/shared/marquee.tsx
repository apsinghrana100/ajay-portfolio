"use client";

import { motion } from "framer-motion";

/**
 * Infinite horizontal marquee — items scroll continuously.
 * Duplicated children to create seamless loop.
 */
export function Marquee({
  children,
  speed = 30,
  direction = "left",
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}) {
  const duration = speed;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-8"
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
        }}
      >
        {/* Duplicate children for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
