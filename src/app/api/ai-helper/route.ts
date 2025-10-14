/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { knowledge } from "@/lib/knowledge";
import { buildResponse, decideLanguage } from "@/lib/intentEngine";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://shireff-nady-server.vercel.app/api";

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const language = decideLanguage(message, conversationHistory);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

    const formattedHistory = conversationHistory
      .map(
        (m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
      )
      .join("\n");

    let projectsData: any[] = [];
    try {
      const res = await fetch(`${BACKEND_URL}/projects`);
      console.log("res", res);
      if (res.ok) {
        projectsData = await res.json();
      } else {
        console.warn("⚠️ Could not fetch projects, status:", res.status);
      }
    } catch (err) {
      console.warn("⚠️ Error fetching backend projects:", err);
    }

    const context = `
You are **Shireff's AI Assistant** 🤖.
You know everything about Shireff’s portfolio, projects, experience, and skills.

Use both sources of knowledge:
1️⃣ Static portfolio knowledge:
${JSON.stringify(knowledge[language], null, 2)}

2️⃣ Live project data from backend:
${JSON.stringify(projectsData, null, 2)}

Conversation so far:
${formattedHistory}

User message: "${message}"

Rules:
- Detect the user's language automatically.
- Reply ONLY in that language (Arabic or English).
- If a project includes a demo link, always mention it (demoUrl field).
- Be concise, friendly, and natural.
`;

    let model = "gemini-2.0-flash";
    let source: "gemini" | "local" = "gemini";

    // 🧩 Step 1: Try Gemini 2.0
    let geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: context }] }],
        }),
      }
    );

    // 🔁 Step 2: Fallback to Gemini 1.5 if 2.0 fails
    if (!geminiResponse.ok) {
      console.warn("⚠️ Gemini 2.0 failed → trying 1.5 fallback...");
      model = "gemini-1.5-flash-latest";
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: context }] }],
          }),
        }
      );
    }

    const data = await geminiResponse.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.promptFeedback?.blockReason ??
      null;

    // 🩹 Step 3: Local fallback if Gemini gives no reply
    let finalText = reply;
    let topic: string | undefined;
    let tone: string | undefined;

    if (!finalText) {
      const local = buildResponse(message, language, conversationHistory);
      finalText = local.text;
      topic = local.topic;
      tone = local.tone;
      source = "local";
    }

    return NextResponse.json({
      response: finalText,
      language,
      topic,
      tone,
      source,
      fromBackend: projectsData.length > 0, // 🟢 useful debug flag
    });
  } catch (err: any) {
    console.error("AI API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
