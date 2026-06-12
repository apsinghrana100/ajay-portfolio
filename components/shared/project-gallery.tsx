"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/animations";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

type ProjectGalleryProps = {
  title: string;
  gallery: GalleryItem[];
};

export function ProjectGallery({ title, gallery }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state for safe portal hydration in Next.js
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close lightbox on Escape key, navigate on Left/Right keys
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, gallery.length]);

  return (
    <>
      {/* 1. Thumbnail Grid Layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-8 md:grid-cols-2"
      >
        {gallery.map((item, index) => (
          <motion.figure
            key={`${title}-${item.src}`}
            variants={fadeUp}
            onClick={() => setActiveIndex(index)}
            className="group/gallery relative cursor-zoom-in overflow-hidden rounded-xl border border-border/70 bg-bg-surface/80 shadow-panel backdrop-blur-xl transition-all duration-500 hover:border-accent-blue/40"
          >
            {/* Subtle terracotta background glow behind hovered figure */}
            <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-accent-blue/0 via-accent-blue/5 to-accent-blue/0 opacity-0 transition-opacity duration-500 group-hover/gallery:opacity-100" />
            
            <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index === 0}
                className="object-contain transition duration-700 group-hover/gallery:scale-[1.01]"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(8,12,20,0.15))] transition-opacity duration-500 group-hover/gallery:opacity-85" />
              
              {/* Interactive Showcase Badge */}
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/60 text-white opacity-0 transition-all duration-300 group-hover/gallery:opacity-100 group-hover/gallery:translate-y-0 translate-y-1 backdrop-blur-sm">
                <Maximize2 className="size-3.5" />
              </div>
            </div>
          </motion.figure>
        ))}
      </motion.div>

      {/* 2. Premium Lightbox Modal rendered via Portal directly on document.body */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 px-4 py-8 backdrop-blur-md select-none"
              onClick={() => setActiveIndex(null)}
            >
              {/* Floating Premium Close Button in the top-right corner of the screen */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(null);
                }}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-50 rounded-full border-2 border-[#ffffff] bg-[#000000]/70 hover:bg-[#000000]/90 p-3.5 text-[#ffffff] transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer flex items-center justify-center group"
                aria-label="Close modal"
              >
                <X className="size-6 text-[#ffffff]" />
              </button>

              {/* Navigation Arrows positioned relative to the entire screen viewport */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null));
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 rounded-full border-2 border-[#ffffff] bg-[#000000]/70 hover:bg-[#000000]/90 p-4 text-[#ffffff] transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer flex items-center justify-center group"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="size-6 text-[#ffffff]" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null));
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full border-2 border-[#ffffff] bg-[#000000]/70 hover:bg-[#000000]/90 p-4 text-[#ffffff] transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer flex items-center justify-center group"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="size-6 text-[#ffffff]" />
                  </button>
                </>
              )}

              {/* Lightbox Content Window (Clicking outside image area closes modal) */}
              <div 
                className="relative flex max-h-[80vh] w-full max-w-5xl flex-col items-center justify-center px-4 md:px-12"
                onClick={() => setActiveIndex(null)}
              >
                {/* Main Expanded Image container (Clicking exact screenshot does NOT close modal) */}
                <motion.div 
                  key={activeIndex}
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-[0_24px_80px_rgba(0,0,0,0.8)] cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* A. Ambient Blurred reflection backdrop to cover empty side aspect ratios */}
                  <Image
                    src={gallery[activeIndex].src}
                    alt=""
                    fill
                    className="object-cover filter blur-3xl opacity-35 scale-105 pointer-events-none animate-pulse duration-[4000ms]"
                    sizes="100vw"
                    priority
                  />

                  {/* B. Primary uncropped high-fidelity screenshot overlay */}
                  <Image
                    src={gallery[activeIndex].src}
                    alt={gallery[activeIndex].alt}
                    fill
                    className="object-contain relative z-10 p-2 sm:p-4"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </div>

              {/* Bottom Index Indicator */}
              <motion.div 
                key={`caption-${activeIndex}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-6 text-center max-w-xl space-y-2 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-accent-blue block mb-1">
                  IMAGE {activeIndex + 1} OF {gallery.length}
                </span>
                {gallery[activeIndex].caption && (
                  <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans max-w-md mx-auto">
                    {gallery[activeIndex].caption}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
