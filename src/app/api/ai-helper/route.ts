import { NextRequest, NextResponse } from "next/server";
import { buildResponse, decideLanguage } from "@/lib/intentEngine";
import { generateAIResponse } from "@/lib/aiHelper";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://shireff-nady-server.vercel.app/api";

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // 1. Determine language and detect intent
    const language = decideLanguage(message, conversationHistory);
    const intent = buildResponse(message, language, conversationHistory);

    // 2. Priority: Fetch Context for AI
    let projectsData: any[] = [];
    let experiencesData: any[] = [];
    
    try {
      const [projectsRes, experiencesRes] = await Promise.all([
        fetch(`${BACKEND_URL}/projects`, { next: { revalidate: 3600 } }),
        fetch(`${BACKEND_URL}/experiences`, { next: { revalidate: 3600 } })
      ]);

      if (projectsRes.ok) {
        const data = await projectsRes.json();
        projectsData = Array.isArray(data) ? data : (data.projects || []);
      }
      
      if (experiencesRes.ok) {
        const data = await experiencesRes.json();
        experiencesData = Array.isArray(data) ? data : (data.experiences || []);
      }
    } catch (err) {
      console.warn("⚠️ Error fetching backend data for context:", err);
    }

    // 3. Try AIHelper to generate a "Smart" and "Varied" response
    // Maintain more context (last 10 messages)
    const aiResponse = await generateAIResponse(
      message,
      language,
      conversationHistory.slice(-10),
      projectsData,
      experiencesData,
      intent.topic !== "fallback" ? intent.text : undefined
    );

    let finalResponse = "";
    let source = "ai";
    let topic = intent.topic;
    const options = intent.options;

    if (aiResponse && aiResponse.trim() !== "") {
      finalResponse = aiResponse;
    } else {
      // 4. Fallback to Intent/Knowledge if AI fails
      finalResponse = intent.text;
      source = "knowledge_fallback";
    }

    // 5. Final Formatting Pass: Remove any lingering markdown-like bolding **
    const cleanResponse = finalResponse.replace(/\*\*/g, "");

    return NextResponse.json({
      response: cleanResponse,
      language,
      topic: source === "ai" ? "smart_ai" : topic,
      options,
      source,
      fromBackend: projectsData.length > 0,
    });

  } catch (err: any) {
    console.error("[AIHelper Route] Fatal error:", err);
    return NextResponse.json({
      response: "I'm having a bit of trouble right now. Feel free to check my projects or contact me directly!",
      language: "en",
      source: "error_fallback",
    });
  }
}

