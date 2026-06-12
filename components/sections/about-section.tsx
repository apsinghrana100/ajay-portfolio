"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Counter } from "@/components/shared/counter";
import { Tilt3DCard } from "@/components/shared/tilt-3d-card";
import { ScrambleText } from "@/components/shared/scramble-text";
import { Marquee } from "@/components/shared/marquee";
import type { SiteInfo, SiteSkills } from "@/lib/site-data";

type AboutSectionProps = {
  info: SiteInfo;
  skills: SiteSkills;
};

const PHILOSOPHY_JSON = `{
  "philosophy": "Systems-first thinking",
  "core": [
    "Robust at the core",
    "Intelligent at the surface",
    "Effortless to use"
  ],
  "approach": "Deterministic AI + Fast UX",
  "status": "production-ready"
}`;

export function AboutSection({ info, skills }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Collect ALL skill names for the marquee
  const allSkills = [
    ...(skills.frontend || []),
    ...(skills.backend || []),
    ...(skills.ai || []),
    ...(skills.deployment || []),
    ...(skills.tools || []),
  ].map((s) => s.name);

  return (
    <section id="about" className="py-28 sm:py-36" ref={sectionRef}>
      <div className="container-frame">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">01</span>
            <div className="h-px flex-1 bg-border-subtle" />
            <ScrambleText
              text="About"
              trigger={isInView}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim"
            />
          </motion.div>

          {/* Bento Grid */}
          <div className="grid gap-5 lg:grid-cols-12">
            {/* Cell A: Philosophy quote */}
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <Tilt3DCard
                className="group h-full border border-border-subtle bg-bg-obsidian p-8 sm:p-10 transition-colors hover:border-border-hover"
                intensity={6}
              >
                <div className="border-l-2 border-accent pl-6 sm:pl-8">
                  <p className="font-display text-xl font-medium leading-relaxed text-text-primary sm:text-2xl lg:text-3xl">
                    {info.aboutStatement}
                  </p>
                </div>
                <p className="mt-8 text-sm leading-relaxed text-text-muted">
                  {info.bio}
                </p>
              </Tilt3DCard>
            </motion.div>

            {/* Cell B: Stats with reveal animation */}
            <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-5">
              {info.stats.map((stat, i) => (
                <Tilt3DCard
                  key={stat.label}
                  className="group flex-1 border border-border-subtle bg-bg-obsidian p-6 transition-colors hover:border-border-hover"
                  intensity={12}
                >
                  <ScrambleText
                    text={stat.label}
                    trigger={isInView}
                    speed={40}
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim"
                  />
                  <p className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                    <Counter
                      value={parseInt(stat.value.replace(/\D/g, ""))}
                      suffix={stat.value.includes("+") ? "+" : ""}
                    />
                  </p>
                </Tilt3DCard>
              ))}
            </motion.div>

            {/* Cell C: Mini Terminal */}
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <Tilt3DCard
                className="group h-full border border-border-subtle bg-bg-obsidian overflow-hidden transition-colors hover:border-border-hover"
                intensity={8}
              >
                <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
                  <span className="size-2 rounded-full bg-red-500/50" />
                  <span className="size-2 rounded-full bg-yellow-500/50" />
                  <span className="size-2 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-[10px] font-medium tracking-wider text-text-dim">
                    philosophy.json
                  </span>
                </div>
                <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto">
                  <code>
                    {PHILOSOPHY_JSON.split("\n").map((line, i) => (
                      <span key={i} className="block">
                        <span className="select-none pr-4 text-text-dim/40">
                          {String(i + 1).padStart(2, " ")}
                        </span>
                        <span
                          className={line.includes('"') ? "text-text-muted" : "text-text-dim"}
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(/"([^"]+)":/g, '<span class="text-accent/70">"$1"</span>:')
                              .replace(/: "([^"]+)"/g, ': <span class="text-text-primary/80">"$1"</span>'),
                          }}
                        />
                      </span>
                    ))}
                  </code>
                </pre>
              </Tilt3DCard>
            </motion.div>

            {/* Cell D: Skills as infinite scrolling marquee */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-8 border border-border-subtle bg-bg-obsidian overflow-hidden transition-colors hover:border-border-hover"
            >
              <div className="border-b border-border-subtle px-8 py-4">
                <ScrambleText
                  text="Technical Stack"
                  trigger={isInView}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim"
                />
              </div>
              <div className="space-y-0">
                {/* Row 1: Forward */}
                <div className="relative border-b border-border-subtle py-4 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-bg-obsidian to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-bg-obsidian to-transparent" />
                  <Marquee speed={25} direction="left">
                    <div className="flex gap-6">
                      {allSkills.map((name) => (
                        <span
                          key={name}
                          className="whitespace-nowrap text-sm font-medium text-text-muted transition-colors hover:text-accent"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </Marquee>
                </div>
                {/* Row 2: Reverse */}
                <div className="relative py-4 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-bg-obsidian to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-bg-obsidian to-transparent" />
                  <Marquee speed={20} direction="right">
                    <div className="flex gap-6">
                      {[...allSkills].reverse().map((name) => (
                        <span
                          key={name}
                          className="whitespace-nowrap text-sm font-medium text-text-dim transition-colors hover:text-text-muted"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </Marquee>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
