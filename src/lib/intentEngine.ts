import type { Lang } from "./knowledge";
import { projectsKnowledge, generalKnowledge, skillsKnowledge, pick } from "./knowledge";

export interface Message {
  role: "user" | "assistant";
  content: string;
  language?: Lang;
  topic?: string;
  projectId?: string;
}

export interface EngineResult {
  text: string;
  language: Lang;
  topic?: string;
  projectId?: string;
  options?: string[];
  tone?: "neutral" | "friendly" | "confident";
}

function normalizeInput(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ|ئ/g, "ء")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .replace(/[?؟]/g, "")
    .trim();
}

function hasArabic(text: string) {
  return /[اأإآء-ي]/.test(text);
}

function hasEnglish(text: string) {
  return /[a-zA-Z]/.test(text);
}

export function decideLanguage(input: string, history?: Message[]): Lang {
  if (hasArabic(input) && !hasEnglish(input)) return "ar";
  if (hasEnglish(input) && !hasArabic(input)) return "en";
  const recent = [...(history || [])].reverse().find((m) => m.language);
  if (recent?.language) return recent.language;
  return hasArabic(input) ? "ar" : "en";
}

export function buildResponse(
  rawMessage: string,
  language: Lang,
  history?: Message[]
): EngineResult {
  const lang: Lang = language || "en";
  const input = normalizeInput(rawMessage || "");
  const base = generalKnowledge[lang];
  const pK = projectsKnowledge[lang];
  const sK = skillsKnowledge[lang];

  const lastAssistant = [...(history || [])]
    .reverse()
    .find((m) => m.role === "assistant" && m.topic);
  const lastTopic = lastAssistant?.topic || "";
  const lastProjId = lastAssistant?.projectId || "";

  const list = (items: string[]) => items.map(i => `• ${i}`).join("\n");

  const getOptions = (topic: string) => {
    if (lang === "en") {
      switch (topic) {
        case "greeting": return ["View Projects", "Technical Skills", "Career Experience"];
        case "skills_summary": return ["Technical Depth", "View Projects"];
        case "project_details": return ["Live Demo", "Tech Challenges", "Another Project"];
        case "experience": return ["Key Projects", "Technical Skills"];
        case "projects_list": return ["FunZone Details", "ŌURA Details", "Technical Skills"];
        default: return ["Latest Projects", "Full Stack Details"];
      }
    } else {
      switch (topic) {
        case "greeting": return ["عرض المشاريع", "المهارات التقنية", "الخبرة العملية"];
        case "skills_summary": return ["التفاصيل العميقة", "عرض المشاريع"];
        case "project_details": return ["الديمو الحي", "التحديات التقنية", "مشروع آخر"];
        case "experience": return ["أهم المشاريع", "المهارات التقنية"];
        case "projects_list": return ["تفاصيل فنزون", "تفاصيل أورا", "المهارات التقنية"];
        default: return ["آخر المشاريع", "تفاصيل الفول ستاك"];
      }
    }
  };

  // 1️⃣ Greetings & Who is Shireff
  if (/(hello|hi|hey|مرحبا|اهلا|السلام|ازيك|مين شريف|who is|شريف|نفسك|identity)/i.test(input)) {
    const isWhoIs = /(مين شريف|who is|yourself|نفسك|شريف|entity)/i.test(input);
    const text = isWhoIs ? base.whoIs : base.intro;
    const topic = isWhoIs ? "about" : "greeting";
    return { language: lang, text, topic, options: getOptions(topic) };
  }

  // 2️⃣ Project Listing (View Projects / عرض المشاريع)
  if (/(view projects|عرض المشاريع|آخر المشاريع|latest projects|portfolio|اعمال|مشاريع|اريني|وريني|ورينى|ورينا|شوفنا|سابقة اعمال)/i.test(input)) {
    const topic = "projects_list";
    const projectNames = Object.values(pK).map(p => p.title).join(", ");
    const text = lang === "en" 
      ? `I can show you Shireff's latest work, including ${projectNames} and more from the live backend. What are you interested in?`
      : `أقدر أعرضلك أحدث أعمال شريف زي: ${projectNames} ومشاريع تانية كتير. تحب تعرف تفاصيل أي مشروع فيهم؟`;
    return { language: lang, text, topic, options: getOptions(topic) };
  }

  // 3️⃣ Skills & Technical Depth
  if (/(skill|مهاره|شاطر|بيعرف|تعرف|تقنيات|tools|stack|تقني|بيستخدم|technical skills|تفاصيل الفول ستاك|full stack details|deep skills|قدرات|بيعرف يعمل ايه)/i.test(input)) {
    const isDeep = /(تفاصيل|deep|expert|architecture|how|details|full stack|عمق)/i.test(input);
    if (isDeep) {
      const text = lang === "en" 
        ? `Technical Depth and Full Stack Expertise:\n\nFrontend Architect:\n${list(sK.frontend)}\n\nReliable Backend:\n${list(sK.backend)}\n\nTesting & Quality:\n${list(sK.testing)}\n\nData Ops:\n${list(sK.databases)}`
        : `تفاصيل الخبرة في الـ Full Stack والمهارات العميقة:\n\nمعمارية الواجهات (Frontend):\n${list(sK.frontend)}\n\nالأنظمة الخلفية (Backend):\n${list(sK.backend)}\n\nالجودة والاختبارات (Testing):\n${list(sK.testing)}\n\nقواعد البيانات (Databases):\n${list(sK.databases)}`;
      const topic = "skills_deep";
      return { language: lang, text, topic, options: getOptions(topic) };
    }
    const text = `${base.skills_intro}\n\n` + 
      (lang === "en" 
        ? `• Frontend: React, Next.js, TS\n• Backend: Node.js, Express\n• Testing: Jest, Cypress\n• Databases: MongoDB, Postgres`
        : `• الواجهات: React, Next.js, TS\n• الخلفية: Node.js, Express\n• الاختبارات: Jest, Cypress\n• البيانات: MongoDB, Postgres`);
    return { language: lang, text, topic: "skills_summary", options: getOptions("skills_summary") };
  }

  // 4️⃣ Project Context
  let detectedProjId = "";
  if (/(funzone|فنزون)/i.test(input)) detectedProjId = "funzone";
  else if (/(oura|اورا|أورا)/i.test(input)) detectedProjId = "oura";
  else if (/(selva|سيلفا)/i.test(input)) detectedProjId = "selva";

  const currentProjId = detectedProjId || lastProjId;
  const isAskingDemo = /(demo|ديمو|رابط|لينك|link|view|live)/i.test(input);
  const isAskingChallenges = /(challenge|تحدي|صعب|problem|مشكله|solve)/i.test(input);

  if (currentProjId && pK[currentProjId]) {
    const p = pK[currentProjId];
    if (isAskingDemo) {
      const topic = "project_demo";
      return {
        language: lang,
        text: p.demo 
          ? (lang === "en" ? `🔗 Live demo for ${p.title}:\n${p.demo}` : `🔗 الديمو الحي لمشروع ${p.title}:\n${p.demo}`)
          : base.no_demo,
        topic,
        projectId: currentProjId,
        options: getOptions(topic)
      };
    }
    if (isAskingChallenges) {
      const topic = "project_challenges";
      return {
        language: lang,
        text: (lang === "en" ? `Key Challenges in ${p.title}:\n` : `أهم التحديات في ${p.title}:\n`) + list(p.challenges),
        topic,
        projectId: currentProjId,
        options: getOptions(topic)
      };
    }
    if (detectedProjId || /(details|تفاصيل)/i.test(input)) {
      const topic = "project_details";
      return {
        language: lang,
        text: `${p.title}\n\n${p.description}\n\nStack: ${p.techStack.join(", ")}\nRole: ${p.role}`,
        topic,
        projectId: currentProjId,
        options: getOptions(topic)
      };
    }
  }

  // 5️⃣ Comparisons
  if (/(compare|مقارنه|فرق|افضل|vs)/i.test(input)) {
    const topic = "comparison";
    const text = lang === "en"
      ? "Shireff chooses tech based on scale:\n• Next.js for high SEO & performance.\n• React for complex SPAs.\n• Postgres for relational data, MongoDB for flexible schemas."
      : "شريف بيختار التقنيات حسب احتياج المشروع:\n• Next.js للأداء العالي والـ SEO.\n• React للتطبيقات المعقدة (SPA).\n• Postgres للبيانات المترابطة، و MongoDB للمرونة.";
    return { language: lang, text, topic, options: getOptions(topic) };
  }

  // 6️⃣ Experience
  if (/(experience|خبره|career|شغل|وظيفه|background)/i.test(input)) {
    const topic = "experience";
    return { language: lang, text: base.career, topic, options: getOptions(topic) };
  }

  // 7️⃣ Fallback
  const topic = "fallback";
  return {
    language: lang,
    text: lang === "en"
      ? "I can help you dive into projects, check my technical depth, or discuss experience. What's next?"
      : "أنا هنا عشان أساعدك تعرف أكتر عن المشاريع، الخبرات العملية، أو مهاراتي التقنية. تحب نبدأ بإيه؟",
    topic,
    options: getOptions(topic)
  };
}

