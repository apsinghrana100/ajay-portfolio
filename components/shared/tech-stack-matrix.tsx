"use client";

import { motion } from "framer-motion";
import { Layers, Monitor, Cpu, Database, Sparkle } from "lucide-react";

type TechStackMatrixProps = {
  stack: string[];
};

type StackLayer = {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: typeof Monitor;
  colorClass: string;
  glowClass: string;
  items: string[];
};

export function TechStackMatrix({ stack }: TechStackMatrixProps) {
  // Sort stack items into logical architectural layers
  const categorizeStack = (items: string[]): StackLayer[] => {
    const layers: StackLayer[] = [
      {
        id: "l1",
        name: "Interface & Interactive UI",
        code: "L1_CLIENT_DECK",
        description: "Responsive layouts, client-side motion pipelines, and micro-interactions.",
        icon: Monitor,
        colorClass: "text-accent-blue border-accent-blue/15 bg-accent-blue/5",
        glowClass: "group-hover/layer:border-accent-blue/30 hover:border-accent-blue/40",
        items: []
      },
      {
        id: "l2",
        name: "System Logic & Orchestration",
        code: "L2_RUNTIME_DECK",
        description: "AI prompt engineering, reasoning orchestrations, multi-agent networks, and runtime scripting.",
        icon: Cpu,
        colorClass: "text-accent-blue border-accent-blue/15 bg-accent-blue/5",
        glowClass: "group-hover/layer:border-accent-blue/30 hover:border-accent-blue/40",
        items: []
      },
      {
        id: "l3",
        name: "Persistence & Data Indexing",
        code: "L3_DATABASE_DECK",
        description: "Vector indexing, semantic chunk data processing, and document object stores.",
        icon: Database,
        colorClass: "text-accent-blue border-accent-blue/15 bg-accent-blue/5",
        glowClass: "group-hover/layer:border-accent-blue/30 hover:border-accent-blue/40",
        items: []
      }
    ];

    items.forEach((tech) => {
      const lower = tech.toLowerCase();
      
      // L1 Frontend
      if (
        lower.includes("next") ||
        lower.includes("react") ||
        lower.includes("tailwind") ||
        lower.includes("postcss") ||
        lower.includes("framer") ||
        lower.includes("css") ||
        lower.includes("html") ||
        lower.includes("gsap")
      ) {
        layers[0].items.push(tech);
      }
      // L3 Database
      else if (
        lower.includes("mongo") ||
        lower.includes("db") ||
        lower.includes("vector") ||
        lower.includes("search") ||
        lower.includes("upload") ||
        lower.includes("store") || 
        lower.includes("postgres") ||
        lower.includes("sql")
      ) {
        layers[2].items.push(tech);
      }
      // L2 Backend/AI/Logic as default
      else {
        layers[1].items.push(tech);
      }
    });

    // Handle fallbacks in case layers are empty
    return layers.filter(layer => layer.items.length > 0);
  };

  const activeLayers = categorizeStack(stack);

  return (
    <div className="relative rounded-xl border border-border/75 bg-bg-surface/30 p-6 shadow-panel backdrop-blur-xl overflow-hidden">
      
      {/* Dynamic background vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent-blue/[0.01] via-transparent to-accent-blue/[0.01]" />
      
      <div className="relative space-y-6">
        
        {/* Section Title */}
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-accent-blue/20 bg-accent-blue/10 text-accent-blue">
              <Layers className="size-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-display text-sm font-bold text-text-primary tracking-tight sm:text-base">
                System Infrastructure Matrix
              </h3>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9px] text-text-secondary/50">
            <Sparkle className="size-3 text-accent-blue animate-spin" style={{ animationDuration: '6s' }} />
          </span>
        </div>

        {/* Visual Stack blueprint layers */}
        <div className="space-y-4">
          {activeLayers.map((layer) => {
            const LayerIcon = layer.icon;
            
            return (
              <div
                key={layer.id}
                className="group/layer relative grid gap-4 p-4 rounded-md border border-border/40 bg-bg-surface/10 transition-all duration-300 hover:border-accent-blue/30 hover:bg-bg-surface/20"
              >
                
                {/* Visual connecting line indicator */}
                <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-accent-blue rounded" />

                {/* Left col: Layer Identifier */}
                <div className="flex flex-col gap-2 border-b border-border/30 pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`flex size-7 items-center justify-center rounded-md border ${layer.colorClass}`}>
                      <LayerIcon className="size-4" />
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 flex-1">
                      <span className="font-display text-sm font-bold text-text-primary">
                        {layer.name}
                      </span>
                      <div className="text-xs font-medium leading-relaxed text-text-secondary/85">
                        {layer.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {layer.items.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ y: -1, scale: 1.02 }}
                        className="rounded-md border border-border bg-bg-surface/30 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-text-secondary transition-colors hover:border-accent-blue/30 hover:bg-accent-blue/5 hover:text-accent-blue"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
