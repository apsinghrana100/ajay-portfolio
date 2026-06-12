// 1. Static templates to define Types for full autocomplete and IDE safety
import templateInfo from "@/data/ajay/info.json";
import templateProjects from "@/data/ajay/projects.json";
import templateSkills from "@/data/ajay/skills.json";
import templateExperience from "@/data/ajay/experience.json";
import templateTheme from "@/data/ajay/theme.json";

export type SiteInfo = typeof templateInfo;
export type SiteProjects = typeof templateProjects;
export type SiteSkills = typeof templateSkills;
export type SiteExperience = typeof templateExperience;
export type SiteTheme = typeof templateTheme;
export type SiteProject = SiteProjects[number];

export type PortfolioUser = string;

// Safely require server-side Node modules so client-side compilation never breaks
const fs = typeof window === "undefined" ? require("fs") : null;
const path = typeof window === "undefined" ? require("path") : null;

/**
 * 🔗 PRODUCTION DOMAIN MAPPINGS:
 * Maps incoming live hostnames directly to the correct user.
 */
export const DOMAIN_USER_MAP: Record<string, string> = {
  "portfolio-azure-five-61.vercel.app": "ajay",
  "dimpy-portfolio.vercel.app": "dimpy",
  "drashti-fullstack-portfolio.vercel.app": "drashti",
  "jayraj-fullstack-portfolio.vercel.app": "jayraj",
  "chirag-fullstack-portfolio.vercel.app": "chirag",
};

/**
 * 🛠️ MANUAL OVERRIDE FLAG:
 * Change this value to manually switch between portfolios locally:
 * - "ajay" | "dimpy" | "drashti" | "jayraj" | "chirag" (any folder name that exists under /data)
 * - null    : Automatically detect based on URL/hostname, query param (?user=dimpy), or environment variables
 */
export const ACTIVE_PORTFOLIO_OVERRIDE: string | null = null;

/**
 * Lists all existing profile folders under /data dynamically from the filesystem.
 */
export function getExistingUsers(): string[] {
  if (!fs || !path) return ["ajay", "dimpy"];

  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) return ["ajay", "dimpy"];
    
    return fs.readdirSync(dataDir).filter((file: string) => {
      const fullPath = path.join(dataDir, file);
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, "info.json"))
      );
    });
  } catch (error) {
    console.error("Error reading data folders:", error);
    return ["ajay", "dimpy"];
  }
}

export function getActiveUser(hostname?: string, userParam?: string): string {
  const existingUsers = getExistingUsers();
  
  const validateUser = (user: string | undefined): string | null => {
    if (!user) return null;
    const normalized = user.toLowerCase().trim();
    return existingUsers.includes(normalized) ? normalized : null;
  };

  // 1. Check manual override flag
  const overrideVal = validateUser(ACTIVE_PORTFOLIO_OVERRIDE || undefined);
  if (overrideVal) return overrideVal;

  // 2. Check query parameter/argument (e.g. ?user=dimpy or passed from server props)
  const paramVal = validateUser(userParam);
  if (paramVal) return paramVal;

  // 3. Check environment variable (perfect for branch-specific Vercel builds)
  const envVal = validateUser(process.env.NEXT_PUBLIC_PORTFOLIO_USER || process.env.PORTFOLIO_USER);
  if (envVal) return envVal;

  // 4. Detect from URL/hostname
  let currentHost = hostname || "";
  if (typeof window !== "undefined") {
    currentHost = window.location.hostname;
    
    // Check client URL query parameters as a fallback
    const params = new URLSearchParams(window.location.search);
    const queryUserVal = validateUser(params.get("user") || params.get("profile") || undefined);
    if (queryUserVal) return queryUserVal;
  }

  if (currentHost) {
    const hostLower = currentHost.toLowerCase().trim();
    
    // Exact mapping from provided domains
    for (const [domain, user] of Object.entries(DOMAIN_USER_MAP)) {
      if (hostLower.includes(domain.toLowerCase())) {
        const mappedVal = validateUser(user);
        if (mappedVal) return mappedVal;
      }
    }
    
    // Dynamic matching: if the domain hostname contains any of the folder names, match it!
    // E.g. "jayraj-fullstack-portfolio.vercel.app" automatically matches "jayraj"
    for (const user of existingUsers) {
      if (hostLower.includes(user)) {
        return user;
      }
    }
  }

  // Default fallback (uses "ajay" if it exists, otherwise the first folder found)
  return existingUsers.includes("ajay") ? "ajay" : existingUsers[0] || "ajay";
}

/**
 * Loads the active user's data dynamically from the filesystem at runtime/build-time
 */
export function getSiteData(hostname?: string, userParam?: string) {
  const user = getActiveUser(hostname, userParam);
  
  // Return template statically on client side to avoid compilation issues
  if (!fs || !path) {
    return {
      info: { ...templateInfo, resumeUrl: `/api/resume?user=${user}` },
      projects: templateProjects,
      skills: templateSkills,
      experience: templateExperience,
      theme: templateTheme,
    };
  }

  const dataDir = path.join(process.cwd(), "data");
  const userDir = path.join(dataDir, user);
  
  try {
    const loadJSON = (filename: string) => {
      const filePath = path.join(userDir, filename);
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
      }
      // Fallback to template if specific file is missing
      const fallbackPath = path.join(dataDir, "ajay", filename);
      return JSON.parse(fs.readFileSync(fallbackPath, "utf8"));
    };

    const info = loadJSON("info.json") as SiteInfo;
    info.resumeUrl = `/api/resume?user=${user}`;

    return {
      info,
      projects: loadJSON("projects.json") as SiteProjects,
      skills: loadJSON("skills.json") as SiteSkills,
      experience: loadJSON("experience.json") as SiteExperience,
      theme: loadJSON("theme.json") as SiteTheme,
    };
  } catch (error) {
    console.error(`Error dynamically loading portfolio data for user "${user}":`, error);
    
    return {
      info: { ...templateInfo, resumeUrl: `/api/resume?user=${user}` },
      projects: templateProjects,
      skills: templateSkills,
      experience: templateExperience,
      theme: templateTheme,
    };
  }
}
