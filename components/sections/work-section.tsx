"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ScrambleText } from "@/components/shared/scramble-text";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { SiteProjects } from "@/lib/site-data";

export function WorkSection({ projects }: { projects: SiteProjects }) {
  const searchParams = useSearchParams();
  const userQuery = searchParams.get("user");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const featured = useMemo(
    () => projects.filter((p) => p.featured !== false),
    [projects]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="work" className="py-28 sm:py-36">
      <div className="container-frame">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">02</span>
            <div className="h-px flex-1 bg-border-subtle" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">Work</span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Selected Projects
            </h2>
          </motion.div>
        </motion.div>

        {/* Hover-reveal project list */}
        <div
          ref={containerRef}
          className="relative mt-16"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {/* Floating preview image that follows cursor */}
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute z-30 hidden lg:block"
                style={{
                  left: springX,
                  top: springY,
                  x: 20,
                  y: -140,
                }}
              >
                <div className="h-[280px] w-[420px] overflow-hidden border border-border-hover bg-bg-card shadow-2xl">
                  <Image
                    src={featured[activeIndex].thumbnail}
                    alt={featured[activeIndex].title}
                    width={420}
                    height={280}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project rows */}
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                href={
                  userQuery
                    ? `/projects/${project.slug}?user=${userQuery}`
                    : `/projects/${project.slug}`
                }
                className="group relative block border-b border-border-subtle py-8 transition-colors hover:border-border-hover"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-sm text-text-dim transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary transition-colors group-hover:text-accent sm:text-3xl lg:text-5xl">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden items-center gap-3 sm:flex">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium uppercase tracking-wider text-text-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="size-5 text-text-dim transition-all group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
                <p className="mt-2 ml-12 max-w-xl text-sm text-text-dim transition-colors group-hover:text-text-muted sm:ml-16">
                  {project.focus}
                </p>

                {/* Hover fill bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-accent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left", width: "100%" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
