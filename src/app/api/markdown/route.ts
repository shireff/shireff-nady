import { NextRequest, NextResponse } from "next/server";
import { generateMarkdown } from "@/lib/markdown-generator";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const markdown = await generateMarkdown(path);
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
