"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Play, CheckCircle2, ChevronRight, Activity } from "lucide-react";

type FeatureConsoleProps = {
  features: string[];
  projectTitle: string;
};

// Custom trace logs generator tailored to feature names to simulate live systems
const generateMockLogs = (featureName: string): string[] => {
  const name = featureName.toLowerCase();
  
  if (name.includes("agent") || name.includes("orchestration")) {
    return [
      "patelpreet332@portfolio:~$ run-pipeline --multi-agent-orchestrator",
      "⚙️ Booting multi-agent orchestrator core v2.5...",
      "🔗 Dispatching prompts to PM, Architect, Business, and QA agents...",
      "⚡ Parallelizing Groq/Gemini API calls (192.4 tokens/sec)...",
      "📥 Compiling structured outputs segmented by domain...",
      "✅ Aggregate plan generated in 420ms (Confidence Score: 0.98)",
      "📊 Visual canvas output synchronized successfully."
    ];
  }
  
  if (name.includes("rag") || name.includes("retrieval") || name.includes("chunking") || name.includes("search")) {
    return [
      "patelpreet332@portfolio:~$ execute-search --query-scope=semantic",
      "🔍 Activating MongoDB vector search cluster...",
      "🧮 Executing Cosine Similarity index mapping (1024 dimensions)...",
      "🧩 semantic_chunker: processing text nodes into overlaps...",
      "📂 5 nearest neighbor document snippets retrieved (score > 0.89)...",
      "✅ Retrieval RAG context injection pipeline complete.",
      "📝 Ready for context-grounded response generation."
    ];
  }

  if (name.includes("pdf") || name.includes("upload") || name.includes("ingestion")) {
    return [
      "patelpreet332@portfolio:~$ upload --file-type=pdf --target=vector_store",
      "📥 Ingesting PDF file stream...",
      "🔄 Initializing layout parser & text extractors...",
      "📂 Partitioned document into 14 distinct layout nodes...",
      "💾 Generating text embeddings via lightweight Transformers model...",
      "🚀 Saved embeddings (1536-dim) to database collection...",
      "✅ Document ingestion complete."
    ];
  }

  if (name.includes("response") || name.includes("mode") || name.includes("strict") || name.includes("expert")) {
    return [
      "patelpreet332@portfolio:~$ set-response-mode --mode=expert",
      "⚙️ Switching LLM inference constraints...",
      "🛡️ Strict Mode active: Grounded checks (Source-Only verification)...",
      "🧠 Reasoning Trace: Context loaded -> Analysing claims -> Cross-checking...",
      "💬 Expert analysis mode enabled. Extended logical deductions permitted...",
      "✅ Prompt system-mode set.",
      "🤖 System ready."
    ];
  }

  // Fallback default realistic developer log
  return [
    `patelpreet332@portfolio:~$ compile-feature --name="${featureName.slice(0, 20)}..."`,
    "⚡ Initializing capability sub-routine...",
    "📦 Loading technical stacks and API context...",
    "🛡️ Testing safety compliance & token scopes...",
    "📈 Latency: 42ms | Memory usage: 12.4 MB",
    "✅ Module executed successfully with no warnings.",
    "🚀 Status: Ready and listening."
  ];
};

export function FeatureConsole({ features, projectTitle }: FeatureConsoleProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(0);

  // Trigger live typing simulation of logs whenever activeIndex changes
  useEffect(() => {
    const fullLogs = generateMockLogs(features[activeIndex]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedLogs([fullLogs[0]]); // Immediately show command prompt
    setTypingIndex(1);
    
    const interval = setInterval(() => {
      setTypingIndex((prev) => {
        if (prev < fullLogs.length) {
          setDisplayedLogs((current) => [...current, fullLogs[prev]]);
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [activeIndex, features]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-stretch">
      {/* LEFT COLUMN: IMMERSIVE PIPELINE SELECTOR */}
      <div className="lg:col-span-5 relative flex flex-col justify-between p-1">
        
        {/* Glow grid underlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_left_center,rgba(226,123,86,0.02),transparent_60%)]" />

        <div className="relative space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-accent-blue" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-accent-blue">
              SYSTEM PIPELINE FLOW
            </span>
          </div>

          <div className="relative pl-6">
            {/* Animated vertical connector pipeline line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border/60">
              <motion.div
                className="w-full bg-gradient-to-b from-accent-blue to-transparent"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-3">
              {features.map((feature, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={feature}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className={`relative group flex items-start gap-4 p-3.5 rounded-lg border cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-accent-blue/35 bg-accent-blue/[0.04] shadow-sm"
                        : "border-border/40 bg-bg-surface/20 hover:border-accent-blue/30 hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Glowing active node dot */}
                    <div className="absolute -left-[22px] top-4.5 z-10 flex size-2.5 items-center justify-center">
                      <div
                        className={`size-2.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-accent-blue scale-110"
                            : "bg-border group-hover:bg-accent-blue/60"
                        }`}
                      />
                    </div>

                    <span className={`font-mono text-xs ${isActive ? "text-accent-blue font-bold" : "text-text-secondary/70"}`}>
                      0{i + 1}
                    </span>

                    <div className="space-y-1 flex-1">
                      <p className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${isActive ? "text-text-primary font-bold" : "text-text-secondary group-hover:text-text-primary"}`}>
                        {feature}
                      </p>
                      {isActive && (
                        <motion.span
                          layoutId="active-tag"
                          className="inline-flex items-center gap-1 rounded bg-accent-blue/10 px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-accent-blue"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Play className="size-2 fill-current" />
                          STEP_0{i + 1}_ACTIVE
                        </motion.span>
                      )}
                    </div>
                    
                    <ChevronRight className={`size-4 self-center text-text-secondary/50 transition-transform duration-300 ${isActive ? "text-accent-blue translate-x-0.5" : "group-hover:translate-x-0.5 group-hover:text-text-secondary"}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: DRAMATIC DEVELOPER TERMINAL CONSOLE */}
      <div className="lg:col-span-7 flex flex-col">
        <div className="relative flex flex-col flex-1 rounded-xl border border-border/80 bg-bg-surface/40 p-4 shadow-panel backdrop-blur-xl group/terminal transition duration-500 hover:border-accent-blue/20">
          
          {/* Neon back glow */}
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-accent-blue/3 via-accent-blue/3 to-transparent opacity-30 blur-xl pointer-events-none group-hover/terminal:opacity-50 transition duration-500" />

          {/* Terminal Window Header */}
          <div className="relative flex items-center justify-between border-b border-border/40 pb-3 mb-4">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-rose-500/80" />
              <span className="size-2.5 rounded-full bg-amber-500/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
            </div>
            
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-text-secondary/70">
              <Terminal className="size-3.5 text-accent-blue" />
              <span>exec_console // {projectTitle.toLowerCase()}.log</span>
            </div>

            <div className="w-12" />
          </div>

          {/* Dynamic Console Output Screen */}
          <div className="relative flex-1 font-mono text-xs leading-6 p-4 rounded-lg bg-black/40 border border-border/30 overflow-y-auto scrollbar-custom min-h-[280px]">
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {displayedLogs.map((log, index) => {
                  const isPrompt = log.startsWith("patelpreet332");
                  const isSuccess = log.startsWith("✅") || log.includes("successfully");
                  
                  return (
                    <motion.div
                      key={`${activeIndex}-${index}-${log.slice(0, 10)}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${
                        isPrompt
                          ? "text-accent-blue font-bold"
                          : isSuccess
                          ? "text-emerald-500/90 font-bold"
                          : "text-text-secondary/90"
                      }`}
                    >
                      {log}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {/* Live blinking cursor simulation */}
            <motion.span
              className="inline-block w-1.5 h-3.5 bg-accent-blue ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>

          {/* Console Footprint metadata */}
          <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-text-secondary/50">
            <span>[ SYSTEM LAYER: RUNTIME_ENV ]</span>
            <span>STATUS: SYNCHRONIZED</span>
          </div>

        </div>
      </div>
    </div>
  );
}
