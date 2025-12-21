export type Lang = "ar" | "en";

export interface ProjectDetails {
  title: string;
  description: string;
  techStack: string[];
  demo?: string;
  git?: string;
  role: string;
  challenges: string[];
}

export const projectsKnowledge: Record<Lang, Record<string, ProjectDetails>> = {
  en: {
    funzone: {
      title: "FunZone",
      description: "A complete KSA entertainment booking system built for high-scale traffic.",
      techStack: ["Next.js 14", "Node.js", "Express", "MongoDB", "Redux", "Tailwind"],
      demo: "https://fun-zone-beta.vercel.app",
      role: "Lead Full-Stack Developer",
      challenges: ["Optimizing real-time seat availability", "Implementing complex multi-role RBAC", "Architecting a high-performance loyalty system"]
    },
    oura: {
      title: "ŌURA",
      description: "A premium full-stack e-commerce experience focusing on high-end luxury goods.",
      techStack: ["Next.js 14", "TypeScript", "Node.js", "MongoDB", "shadcn/ui"],
      demo: "https://oura-shop.com",
      role: "Senior Front-End Architect",
      challenges: ["Building a high-speed dynamic search engine", "Integrating multi-layered payment gateways", "Optimizing Largest Contentful Paint (LCP)"]
    },
    selva: {
      title: "Selva",
      description: "A specialized retail and management system for premium nail shops.",
      techStack: ["React", "Next.js 14", "Node.js", "Directus CMS", "Tailwind"],
      role: "Frontend Engineer",
      challenges: ["Synchronizing online booking with physical inventory", "Crafting a high-conversion checkout flow"]
    }
  },
  ar: {
    funzone: {
      title: "FunZone",
      description: "نظام حجوزات سعودي متكامل مصمم للتعامل مع أحمال عالية.",
      techStack: ["Next.js 14", "Node.js", "Express", "MongoDB", "Redux", "Tailwind"],
      demo: "https://fun-zone-beta.vercel.app",
      role: "مطور فول-ستاك أساسي",
      challenges: ["تحسين نظام توفر المقاعد في الوقت الفعلي", "بناء لوحات تحكم معقدة متعددة الأدوار", "تصميم معماري لنظام ولاء عالي الأداء"]
    },
    oura: {
      title: "ŌURA",
      description: "تجربة تجارة إلكترونية متكاملة تركز على المنتجات الفاخرة.",
      techStack: ["Next.js 14", "TypeScript", "Node.js", "MongoDB", "shadcn/ui"],
      demo: "https://oura-shop.com",
      role: "معماري واجهات أمامية أساسي",
      challenges: ["بناء محرك بحث ديناميكي فائق السرعة", "تكامل بوابات دفع متعددة الطبقات", "تحسين سرعة التحميل (LCP) للمنتجات"]
    },
    selva: {
      title: "Selva",
      description: "نظام إدارة وحجوزات متخصص لمتاجر الأظافر الراقية.",
      techStack: ["React", "Next.js", "Node.js", "Directus CMS"],
      role: "مطور واجهات أمامية",
      challenges: ["مزامنة الحجوزات أونلاين مع المتجر الفعلي", "بناء تجربة شراء سلسة ترفع معدل التحويل"]
    }
  }
};

export const skillsKnowledge: Record<Lang, any> = {
  en: {
    frontend: ["React", "Next.js", "Redux", "TypeScript", "JavaScript", "HTML5", "CSS3", "Sass", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Express", "Firebase", "Spring"],
    testing: ["Cypress", "Jest", "Selenium"],
    databases: ["MongoDB", "PostgreSQL"],
    tools: ["Git", "Linux", "Postman", "Chart.js", "CanvasJS"]
  },
  ar: {
    frontend: ["React", "Next.js", "Redux", "TypeScript", "JavaScript", "HTML5", "CSS3", "Sass", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Express", "Firebase", "Spring"],
    testing: ["Cypress", "Jest", "Selenium"],
    databases: ["MongoDB", "PostgreSQL"],
    tools: ["Git", "Linux", "Postman", "Chart.js", "CanvasJS"]
  }
};

export const generalKnowledge: Record<Lang, any> = {
  en: {
    intro: "👋 Hi! I'm Shireff’s assistant. I can help you explore his work, skills, or comparisons.",
    whoIs: "Shireff is a Senior Front-End Engineer & UI/UX Architect with 4+ years of experience building high-performance digital systems for global firms.",
    no_demo: "A public demo isn't available for this specific project yet, but I can walk you through the architecture!",
    career: "He has a proven track record at companies like Digital Innovations and Appy, leading UI architectures for enterprise-scale platforms.",
    skills_intro: "He wields a powerful stack optimized for modern web performance:"
  },
  ar: {
    intro: "👋 أهلاً بيك! أنا مساعد شريف الرقمي. أقدر أساعدك تعرف أكتر عن مشاريع شريف، مهاراته، أو حتى مقارنات تقنية.",
    whoIs: "شريف هو مهندس واجهات أمامية أول (Senior) ومعماري UI/UX بخبرة أكثر من 4 سنين في بناء أنظمة رقمية عالية الأداء لشركات عالمية.",
    no_demo: "للأسف ديمو المشروع ده مش متاح حالياً، بس أقدر أشرحلك المعمارية التقنية اللي اتبنى بيها!",
    career: "شريف اشتغل في شركات زي Digital Innovations و Appy، وقاد تطوير واجهات لأنظمة ضخمة ومعقدة.",
    skills_intro: "شريف بيستخدم مجموعة أدوات قوية مصممة لأداء مثالي:"
  }
};

export function pick(variants: string[]): string {
  return variants[Math.floor(Math.random() * variants.length)];
}

export const knowledge: Record<Lang, any> = {
  en: {
    general: generalKnowledge.en,
    projects: projectsKnowledge.en,
    skills: skillsKnowledge.en
  },
  ar: {
    general: generalKnowledge.ar,
    projects: projectsKnowledge.ar,
    skills: skillsKnowledge.ar
  }
};

