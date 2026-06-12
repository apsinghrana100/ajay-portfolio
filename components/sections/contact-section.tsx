"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Magnetic } from "@/components/shared/magnetic";
import { ScrambleText } from "@/components/shared/scramble-text";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { SiteInfo } from "@/lib/site-data";

const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

export function ContactSection({ info }: { info: SiteInfo }) {
  const [copied, setCopied] = useState(false);
  const [emailHover, setEmailHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const copyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-28 sm:py-36" ref={ref}>
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">04</span>
            <div className="h-px flex-1 bg-border-subtle" />
            <ScrambleText
              text="Contact"
              trigger={isInView}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-text-dim"
            />
          </motion.div>

          {/* Asymmetric two-column layout */}
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Big statement */}
            <motion.div variants={fadeUp} className="lg:col-span-7 space-y-8">
              <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-7xl">
                Have a project
                <br />
                in mind<span className="text-accent">?</span>
              </h2>

              <p className="max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
                Always interested in challenging problems — AI systems, fintech
                platforms, or anything that needs to work at scale.
              </p>

              {/* Big email link — the centerpiece */}
              <Magnetic distance={0.1}>
                <a
                  href={`mailto:${info.email}`}
                  className="group relative inline-block"
                  onMouseEnter={() => setEmailHover(true)}
                  onMouseLeave={() => setEmailHover(false)}
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-text-muted transition-colors group-hover:text-accent sm:text-xl lg:text-2xl">
                    {info.email}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: emailHover ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left", width: "100%" }}
                  />
                </a>
              </Magnetic>

              <button
                onClick={copyEmail}
                className="mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-dim transition-colors hover:text-text-muted"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-green-500"
                    >
                      <Check size={12} />
                      Copied to clipboard
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <Copy size={12} />
                      Copy email
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            {/* Right: Links stacked vertically */}
            <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col justify-end gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim mb-2">
                Find me on
              </p>

              {Object.entries(info.social).map(([key, href]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <Magnetic key={key} distance={0.1}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border-b border-border-subtle py-4 transition-colors hover:border-accent/30"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-text-dim transition-colors group-hover:text-accent" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-text-primary capitalize">
                          {key}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-text-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </Magnetic>
                );
              })}

              <Magnetic distance={0.1}>
                <a
                  href={`mailto:${info.email}`}
                  className="group flex items-center justify-between border-b border-border-subtle py-4 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center text-lg leading-none text-text-dim transition-colors group-hover:text-accent">@</span>
                    <span className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                      Email
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-text-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer variants={fadeUp} className="border-t border-border-subtle pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold tracking-tight text-text-primary">{info.name}</span>
                <span className="text-accent font-bold">.</span>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-text-dim">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
}
