"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import Link from "next/link";

import { Magnetic } from "@/components/shared/magnetic";
import { ScatterText } from "@/components/shared/scatter-text";
import { Marquee } from "@/components/shared/marquee";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { SiteInfo } from "@/lib/site-data";

const ROLES = [
  "Full Stack Architect",
  "Backend Specialist",
  "AI Systems Engineer",
  "Product Engineer",
];

const MARQUEE_ITEMS = [
  "REACT", "NEXT.JS", "NODE", "TYPESCRIPT", "PYTHON",
  "GRAPHQL", "POSTGRESQL", "MONGODB", "REDIS", "DOCKER",
  "AWS", "LANGCHAIN", "OPENAI", "PRISMA", "TAILWIND",
];

export function HeroSection({ info }: { info: SiteInfo }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-between pt-24 pb-0">
      <div className="container-frame flex-1 flex items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl space-y-10"
        >
          {/* Scatter headline */}
          <motion.div variants={fadeUp}>
            <ScatterText
              text={info.heroTitle.join(" ")}
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-8xl"
            />
          </motion.div>

          {/* Vertical text wheel */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-text-muted">
            <span className="text-sm font-medium uppercase tracking-wider">Currently</span>
            <div className="relative h-7 w-64 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 flex items-center text-sm font-semibold tracking-wide text-accent"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Accent line */}
          <motion.div variants={fadeUp}>
            <div className="accent-line" />
          </motion.div>

          {/* Intro */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg"
          >
            {info.heroIntro}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Magnetic distance={0.15}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-bg-void transition-all hover:bg-transparent hover:text-accent active:scale-[0.97]"
              >
                View Work
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic distance={0.12}>
              <Link
                href={info.resumeUrl}
                download
                className="inline-flex items-center gap-2 border border-border-subtle px-6 py-3 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all hover:border-accent/40 hover:text-accent active:scale-[0.97]"
              >
                Resume
                <Download className="size-4" />
              </Link>
            </Magnetic>
          </motion.div>

          {/* Bottom status */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 pt-8 text-xs font-medium uppercase tracking-wider text-text-dim"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
              </span>
              <span>Available for projects</span>
            </div>
            <span className="text-text-dim/30">·</span>
            <span>Based in {info.location || "India"}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite scrolling tech marquee at bottom of hero */}
      <div className="relative mt-16 border-t border-b border-border-subtle py-5 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-bg-void to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-bg-void to-transparent" />
        <Marquee speed={40}>
          <div className="flex gap-8">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.3em] text-text-dim/50 transition-colors hover:text-accent/60"
              >
                {item}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
