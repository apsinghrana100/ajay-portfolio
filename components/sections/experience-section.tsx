"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tilt3DCard } from "@/components/shared/tilt-3d-card";
import { ScrambleText } from "@/components/shared/scramble-text";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { SiteExperience } from "@/lib/site-data";

export function ExperienceSection({ experience }: { experience: SiteExperience }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-28 sm:py-36" ref={ref}>
      <div className="container-frame">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">03</span>
            <div className="h-px flex-1 bg-border-subtle" />
            <ScrambleText
              text="Experience"
              trigger={isInView}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Professional Trajectory
            </h2>
          </motion.div>

          <div className="space-y-6">
            {experience.map((item, i) => (
              <motion.div
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3DCard
                  intensity={5}
                  className="group border border-border-subtle bg-bg-obsidian transition-colors hover:border-border-hover"
                >
                  <div className="grid gap-6 p-8 sm:p-10 md:grid-cols-12 md:gap-12">
                    <div className="md:col-span-3">
                      <p className="text-sm font-semibold text-accent/80">{item.duration}</p>
                    </div>
                    <div className="md:col-span-9 space-y-4">
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors">
                          {item.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-text-muted">{item.company}</p>
                      </div>
                      <ul className="space-y-2.5">
                        {item.description.map((bullet, idx) => (
                          <li key={idx} className="relative pl-4 text-sm leading-relaxed text-text-muted">
                            <span className="absolute left-0 top-[9px] size-1 rounded-full bg-accent/40" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border-subtle px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-dim transition-colors group-hover:border-border-hover"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
