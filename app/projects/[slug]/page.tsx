import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { getSiteData, getExistingUsers } from "@/lib/site-data";
import { ProjectDetailContent } from "@/components/shared/project-detail-content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const allSlugs = new Set<string>();
  
  // Read all existing users dynamically from the filesystem
  const users = getExistingUsers();
  
  // Load project slugs for each active user dynamically
  for (const user of users) {
    const { projects } = getSiteData(undefined, user);
    projects.filter((p) => p.featured !== false).forEach((p) => allSlugs.add(p.slug));
  }

  return Array.from(allSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  props: ProjectPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const userParam = typeof searchParams.user === "string" ? searchParams.user : undefined;

  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const { info, projects } = getSiteData(host, userParam);
  const featuredProjects = projects.filter((p) => p.featured !== false);
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: `Project Not Found | ${info.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${project.title} | ${info.name}`,
    description: project.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProjectDetailPage(props: ProjectPageProps) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const userParam = typeof searchParams.user === "string" ? searchParams.user : undefined;

  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const { projects } = getSiteData(host, userParam);
  const featuredProjects = projects.filter((p) => p.featured !== false);

  const currentIndex = featuredProjects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    notFound();
  }

  const project = featuredProjects[currentIndex];
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];
  const prevProject = featuredProjects[(currentIndex - 1 + featuredProjects.length) % featuredProjects.length];
  const totalProjects = featuredProjects.length;
  const caseStudyIndex = currentIndex + 1;

  return (
    <ProjectDetailContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      totalProjects={totalProjects}
      caseStudyIndex={caseStudyIndex}
    />
  );
}
