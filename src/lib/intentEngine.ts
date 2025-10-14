// lib/intentEngine.ts
import type { Lang } from "./knowledge";
import { knowledge, pick } from "./knowledge";

export interface Message {
  role: "user" | "assistant";
  content: string;
  language?: Lang;
  topic?: string;
}

export interface EngineResult {
  text: string;
  language: Lang;
  topic?: string;
  tone?: "neutral" | "friendly" | "clarify";
  followupHint?: string;
}

// Normalization helpers
function normalizeArabic(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ|ئ/g, "ء")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();
}

function hasArabic(text: string) {
  return /[اأإآء-ي]/.test(text);
}
function hasEnglish(text: string) {
  return /[a-zA-Z]/.test(text);
}

function arabiziHints(s: string): string {
  return s
    .replace(/mashari3/g, "مشاريع")
    .replace(/khobrat(ak|ek)?/g, "خبره")
    .replace(/brogect|broje[c|k]t|project/g, "مشروع")
    .replace(/skills?/g, "مهاره")
    .replace(/tawasol|tawasul/g, "تواصل")
    .replace(/ai[- ]?max/g, "اي ماكس")
    .replace(/funzone/g, "فنزون");
}

export function decideLanguage(input: string, history?: Message[]): Lang {
  const recent = [...(history || [])].reverse().find((m) => m.language);
  if (recent?.language) return recent.language;
  if (hasArabic(input)) return "ar";
  if (hasEnglish(input)) return "en";
  return "en";
}

function detectTone(s: string): "friendly" | "clarify" | "neutral" {
  const msg = s.toLowerCase();
  if (/(please|kindly|من فضلك|لو سمحت)/i.test(msg)) return "friendly";
  if (/(مش فاهم|مش واضح|ازاي|ليه|explain|clarify|not clear|help)/i.test(msg))
    return "clarify";
  return "neutral";
}

// 💡 Improved buildResponse (v2.1)
export function buildResponse(
  rawMessage: string,
  language: Lang,
  history?: Message[]
): EngineResult {
  const lang: Lang = language || "en";
  const base = knowledge[lang];

  const enriched = normalizeArabic(arabiziHints(rawMessage || ""));
  const tone = detectTone(enriched);

  // 1️⃣ Greetings
  if (/(hello|hi|hey|مرحبا|اهلا|السلام|هاي|ازيك)/i.test(enriched)) {
    return {
      language: lang,
      text: pick(base.greeting, base.greeting[0]),
      topic: "greeting",
      tone: "friendly",
    };
  }

  // Extract last assistant topic (context)
  const lastAssistant = [...(history || [])]
    .reverse()
    .find((m) => m.role === "assistant" && m.topic);

  const lastTopic = lastAssistant?.topic || "";

  // 2️⃣ Follow-up detection
  const followUpRe = /(ايه كمان|وايه كمان|كمل|كمللي|تاني|more|continue|next)/i;
  if (followUpRe.test(enriched)) {
    // ---- Follow up on Projects ----
    if (
      lastTopic.includes("project") ||
      /(مشروع|مشاريع|فنزون|oura|selva|inventory|اي ماكس)/i.test(enriched)
    ) {
      const text = [
        pick(base.oura, base.oura[0]),
        pick(base.selva, base.selva[0]),
        pick(base.inventory, base.inventory[0]),
        pick(base.aimax, base.aimax[0]),
      ].join(lang === "ar" ? "\n\n" : "\n\n");
      return {
        language: lang,
        text,
        topic: "projects_followup",
        tone: "friendly",
      };
    }

    // ---- Follow up on Experience ----
    if (lastTopic.includes("experience")) {
      const text = [
        pick(base.skills, base.skills[0]),
        pick(base.contact, base.contact[0]),
      ].join(lang === "ar" ? "\n\n" : "\n\n");
      return {
        language: lang,
        text,
        topic: "experience_followup",
        tone: "friendly",
      };
    }

    // ---- Follow up on Skills ----
    if (lastTopic.includes("skills")) {
      const text = [
        pick(base.funzone, base.funzone[0]),
        pick(base.experience, base.experience[0]),
      ].join(lang === "ar" ? "\n\n" : "\n\n");
      return {
        language: lang,
        text,
        topic: "skills_followup",
        tone: "friendly",
      };
    }

    // ---- Default follow-up ----
    return {
      language: lang,
      text: pick(base.default, base.default[0]),
      topic: "followup",
      tone: "friendly",
    };
  }

  // 3️⃣ Comparison
  const cmp =
    /(فرق|مقارن|افضل|vs|compare).*(oura|اورا|funzone|فنزون|selva|سيلفا|inventory|المخزون)/i;
  if (cmp.test(enriched)) {
    const parts: string[] = [];
    if (/(oura|اورا)/i.test(enriched))
      parts.push(pick(base.oura, base.oura[0]));
    if (/(funzone|فنزون)/i.test(enriched))
      parts.push(pick(base.funzone, base.funzone[0]));
    if (/(selva|سيلفا)/i.test(enriched))
      parts.push(pick(base.selva, base.selva[0]));
    if (/(inventory|المخزون)/i.test(enriched))
      parts.push(pick(base.inventory, base.inventory[0]));
    const header =
      lang === "ar" ? "**مقارنة سريعة:**\n" : "**Quick comparison:**\n";
    const text =
      header + parts.join(lang === "ar" ? "\n\n---\n\n" : "\n\n---\n\n");
    return { language: lang, text, topic: "comparison", tone };
  }

  // 4️⃣ Multi-intent
  const hasProjects =
    /(project|projects|work|مشاريع|اعمال|مشروع|بروجيكت|فنزون|oura|selva|inventory|ai[- ]?max)/i.test(
      enriched
    );
  const hasExperience = /(experience|background|career|خبره|وظيفه|سابق)/i.test(
    enriched
  );
  const hasSkills =
    /(skills?|مهاره|قدرات|تقنيات|تكنولوجي|tools|framework)/i.test(enriched);
  const hasContact = /(contact|reach|linkedin|github|تواصل|اتصال)/i.test(
    enriched
  );
  const hasAbout = /(about|yourself|profile|من هو|من انت|تعريف|نفسك)/i.test(
    enriched
  );

  if ([hasProjects, hasExperience, hasSkills].filter(Boolean).length > 1) {
    const parts: string[] = [];
    if (hasProjects) parts.push(pick(base.funzone, base.funzone[0]));
    if (hasExperience) parts.push(pick(base.experience, base.experience[0]));
    if (hasSkills) parts.push(pick(base.skills, base.skills[0]));
    return {
      language: lang,
      text: parts.join(lang === "ar" ? "\n\n" : "\n\n"),
      topic: "multi-intent",
      tone,
    };
  }

  // 5️⃣ Single-topic
  if (hasProjects)
    return {
      language: lang,
      text: pick(base.funzone, base.funzone[0]),
      topic: "projects",
      tone,
    };
  if (hasExperience)
    return {
      language: lang,
      text: pick(base.experience, base.experience[0]),
      topic: "experience",
      tone,
    };
  if (hasSkills)
    return {
      language: lang,
      text: pick(base.skills, base.skills[0]),
      topic: "skills",
      tone,
    };
  if (hasContact)
    return {
      language: lang,
      text: pick(base.contact, base.contact[0]),
      topic: "contact",
      tone,
    };
  if (hasAbout)
    return {
      language: lang,
      text: pick(base.about, base.about[0]),
      topic: "about",
      tone,
    };

  // 6️⃣ Specific project names
  if (/funzone|فنزون/i.test(enriched))
    return {
      language: lang,
      text: pick(base.funzone, base.funzone[0]),
      topic: "funzone",
      tone,
    };
  if (/oura|اورا/i.test(enriched))
    return {
      language: lang,
      text: pick(base.oura, base.oura[0]),
      topic: "oura",
      tone,
    };
  if (/selva|سيلفا|نيل/i.test(enriched))
    return {
      language: lang,
      text: pick(base.selva, base.selva[0]),
      topic: "selva",
      tone,
    };
  if (/inventory|المخزون/i.test(enriched))
    return {
      language: lang,
      text: pick(base.inventory, base.inventory[0]),
      topic: "inventory",
      tone,
    };
  if (/ai[- ]?max|الذكاء|اي ماكس/i.test(enriched))
    return {
      language: lang,
      text: pick(base.aimax, base.aimax[0]),
      topic: "aimax",
      tone,
    };

  // 7️⃣ Clarify
  if (tone === "clarify") {
    const clarify =
      lang === "ar"
        ? "ممكن توضح قصدك أكثر؟ هل تقصد **المشاريع** ولا **الخبرات** ولا **المهارات**؟"
        : "Could you clarify? Do you mean **projects**, **experience**, or **skills**?";
    return { language: lang, text: clarify, topic: "clarify", tone };
  }

  // 8️⃣ Default
  return {
    language: lang,
    text: pick(base.default, base.default[0]),
    topic: "default",
    tone: "friendly",
  };
}
