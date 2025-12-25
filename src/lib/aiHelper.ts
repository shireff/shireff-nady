import { knowledge } from "./knowledge";
import { Message } from "./intentEngine";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://shireff-nady-server.vercel.app/api";

export async function generateAIResponse(
  message: string,
  language: "ar" | "en",
  conversationHistory: Message[] = [],
  projectsData: Record<string, unknown>[] = [],
  experiencesData: Record<string, unknown>[] = [],
  referenceKnowledge?: string
): Promise<string | null> {
  const apiKey = (process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) return null;

  const formattedHistory = conversationHistory
    .map((m: Message) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const context = `
You are Shireff's AI Assistant 🤖.
You know everything about Shireff’s portfolio, projects, experience, and skills.

${referenceKnowledge ? `Specific Reference for this query: ${referenceKnowledge}` : ""}

1️⃣ Static portfolio knowledge (Reference only):
${JSON.stringify(knowledge[language], null, 2)}

2️⃣ Live projects (PRIMARY SOURCE):
${JSON.stringify(projectsData, null, 2)}

3️⃣ Live work experience (PRIMARY SOURCE):
${JSON.stringify(experiencesData, null, 2)}

History:
${formattedHistory}

User message: "${message}"

Rules:
- Reply ONLY in ${language === "ar" ? "Arabic" : "English"}.
- FORMATTING: Never use markdown like **bold**, *italics*, or # headers. Use plain text only.
- DATA PRIORITY: Always prioritize Live data (2 & 3) over static knowledge (1). If a project is in live data but not static, use the live data details.
- VARIETY: Provide fresh details or perspectives if asked similar questions.
- NO REPETITION: Avoid repeating phrases or introductory sentences.
- CONCISENESS: Be smart, friendly, and natural.
`;

  try {
    // 🧩 Step 1: Try Gemini 2.0
    let model = "gemini-2.0-flash";
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

    if (!geminiResponse.ok) return null;

    const data = (await geminiResponse.json()) as { 
      candidates?: { 
        content?: { 
          parts?: { text?: string }[] 
        } 
      }[] 
    };
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch (error) {
    console.error("[AIHelper] Error generating AI response:", error);
    return null;
  }
}
