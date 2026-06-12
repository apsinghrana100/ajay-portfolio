"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  GitFork,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
  Layers,
  Globe,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

import { ProjectGallery } from "@/components/shared/project-gallery";
import { Magnetic } from "@/components/shared/magnetic";
import { FeaturesShowcase } from "@/components/shared/features-showcase";
import { TechStackMatrix } from "@/components/shared/tech-stack-matrix";
import { fadeUp, fadeIn } from "@/lib/animations";
import type { SiteProject } from "@/lib/site-data";

type ProjectDetailContentProps = {
  project: SiteProject;
  prevProject: SiteProject;
  nextProject: SiteProject;
  totalProjects: number;
  caseStudyIndex: number;
};

export function ProjectDetailContent({
  project,
  prevProject,
  nextProject,
  totalProjects,
  caseStudyIndex,
}: ProjectDetailContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userQuery = searchParams.get("user");
  const { scrollY, scrollYProgress } = useScroll();
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Track scroll depth to toggle floating cockpit and active section
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowStickyNav(latest > 300);
      
      // Basic section spy logic
      if (latest < 800) {
        setActiveSection("overview");
      } else if (latest >= 800 && latest < 1600) {
        setActiveSection("narrative");
      } else if (latest >= 1600 && latest < 2400) {
        setActiveSection("features");
      } else {
        setActiveSection("gallery");
      }
    });
    return () => unsubscribe();
  }, [scrollY]);


  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    let userQuery = "";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      userQuery = params.get("user") || params.get("profile") || "";
    }
    
    if (userQuery) {
      router.push(`/?user=${userQuery}`);
    } else {
      router.push("/");
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-accent-blue/20 selection:text-text-primary"
    >
      
      {/* Scroll Progress Bar at the top of the viewport */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-border/40 pointer-events-none">
        <motion.div 
          className="h-full bg-accent-blue shadow-[0_0_10px_rgba(217,119,6,0.5)]"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "0%"
          }}
        />
      </div>

      {/* FLOATING GLASSMORPHIC NAVIGATION COCKPIT (Commented out as requested) */}
      {/* <AnimatePresence>
        {showStickyNav && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 inset-x-4 z-40 mx-auto max-w-5xl rounded-xl border border-white/10 bg-bg-surface/75 px-4 py-3 shadow-hover backdrop-blur-md flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={handleBackToHome}
                className="group flex items-center justify-center size-8 rounded-md border border-border/80 bg-bg-surface/20 text-text-secondary transition hover:border-accent-blue hover:text-accent-blue"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              </a>
              <div className="h-4 w-px bg-border/40" />
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold text-accent-blue tracking-wider">
                  [{project.id}]
                </span>
                <span className="font-display text-xs font-bold truncate max-w-[120px] sm:max-w-none">
                  {project.title}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { id: "overview", label: "OVERVIEW" },
                { id: "narrative", label: "ARCHITECTURE" },
                { id: "features", label: "CAPABILITIES" },
                { id: "gallery", label: "PLAYBOOK" }
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`font-mono text-[8px] font-bold tracking-widest transition-colors cursor-pointer ${
                    activeSection === sec.id ? "text-accent-blue" : "text-text-secondary/70 hover:text-text-primary"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="rounded bg-accent-blue px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white hover:bg-accent-blue/90 transition-all flex items-center gap-1.5"
                >
                  <span>LIVE</span>
                  <ExternalLink size={10} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-glow absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,119,6,0.025),transparent_45%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* TOP BAR / NAVIGATION COCKPIT */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border bg-bg-surface/35 p-4 shadow-resting backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <Magnetic distance={0.2}>
              <a
                href="/"
                onClick={handleBackToHome}
                className="group inline-flex items-center gap-2 rounded-md border border-border/80 bg-bg-surface/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary transition-all hover:border-accent-blue hover:bg-bg-surface/40 hover:text-text-primary cursor-pointer"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Back to main home
              </a>
            </Magnetic>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-blue"></span>
              </span>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary/60">
                CASE STUDY {String(caseStudyIndex).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
              </p>
            </div>

            <div className="h-6 w-px bg-border/40" />

            <div className="flex items-center gap-1.5">
              <Magnetic distance={0.15}>
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group inline-flex size-8 items-center justify-center rounded-md border border-border bg-bg-surface/20 text-text-secondary transition hover:border-accent-blue hover:bg-bg-surface/40 hover:text-text-primary"
                  title={`Previous: ${prevProject.title}`}
                >
                  <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                </Link>
              </Magnetic>

              <Magnetic distance={0.15}>
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group inline-flex size-8 items-center justify-center rounded-md border border-border bg-bg-surface/20 text-text-secondary transition hover:border-accent-blue hover:bg-bg-surface/40 hover:text-text-primary"
                  title={`Next: ${nextProject.title}`}
                >
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 space-y-16 lg:mt-16">
          
          {/* MAJESTIC SPLIT HERO HEADLINE BLOCK */}
          <div id="overview" className="grid gap-12 lg:grid-cols-12 lg:items-center border-b border-border/40 pb-12">
            
            {/* Left Content Column (cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded border border-accent-blue/20 bg-accent-blue/5 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-accent-blue">
                  <Sparkles className="size-3" />
                  CASE_STUDY_NO //0{project.id}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded border border-border bg-bg-surface/20 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/95">
                  <Calendar className="size-3 text-text-secondary/80" />
                  PRODUCTION_YEAR // {project.year || "2025"}
                </span>
              </div>
              
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              
              <p className="text-sm sm:text-base font-normal leading-relaxed text-text-secondary max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Right Interactive Mockup Column (cols 8-12) */}
            <div className="lg:col-span-5 relative">
              {/* Radial underlay glow */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-accent-blue/10 to-transparent opacity-40 blur-xl pointer-events-none" />

              {/* Hardcoded Premium Dark Mode macOS Browser Mockup */}
              <div className="relative group/browser rounded-xl border border-white/10 bg-[#16161a] p-1.5 shadow-resting transition duration-500 hover:border-accent-blue/20">
                {/* macOS Browser chrome header */}
                <div className="relative flex items-center justify-between border-b border-white/5 px-3 py-1.5 bg-[#0f0f12] rounded-t-lg">
                  <div className="flex gap-1 shrink-0">
                    <span className="size-2 rounded-full bg-rose-500/80" />
                    <span className="size-2 rounded-full bg-amber-500/80" />
                    <span className="size-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="rounded bg-white/5 px-4 py-0.2 text-[8px] font-mono text-slate-400 border border-white/5 select-none truncate">
                    {project.slug}
                  </div>
                  <div className="w-6" />
                </div>

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-b-lg bg-[#0a0a0c]">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover transition duration-700 group-hover/browser:scale-[1.01]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* TWO-COLUMN INTUITIVE DOSSIER BODY */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Left Column (cols 1-8): Technical Chronicles & Blueprints */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Chronicles Terminal Section */}
              <div id="narrative" className="space-y-8">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-text-secondary/60 block">
                    [SYS_DIAGNOSTICS_CHRONICLES]
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                    Architectural Chronicles
                  </h2>
                </div>

                {/* Operations Terminal-Style Deck */}
                <div className="space-y-6">
                  
                  {/* Pillar 1: The Challenge */}
                  <div className="relative rounded-xl border border-border bg-bg-surface/20 p-6 space-y-4 hover:border-accent-blue/20 transition-all duration-300">
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <div className="flex items-center gap-2.5 text-accent-blue">
                        <ShieldAlert size={16} />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                          01_SYSTEM_FRICTION_DIAGNOSTIC
                        </h3>
                      </div>
                      <span className="font-mono text-[8px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded">
                        CRITICAL_DIFFICULTY
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-normal leading-relaxed text-text-secondary">
                      {project.challenge}
                    </p>
                  </div>

                  {/* Pillar 2: Strategy */}
                  <div className="relative rounded-xl border border-border bg-bg-surface/20 p-6 space-y-4 hover:border-accent-blue/20 transition-all duration-300">
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <div className="flex items-center gap-2.5 text-accent-blue">
                        <GitFork size={16} />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                          02_ARCHITECTURAL_MODEL_PLANNING
                        </h3>
                      </div>
                      <span className="font-mono text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                        STRATEGIC_MAP
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-normal leading-relaxed text-text-secondary">
                      {project.approach}
                    </p>
                  </div>

                  {/* Pillar 3: Solution */}
                  <div className="relative rounded-xl border border-border bg-bg-surface/20 p-6 space-y-4 hover:border-accent-blue/20 transition-all duration-300">
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <div className="flex items-center gap-2.5 text-accent-blue">
                        <Cpu size={16} />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                          03_PRODUCTION_SOLUTION_COMPILATION
                        </h3>
                      </div>
                      <span className="font-mono text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                        COMPILED_OK
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-normal leading-relaxed text-text-secondary">
                      {project.solution}
                    </p>
                  </div>

                </div>
              </div>

              {/* System Capabilities Section */}
              {project.features && project.features.length > 0 && (
                <div id="features" className="space-y-8 border-t border-border/40 pt-12">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-text-secondary/60 block">
                      [SYS_CAPABILITIES_SHEET]
                    </span>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                      Technical Capabilities & Blueprints
                    </h2>
                  </div>
                  <FeaturesShowcase features={project.features} projectTitle={project.title} />
                </div>
              )}

              {/* Technologies Blueprint Grid */}
              <div className="border-t border-border/40 pt-12">
                <TechStackMatrix stack={project.stack} />
              </div>

              {/* Interface Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div id="gallery" className="space-y-8 border-t border-border/40 pt-12">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-text-secondary/60 block">
                      [SYS_VISUAL_PLAYBOOK]
                    </span>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                      Interface & Deep-Dive Canvas
                    </h2>
                  </div>
                  <div className="relative rounded-xl border border-border bg-bg-surface/30 p-4 shadow-resting">
                    <ProjectGallery title={project.title} gallery={project.gallery} />
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (cols 9-12): Sticky Analytical Console */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              
              {/* Dynamic CTAs Deployment Panel */}
              {((project.githubUrl && project.githubUrl.trim() !== "") || (project.liveUrl && project.liveUrl.trim() !== "")) && (
                <div className="rounded-xl border border-border bg-bg-surface/30 p-5 shadow-resting space-y-3.5">
                  <span className="font-mono text-[8px] font-bold text-text-muted select-none uppercase tracking-widest block border-b border-border/40 pb-2">
                    [DEPLOYMENT_ACTIONS]
                  </span>
                  
                  <div className="flex flex-col gap-2.5">
                    {project.liveUrl && project.liveUrl.trim() !== "" && (
                      <Magnetic distance={0.15}>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex w-full items-center justify-between rounded-md bg-accent-blue px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-accent-blue/90"
                        >
                          <span>Visit Live System</span>
                          <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </Magnetic>
                    )}
                    
                    {project.githubUrl && project.githubUrl.trim() !== "" && (
                      <Magnetic distance={0.15}>
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex w-full items-center justify-between rounded-md border border-border bg-bg-surface/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-secondary transition hover:border-accent-blue/30 hover:bg-bg-surface/40 hover:text-text-primary"
                        >
                          <span>Source Code</span>
                          <FaGithub className="size-3.5 text-text-secondary group-hover:text-text-primary" />
                        </Link>
                      </Magnetic>
                    )}
                  </div>
                </div>
              )}

              {/* Integrated System Diagnostics Console */}
              <div className="rounded-xl border border-white/10 bg-[#131318] p-6 shadow-resting space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-mono text-[8px] font-bold text-[#86efac] uppercase tracking-widest">
                    [DIAGNOSTICS_CONSOLE]
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="font-mono text-[7px] text-slate-400">SYS_ONLINE</span>
                  </div>
                </div>

                {/* System Impact Card (Unaltered, high-visibility white text on dark background) */}
                <div className="rounded border border-accent-blue/20 bg-accent-blue/5 p-4 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-accent-blue" />
                  <span className="font-mono text-[7px] font-bold text-accent-blue uppercase tracking-widest block">
                    ENGINEERED_SYSTEM_IMPACT
                  </span>
                  <p className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-200">
                    {project.impact}
                  </p>
                </div>

                {/* Technical Node Specifications Grid (Fixed high-contrast light colors for dark card) */}
                <div className="space-y-4">
                  {/* Metric 1: My Role */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-7.5 shrink-0 items-center justify-center rounded bg-accent-blue/5 text-accent-blue border border-accent-blue/10">
                      <Briefcase className="size-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">My Role</p>
                      <p className="font-sans text-xs font-bold text-slate-100 leading-tight">{project.role}</p>
                    </div>
                  </div>

                  {/* Metric 2: Timeline */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-7.5 shrink-0 items-center justify-center rounded bg-accent-blue/5 text-accent-blue border border-accent-blue/10">
                      <Calendar className="size-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">Timeline</p>
                      <p className="font-sans text-xs font-bold text-slate-100 leading-tight">{project.timeline || "Continuous"}</p>
                    </div>
                  </div>

                  {/* Metric 3: Focus */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-7.5 shrink-0 items-center justify-center rounded bg-accent-blue/5 text-accent-blue border border-accent-blue/10">
                      <Target className="size-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">Technical Focus</p>
                      <p className="font-sans text-xs font-bold text-slate-100 leading-tight">{project.focus}</p>
                    </div>
                  </div>
                </div>

              </div>

            </aside>

          </div>

          {/* DYNAMIC DOSSIER NAVIGATION ROUTER FOOTER */}
          <motion.footer
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4 border-t border-border/40 pt-12 lg:grid-cols-2"
          >
            {/* Prev Router */}
            <Link
              href={userQuery ? `/projects/${prevProject.slug}?user=${userQuery}` : `/projects/${prevProject.slug}`}
              className="group relative flex items-center justify-between gap-6 rounded-md border border-border/60 bg-bg-surface/30 p-4 shadow-sm transition-all duration-500 hover:border-accent-blue/30 hover:bg-accent-blue/[0.01]"
            >
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-accent-blue/[0.01] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="space-y-1 text-left relative z-10">
                <span className="inline-flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-widest text-text-secondary/60 group-hover:text-accent-blue transition-colors duration-300">
                  <ChevronLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                  PREVIOUS_NODE
                </span>
                <span className="block font-display text-sm sm:text-base font-bold text-text-primary transition-colors duration-300">
                  {prevProject.title}
                </span>
              </div>

              <div className="relative aspect-[16/9] w-20 shrink-0 overflow-hidden rounded-md border border-border bg-bg-primary shadow-sm relative z-10 transition duration-500 group-hover:border-accent-blue/20">
                <Image
                  src={prevProject.thumbnail}
                  alt={prevProject.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="80px"
                />
              </div>
            </Link>

            {/* Next Router */}
            <Link
              href={userQuery ? `/projects/${nextProject.slug}?user=${userQuery}` : `/projects/${nextProject.slug}`}
              className="group relative flex items-center justify-between gap-6 rounded-md border border-border/60 bg-bg-surface/30 p-4 shadow-sm transition-all duration-500 hover:border-accent-blue/30 hover:bg-accent-blue/[0.01]"
            >
              <div className="absolute inset-0 rounded-md bg-gradient-to-l from-accent-blue/[0.01] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="space-y-1 text-left relative z-10">
                <span className="inline-flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-widest text-text-secondary/60 group-hover:text-accent-blue transition-colors duration-300">
                  NEXT_NODE
                  <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="block font-display text-sm sm:text-base font-bold text-text-primary transition-colors duration-300">
                  {nextProject.title}
                </span>
              </div>

              <div className="relative aspect-[16/9] w-20 shrink-0 overflow-hidden rounded-md border border-border bg-bg-primary shadow-sm relative z-10 transition duration-500 group-hover:border-accent-blue/20">
                <Image
                  src={nextProject.thumbnail}
                  alt={nextProject.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="80px"
                />
              </div>
            </Link>
          </motion.footer>

          {/* RETURN HUB FOOTER CTA */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center pt-6 pb-12"
          >
            <Magnetic distance={0.3}>
              <a
                href="/"
                onClick={handleBackToHome}
                className="group inline-flex items-center gap-2 rounded-md border border-border/80 bg-bg-surface/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-text-secondary transition hover:border-accent-blue/30 hover:bg-bg-surface/40 hover:text-text-primary cursor-pointer"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Return to home hub
              </a>
            </Magnetic>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
