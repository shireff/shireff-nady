import { siteConfig } from "@/config/site";

const API_BASE = "https://api.shireff.dev/api";

async function fetchJSON(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data)
      ? data
      : (data.projects ?? data.experiences ?? data.data ?? []);
  } catch {
    return [];
  }
}

export async function generateMarkdown(path: string): Promise<string> {
  if (path.startsWith("/projects")) {
    const projects = await fetchJSON(`${API_BASE}/projects`);
    return projectsMd(projects);
  }
  if (path.startsWith("/experiences")) {
    const experiences = await fetchJSON(`${API_BASE}/experiences`);
    return experiencesMd(experiences);
  }
  if (path.startsWith("/recommendations")) return recommendationsMd();
  if (path.startsWith("/contact")) return contactMd();
  return homeMd();
}

function homeMd(): string {
  return `# ${siteConfig.name}

> ${siteConfig.title}

${siteConfig.description}

## Links

- Website: ${siteConfig.url}
- GitHub: ${siteConfig.author.github}
- LinkedIn: ${siteConfig.author.linkedin}
- Email: ${siteConfig.author.email}
- Location: ${siteConfig.author.location}

## Pages

- [Projects](${siteConfig.url}/projects)
- [Experiences](${siteConfig.url}/experiences)
- [Recommendations](${siteConfig.url}/recommendations)
- [Contact](${siteConfig.url}/contact)
`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function projectsMd(projects: any[]): string {
  const lines = [`# Projects — ${siteConfig.name}\n`];
  if (!projects.length) return lines.join("") + "\n_No projects available._";
  for (const p of projects) {
    lines.push(`## ${p.title ?? p.name ?? "Untitled"}`);
    if (p.description) lines.push(`\n${p.description}`);
    if (p.techStack?.length)
      lines.push(`\n**Tech Stack:** ${p.techStack.join(", ")}`);
    if (p.liveUrl) lines.push(`\n**Live:** [${p.liveUrl}](${p.liveUrl})`);
    if (p.githubUrl)
      lines.push(`\n**GitHub:** [${p.githubUrl}](${p.githubUrl})`);
    lines.push("\n---");
  }
  return lines.join("\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function experiencesMd(experiences: any[]): string {
  const lines = [`# Work Experience — ${siteConfig.name}\n`];
  if (!experiences.length)
    return lines.join("") + "\n_No experiences available._";
  for (const e of experiences) {
    lines.push(`## ${e.role ?? e.title ?? "Role"} @ ${e.company ?? "Company"}`);
    if (e.startDate || e.endDate)
      lines.push(`\n_${e.startDate ?? ""} – ${e.endDate ?? "Present"}_`);
    if (e.description) lines.push(`\n${e.description}`);
    if (e.skills?.length) lines.push(`\n**Skills:** ${e.skills.join(", ")}`);
    lines.push("\n---");
  }
  return lines.join("\n");
}

function recommendationsMd(): string {
  return `# Recommendations — ${siteConfig.name}

Professional recommendations and endorsements from colleagues and clients.

View full recommendations: [${siteConfig.url}/recommendations](${siteConfig.url}/recommendations)
`;
}

function contactMd(): string {
  return `# Contact — ${siteConfig.name}

Get in touch with ${siteConfig.name}.

- **Email:** ${siteConfig.author.email}
- **Phone / WhatsApp:** ${siteConfig.author.whatsapp}
- **LinkedIn:** ${siteConfig.author.linkedin}
- **GitHub:** ${siteConfig.author.github}
- **Location:** ${siteConfig.author.location}

Or use the contact form at: [${siteConfig.url}/contact](${siteConfig.url}/contact)
`;
}
