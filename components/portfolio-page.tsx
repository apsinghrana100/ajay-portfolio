"use client";

import { motion } from "framer-motion";

import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WorkSection } from "@/components/sections/work-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Navbar } from "@/components/layout/navbar";
import { PageLoader } from "@/components/layout/page-loader";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { fadeIn } from "@/lib/animations";
import type {
  SiteExperience,
  SiteInfo,
  SiteProjects,
  SiteSkills,
} from "@/lib/site-data";

type PortfolioPageProps = {
  info: SiteInfo;
  projects: SiteProjects;
  skills: SiteSkills;
  experience: SiteExperience;
};

export function PortfolioPage({
  info,
  projects,
  skills,
  experience,
}: PortfolioPageProps) {
  return (
    <div className="relative min-h-screen cursor-none bg-bg-void text-text-primary">
      <CustomCursor />
      <PageLoader name={info.name} />
      <Navbar info={info} />

      <motion.main variants={fadeIn} initial="hidden" animate="visible">
        <HeroSection info={info} />
        <AboutSection info={info} skills={skills} />
        <WorkSection projects={projects} />
        <ExperienceSection experience={experience} />
        <ContactSection info={info} />
      </motion.main>
    </div>
  );
}
