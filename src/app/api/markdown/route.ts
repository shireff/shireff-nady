import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(
    "http://localhost:4000",
    "https://api.shireff.dev",
  ) ?? "https://api.shireff.dev/api";

// Fetch helpers
async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.projects ?? data.data ?? []);
  } catch {
    return [];
  }
}

async function fetchExperiences() {
  try {
    const res = await fetch(`${API_BASE}/experiences`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.experiences ?? data.data ?? []);
  } catch {
    return [];
  }
}

// Markdown generators per page
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
  if (!projects.length) {
    lines.push("_No projects available._");
  } else {
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
  }
  return lines.join("\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function experiencesMd(experiences: any[]): string {
  const lines = [`# Work Experience — ${siteConfig.name}\n`];
  if (!experiences.length) {
    lines.push("_No experiences available._");
  } else {
    for (const e of experiences) {
      lines.push(
        `## ${e.role ?? e.title ?? "Role"} @ ${e.company ?? "Company"}`,
      );
      if (e.startDate || e.endDate) {
        lines.push(`\n_${e.startDate ?? ""} – ${e.endDate ?? "Present"}_`);
      }
      if (e.description) lines.push(`\n${e.description}`);
      if (e.skills?.length) lines.push(`\n**Skills:** ${e.skills.join(", ")}`);
      lines.push("\n---");
    }
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

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const path = searchParams.get("path") ?? "/";

  let markdown = "";

  if (path === "/" || path === "") {
    markdown = homeMd();
  } else if (path.startsWith("/projects")) {
    const projects = await fetchProjects();
    markdown = projectsMd(projects);
  } else if (path.startsWith("/experiences")) {
    const experiences = await fetchExperiences();
    markdown = experiencesMd(experiences);
  } else if (path.startsWith("/recommendations")) {
    markdown = recommendationsMd();
  } else if (path.startsWith("/contact")) {
    markdown = contactMd();
  } else {
    markdown = homeMd();
  }

  const tokens = Math.ceil(markdown.length / 4);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
      Vary: "Accept",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
