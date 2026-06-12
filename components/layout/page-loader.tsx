"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

let hasLoadedGlobal = false;

export function PageLoader({ name }: { name: string }) {
  const [isVisible, setIsVisible] = useState(!hasLoadedGlobal);

  useEffect(() => {
    if (hasLoadedGlobal) {
      setIsVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      hasLoadedGlobal = true;
      setIsVisible(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg-void"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
          >
            {name}
            <span className="text-accent">.</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
