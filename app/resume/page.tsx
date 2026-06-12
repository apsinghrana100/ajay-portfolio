import { headers } from "next/headers";
import { getSiteData } from "@/lib/site-data";
import { MapPin, Mail, ExternalLink, Link as LinkIcon } from "lucide-react";
import { PrintButton } from "./print-button";

export default async function ResumePage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const userParam = typeof searchParams.user === "string" ? searchParams.user : undefined;
  
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const { info, experience, projects, skills } = getSiteData(host, userParam);

  return (
    <div className="min-h-screen bg-neutral-100 py-10 print:py-0 print:bg-white text-black font-sans">
      <PrintButton />
      
      <main className="mx-auto max-w-[210mm] min-h-[297mm] bg-white p-12 shadow-2xl print:shadow-none print:p-0">
        
        {/* Header Section */}
        <header className="mb-8 border-b-2 border-black pb-6">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-black">{info.name}</h1>
          <h2 className="mt-2 text-lg font-medium text-neutral-600">{info.role}</h2>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
            {info.location && (
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>{info.location}</span>
              </div>
            )}
            {info.email && (
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                <a href={`mailto:${info.email}`} className="hover:text-black hover:underline">{info.email}</a>
              </div>
            )}
            {info.social?.linkedin && (
              <div className="flex items-center gap-1">
                <LinkIcon className="size-4" />
                <a href={info.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-black hover:underline">LinkedIn</a>
              </div>
            )}
            {info.social?.github && (
              <div className="flex items-center gap-1">
                <LinkIcon className="size-4" />
                <a href={info.social.github} target="_blank" rel="noreferrer" className="hover:text-black hover:underline">GitHub</a>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {info.aboutStatement && (
          <section className="mb-8">
            <h3 className="mb-3 text-lg font-bold uppercase tracking-widest text-black">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-neutral-800">{info.aboutStatement}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-4 border-b border-neutral-300 pb-2 text-lg font-bold uppercase tracking-widest text-black">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-black">{exp.role}</h4>
                      <div className="text-sm font-medium text-neutral-600">{exp.company}</div>
                    </div>
                    <div className="text-sm font-medium text-neutral-500">{exp.duration}</div>
                  </div>
                  <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-800">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="pl-2 leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-4 border-b border-neutral-300 pb-2 text-lg font-bold uppercase tracking-widest text-black">Selected Projects</h3>
            <div className="space-y-6">
              {projects.filter(p => p.featured).slice(0, 4).map((proj, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex items-start justify-between">
                    <h4 className="flex items-center gap-2 font-bold text-black">
                      {proj.title}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-black print:hidden">
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </h4>
                    <div className="text-sm font-medium text-neutral-500">{proj.role}</div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-800">{proj.description}</p>
                  <p className="mt-1 text-xs font-medium text-neutral-500">Tech: {proj.stack.join(" • ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && (
          <section className="mb-8 break-inside-avoid">
            <h3 className="mb-4 border-b border-neutral-300 pb-2 text-lg font-bold uppercase tracking-widest text-black">Technical Skills</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-800">
              {skills.frontend && skills.frontend.length > 0 && (
                <div>
                  <span className="font-bold text-black">Frontend: </span>
                  {skills.frontend.map(s => s.name).join(", ")}
                </div>
              )}
              {skills.backend && skills.backend.length > 0 && (
                <div>
                  <span className="font-bold text-black">Backend: </span>
                  {skills.backend.map(s => s.name).join(", ")}
                </div>
              )}
              {skills.deployment && skills.deployment.length > 0 && (
                <div>
                  <span className="font-bold text-black">DevOps & Cloud: </span>
                  {skills.deployment.map(s => s.name).join(", ")}
                </div>
              )}
              {skills.tools && skills.tools.length > 0 && (
                <div>
                  <span className="font-bold text-black">Tools & AI: </span>
                  {skills.tools.map(s => s.name).join(", ")}
                </div>
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
