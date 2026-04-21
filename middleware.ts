import { NextRequest, NextResponse } from "next/server";

// Pages to convert to Markdown when Accept: text/markdown is requested
const MARKDOWN_ELIGIBLE_PATHS = [
  "/",
  "/projects",
  "/experiences",
  "/recommendations",
  "/contact",
];

function htmlToMarkdown(html: string, url: string): string {
  // Strip <head> entirely
  let md = html.replace(/<head[\s\S]*?<\/head>/gi, "");

  // Remove scripts, styles, noscript, svg
  md = md.replace(/<script[\s\S]*?<\/script>/gi, "");
  md = md.replace(/<style[\s\S]*?<\/style>/gi, "");
  md = md.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  md = md.replace(/<svg[\s\S]*?<\/svg>/gi, "");

  // Headings
  md = md.replace(
    /<h1[^>]*>([\s\S]*?)<\/h1>/gi,
    (_, t) => `# ${stripTags(t)}\n\n`,
  );
  md = md.replace(
    /<h2[^>]*>([\s\S]*?)<\/h2>/gi,
    (_, t) => `## ${stripTags(t)}\n\n`,
  );
  md = md.replace(
    /<h3[^>]*>([\s\S]*?)<\/h3>/gi,
    (_, t) => `### ${stripTags(t)}\n\n`,
  );
  md = md.replace(
    /<h4[^>]*>([\s\S]*?)<\/h4>/gi,
    (_, t) => `#### ${stripTags(t)}\n\n`,
  );

  // Links
  md = md.replace(
    /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, text) => {
      const cleanText = stripTags(text).trim();
      if (!cleanText) return "";
      const fullHref = href.startsWith("http")
        ? href
        : `https://www.shireff.dev${href}`;
      return `[${cleanText}](${fullHref})`;
    },
  );

  // Bold / italic
  md = md.replace(
    /<strong[^>]*>([\s\S]*?)<\/strong>/gi,
    (_, t) => `**${stripTags(t)}**`,
  );
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => `**${stripTags(t)}**`);
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => `_${stripTags(t)}_`);
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, t) => `_${stripTags(t)}_`);

  // Lists
  md = md.replace(
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
    (_, t) => `- ${stripTags(t).trim()}\n`,
  );
  md = md.replace(/<\/ul>/gi, "\n");
  md = md.replace(/<\/ol>/gi, "\n");

  // Paragraphs & line breaks
  md = md.replace(
    /<p[^>]*>([\s\S]*?)<\/p>/gi,
    (_, t) => `${stripTags(t).trim()}\n\n`,
  );
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // Horizontal rule
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n");

  // Strip remaining tags
  md = stripTags(md);

  // Clean up excessive whitespace
  md = md.replace(/\n{3,}/g, "\n\n").trim();

  const pageTitle = url.replace("https://www.shireff.dev", "") || "/";
  return `# Shireff Nady — Portfolio (${pageTitle})\n\n> Source: ${url}\n\n${md}`;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export async function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const pathname = request.nextUrl.pathname;

  // Only handle Markdown negotiation for eligible paths
  if (
    accept.includes("text/markdown") &&
    MARKDOWN_ELIGIBLE_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    )
  ) {
    try {
      // Fetch the HTML version of the page internally
      const url = request.nextUrl.clone();
      const htmlResponse = await fetch(url.toString(), {
        headers: { accept: "text/html" },
      });

      if (htmlResponse.ok) {
        const html = await htmlResponse.text();
        const markdown = htmlToMarkdown(html, url.toString());
        const tokens = Math.ceil(markdown.length / 4); // rough token estimate

        return new NextResponse(markdown, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "x-markdown-tokens": String(tokens),
            Vary: "Accept",
          },
        });
      }
    } catch {
      // Fall through to normal response on error
    }
  }

  const response = NextResponse.next();

  // Add Vary: Accept so caches know the response differs by Accept header
  response.headers.set("Vary", "Accept");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image, favicon, api routes, well-known
     */
    "/((?!_next/static|_next/image|favicon|api/|.*\\.(?:ico|png|jpg|jpeg|svg|webp|gif|css|js|woff2?|ttf)).*)",
  ],
};
