import { headers } from "next/headers";
import { getSiteData } from "@/lib/site-data";
import { PortfolioPage } from "@/components/portfolio-page";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams;
  const userParam = typeof searchParams.user === "string" ? searchParams.user : undefined;
  
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const { info, experience, projects, skills } = getSiteData(host, userParam);

  return (
    <PortfolioPage
      info={info}
      projects={projects}
      skills={skills}
      experience={experience}
    />
  );
}
