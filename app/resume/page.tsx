import { headers } from "next/headers";
import { getSiteData } from "@/lib/site-data";
import { MapPin, Mail, ExternalLink, Link as LinkIcon, Phone } from "lucide-react";
import { PrintButton } from "./print-button";

export default async function ResumePage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const userParam = typeof searchParams.user === "string" ? searchParams.user : undefined;
  
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  const { info, experience, projects, skills } = getSiteData(host, userParam);

  return (
    <div className="min-h-screen bg-gray-100 py-10 print:py-0 print:bg-white text-gray-900 font-sans selection:bg-gray-300">
      <PrintButton />
      
      {/* Resume Container */}
      <main className="mx-auto max-w-[210mm] min-h-[297mm] bg-white p-12 sm:p-16 shadow-2xl print:shadow-none print:p-0">
        
        {/* Header Section */}
        <header className="mb-6 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-black sm:text-5xl">{info.name}</h1>
          <h2 className="mt-2 text-xl font-medium tracking-wide text-gray-700">{info.role}</h2>
          
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-gray-600">
            {info.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                <span>{info.location}</span>
              </div>
            )}
            {(info.location && (info as any).phone) && <span className="text-gray-300 print:hidden sm:inline">|</span>}
            {/* Added Phone field type to info if it exists (it's dynamically loaded via JSON) */}
            {(info as any).phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                <a href={`tel:${(info as any).phone}`} className="hover:text-black hover:underline">{(info as any).phone}</a>
              </div>
            )}
            {(((info.location || (info as any).phone)) && info.email) && <span className="text-gray-300 print:hidden sm:inline">|</span>}
            {info.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="size-3.5" />
                <a href={`mailto:${info.email}`} className="hover:text-black hover:underline">{info.email}</a>
              </div>
            )}
            {(info.email && info.social?.linkedin) && <span className="text-gray-300 print:hidden sm:inline">|</span>}
            {info.social?.linkedin && (
              <div className="flex items-center gap-1.5">
                <LinkIcon className="size-3.5" />
                <a href={info.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-black hover:underline">LinkedIn</a>
              </div>
            )}
            {(info.social?.linkedin && info.social?.github) && <span className="text-gray-300 print:hidden sm:inline">|</span>}
            {info.social?.github && (
              <div className="flex items-center gap-1.5">
                <LinkIcon className="size-3.5" />
                <a href={info.social.github} target="_blank" rel="noreferrer" className="hover:text-black hover:underline">GitHub</a>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {info.aboutStatement && (
          <section className="mb-6">
            <h3 className="mb-2 border-b-2 border-gray-800 pb-1 text-sm font-bold uppercase tracking-widest text-black">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-gray-800">{info.aboutStatement}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="mb-6">
            <h3 className="mb-3 border-b-2 border-gray-800 pb-1 text-sm font-bold uppercase tracking-widest text-black">Professional Experience</h3>
            <div className="space-y-5">
              {experience.map((exp, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-base font-bold text-black">{exp.role}</h4>
                      <div className="text-sm font-semibold text-gray-700">{exp.company}</div>
                    </div>
                    <div className="mt-1 text-sm font-semibold italic text-gray-600 sm:mt-0">{exp.duration}</div>
                  </div>
                  <ul className="mt-2 list-outside list-disc pl-4 space-y-1 text-sm text-gray-800">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-6">
            <h3 className="mb-3 border-b-2 border-gray-800 pb-1 text-sm font-bold uppercase tracking-widest text-black">Selected Projects</h3>
            <div className="space-y-5">
              {projects.filter(p => p.featured).slice(0, 4).map((proj, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <h4 className="flex items-center gap-2 text-base font-bold text-black">
                      {proj.title}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black print:hidden">
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </h4>
                    <div className="mt-1 text-sm font-semibold italic text-gray-600 sm:mt-0">{proj.role}</div>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-800">{proj.description}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-600"><span className="text-gray-900">Tech Stack:</span> {proj.stack.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && (
          <section className="mb-6 break-inside-avoid">
            <h3 className="mb-3 border-b-2 border-gray-800 pb-1 text-sm font-bold uppercase tracking-widest text-black">Technical Skills</h3>
            <div className="space-y-1.5 text-sm text-gray-800">
              {skills.frontend && skills.frontend.length > 0 && (
                <div className="flex gap-2">
                  <span className="w-24 font-bold text-black">Frontend:</span>
                  <span className="flex-1">{skills.frontend.map(s => s.name).join(", ")}</span>
                </div>
              )}
              {skills.backend && skills.backend.length > 0 && (
                <div className="flex gap-2">
                  <span className="w-24 font-bold text-black">Backend:</span>
                  <span className="flex-1">{skills.backend.map(s => s.name).join(", ")}</span>
                </div>
              )}
              {skills.deployment && skills.deployment.length > 0 && (
                <div className="flex gap-2">
                  <span className="w-24 font-bold text-black">Cloud & DevOps:</span>
                  <span className="flex-1">{skills.deployment.map(s => s.name).join(", ")}</span>
                </div>
              )}
              {skills.tools && skills.tools.length > 0 && (
                <div className="flex gap-2">
                  <span className="w-24 font-bold text-black">Tools & AI:</span>
                  <span className="flex-1">{skills.tools.map(s => s.name).join(", ")}</span>
                </div>
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
