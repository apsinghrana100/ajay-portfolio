"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Cpu, CpuIcon } from "lucide-react";

type FeaturesShowcaseProps = {
  features: string[];
  projectTitle: string;
};

// Helper to extract first few words as a bold high-impact term and the rest as description
const formatFeatureCopywriting = (feature: string) => {
  const parts = feature.split(" ");
  // Take first 3 words (or fewer if short) as the bold heavy-wording tag
  const splitIndex = Math.min(parts.length, 3);
  const boldTerm = parts.slice(0, splitIndex).join(" ");
  const restDesc = parts.slice(splitIndex).join(" ");
  
  return { boldTerm, restDesc };
};

export function FeaturesShowcase({ features, projectTitle }: FeaturesShowcaseProps) {
  return (
    <div className="relative rounded-xl border border-border/60 bg-bg-surface/30 p-8 shadow-panel backdrop-blur-xl overflow-hidden">
      
      {/* Subtle clean background glow underlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,123,86,0.02),transparent_50%)]" />

      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: ARCHITECTURAL OVERVIEW SUMMARY */}
        <div className="lg:col-span-4 flex flex-col justify-between p-2 border-b border-border/40 pb-6 lg:border-b-0 lg:border-r lg:border-border/45 lg:pb-0 lg:pr-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-accent-blue" />
              <span className="font-sans text-[10px]  font-bold uppercase tracking-[0.15em] text-accent-blue">
                SYSTEM SPECIFICATIONS
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-bold tracking-tight text-text-primary sm:text-lg">
                Engineered Capabilities
              </h3>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-text-secondary/90">
                A highly-optimized system built with deterministic execution models, asynchronous pipelines, and low-latency workflows to guarantee stability and performance under load.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CLEAN MINIMALIST UNIFIED FEATURE TIMELINE */}
        <div className="lg:col-span-8 flex flex-col justify-center pl-0 lg:pl-4">
          <div className="relative pl-6 sm:pl-0 space-y-4">
            
            {/* Minimalist vertical line connector */}
            <div className="absolute left-1.5 top-2.5 bottom-2.5 w-0.5 bg-border/40 sm:hidden" />

            <div className="grid gap-3.5 sm:grid-cols-2">
              {features.map((feature, i) => {
                const { boldTerm, restDesc } = formatFeatureCopywriting(feature);
                
                return (
                  <motion.div
                    key={feature}
                    whileHover={{ x: 2 }}
                    className="relative group flex items-start gap-3 p-3.5 rounded-md border border-border/40 bg-bg-surface/10 transition-all duration-300 hover:border-accent-blue/25 hover:bg-white/[0.01]"
                  >
                    {/* Minimalist dot indicator on vertical timeline */}
                    <div className="absolute -left-[23px] top-4.5 z-10 flex size-2 items-center justify-center sm:hidden">
                      <div className="size-2 rounded-full bg-slate-600 transition-all duration-300 group-hover:bg-accent-blue group-hover:scale-110" />
                    </div>

                    <CheckCircle2 className="size-3.5 text-accent-blue shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors">
                        <span className="font-display font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                          {boldTerm}{" "}
                        </span>
                        {restDesc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
