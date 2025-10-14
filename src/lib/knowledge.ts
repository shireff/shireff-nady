// lib/knowledge.ts
export type Lang = "ar" | "en";

type TopicKey =
  | "greeting"
  | "about"
  | "funzone"
  | "oura"
  | "selva"
  | "inventory"
  | "aimax"
  | "experience"
  | "skills"
  | "contact"
  | "default";

type TopicVariants = string[];

export interface KnowledgePack {
  [lang: string]: Record<TopicKey, TopicVariants>;
}

export const knowledge: KnowledgePack = {
  en: {
    greeting: [
      "Hello! I'm **Shireff's AI assistant** 🤖. I can help you explore his portfolio, projects, experience, and skills. What would you like to know?",
      "Hey there! I'm **Shireff’s AI assistant**. Ask me about his projects, experience, or skills anytime.",
    ],
    about: [
      "**About Shireff**:\n- Senior Front-End Engineer (4+ years)\n- Building modern web apps with **React, Next.js, TypeScript**\n- Focus on performance, DX, and clean architecture.",
    ],
    funzone: [
      "**FunZone** 🎟️\nA complete KSA entertainment booking system built end-to-end (Node.js + Express + MongoDB backend, Next.js 14 + Tailwind + Redux frontend). Supports bookings, loyalty, alerts, analytics, and multi-role dashboards.",
    ],
    oura: [
      "**ŌURA** 🛍️\nA full-stack e-commerce platform (Node.js, TypeScript, MongoDB, Next.js 14 + shadcn/ui). Products, payments, analytics, and marketing integrations.",
    ],
    selva: [
      "**Selva** 💅\nPremium nail shop system: Next.js frontend + secure Node.js API for products, users, and admin ops.",
    ],
    inventory: [
      "**Inventory Management** 📦\nModern web app for tracking/organizing products. Next.js + TypeScript + Tailwind; Node.js + MongoDB backend.",
    ],
    aimax: [
      "**AI-MAX** 🤖\nEducational project exploring AI origins, present, and future impact on society.",
    ],
    experience: [
      "**Experience**:\n- Digital Innovations Ltd\n- Instant\n- Appy (Poland)\n\nBuilt scalable apps, reusable components, and led testing with **React, TypeScript, Next.js**.",
    ],
    skills: [
      "**Core Skills**:\nReact, Next.js, TypeScript, Tailwind CSS, Redux, Node.js, Express, MongoDB, Jest, Cypress.",
    ],
    contact: [
      "You can reach Shireff from the **Contact** section or via **LinkedIn/GitHub** on his portfolio.",
    ],
    default: [
      "I'm here to help you explore **Shireff's portfolio** — ask about his **projects**, **experience**, or **skills** anytime.",
    ],
  },

  ar: {
    greeting: [
      "مرحبًا! أنا **مساعد شريف** 🤖. أقدر أساعدك تستكشف أعماله ومشاريعه وخبراته ومهاراته. تحب نبدأ بإيه؟",
      "أهلًا بيك! أنا **مساعد شريف الذكي**. اسألني عن مشاريعه أو خبراته أو مهاراته في أي وقت.",
    ],
    about: [
      "**عن شريف**:\n- مطوّر واجهات أمامية أول (أكثر من 4 سنوات)\n- بناء تطبيقات ويب حديثة بـ **React وNext.js وTypeScript**\n- تركيز على الأداء وتجربة المطور والمعمارية النظيفة.",
    ],
    funzone: [
      "**FunZone** 🎟️\nنظام حجوزات وترفيه سعودي متكامل تم بناؤه بالكامل (خلفية: Node.js + Express + MongoDB، واجهة: Next.js 14 + Tailwind + Redux). بيدعم الحجوزات، الولاء، التنبيهات، التحليلات، ولوحات تحكم متعددة الأدوار.",
    ],
    oura: [
      "**ŌURA** 🛍️\nمنصة تجارة إلكترونية متكاملة (Node.js وTypeScript وMongoDB وNext.js 14 + shadcn/ui). إدارة منتجات، مدفوعات، تحليلات وتكاملات تسويقية.",
    ],
    selva: [
      "**Selva** 💅\nنظام متجر أظافر راقٍ: واجهة Next.js + واجهة برمجية آمنة بـ Node.js لإدارة المنتجات والمستخدمين ولوحة المشرف.",
    ],
    inventory: [
      "**Inventory Management** 📦\nتطبيق حديث لإدارة وتتبع المنتجات. Next.js + TypeScript + Tailwind، مع خلفية Node.js + MongoDB.",
    ],
    aimax: [
      "**AI-MAX** 🤖\nمشروع تعليمي يستعرض تطور الذكاء الاصطناعي وتأثيره من الماضي للمستقبل.",
    ],
    experience: [
      "**الخبرات**:\n- Digital Innovations Ltd\n- Instant\n- Appy (بولندا)\n\nبناء تطبيقات قابلة للتوسع ومكوّنات قابلة لإعادة الاستخدام وقيادة اختبارات الجودة بـ **React وTypeScript وNext.js**.",
    ],
    skills: [
      "**المهارات الأساسية**:\nReact، Next.js، TypeScript، Tailwind CSS، Redux، Node.js، Express، MongoDB، Jest، Cypress.",
    ],
    contact: [
      "تقدر تتواصل مع شريف من خلال قسم **Contact** أو عبر **LinkedIn/GitHub** على موقعه.",
    ],
    default: [
      "أنا هنا عشان أساعدك تستكشف **بورتفوليو شريف** — اسأل عن **المشاريع** أو **الخبرات** أو **المهارات** في أي وقت.",
    ],
  },
};

// Small helper: pick a random variant for variety
export function pick(variants: string[], fallback: string): string {
  if (!variants || variants.length === 0) return fallback;
  const i = Math.floor(Math.random() * variants.length);
  return variants[i] ?? fallback;
}
