export type Lang = "ar" | "en";

export interface ProjectDetails {
  title: string;
  description: string;
  techStack: string[];
  demo?: string;
  git?: string;
  role: string;
  challenges: string[];
  story?: string;
}

export const projectsKnowledge: Record<Lang, Record<string, ProjectDetails & { story?: string }>> = {
  en: {
    funzoneFrontend: {
      title: "FunZone Booking System",
      description: "The frontend of FunZone is a modern Next.js 14 multi-role SaaS platform supporting Admin, Manager, Employee, and Customer. It provides seamless bilingual support (Arabic & English) with Progressive Web App (PWA) capabilities, real-time push notifications, dark/light mode, and intuitive dashboards.",
      techStack: ["Next.js 14", "React", "Redux Toolkit", "TailwindCSS", "Shadcn/UI", "Firebase", "Axios"],
      demo: "https://funzone-frontend.vercel.app/",
      role: "Lead Front-End Developer",
      challenges: ["Building multi-role dashboards", "Optimizing LCP and FID", "Implementing real-time notifications and bilingual support"],
      story: "We had to design dashboards for Admin, Manager, Employee, and Customer with different permissions. The challenge was to keep the UI consistent while handling role-specific logic. I implemented a dynamic component loader and optimized React rendering to ensure fast LCP and smooth UX."
    },
    funzoneBackend: {
      title: "FunZone Backend API",
      description: "Full-scale backend handling authentication, RBAC authorization, bookings, loyalty programs, reports, notifications, and payments. Built with modular architecture suitable for enterprise-scale deployments on Vercel serverless.",
      techStack: ["Node.js", "TypeScript", "Express", "MongoDB", "Redis", "Swagger"],
      demo: "https://funzone-backend.vercel.app/api-docs/",
      role: "Lead Backend Developer",
      challenges: ["Designing scalable REST APIs", "Implementing multi-role RBAC", "Optimizing database queries for high traffic"],
      story: "Implemented scalable REST APIs with multi-role RBAC. Optimized MongoDB queries for high traffic while integrating real-time notifications and loyalty systems."
    },
    oura: {
      title: "ŌURA – Full Stack E-Commerce Platform",
      description: "A premium e-commerce system built entirely from scratch, covering product management, payments, analytics, marketing integrations, and user dashboards. Ensures smooth user experience with optimized performance metrics like LCP and FID.",
      techStack: ["Next.js 14", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "TailwindCSS", "Shadcn/UI", "React Query", "Zod", "React Hook Form"],
      demo: "https://oura-frontend.vercel.app/",
      role: "Senior Full-Stack Architect",
      challenges: ["Dynamic high-speed search engine", "Multi-layered payment gateway integration", "Full-stack e-commerce scalability and security"],
      story: "The main challenge was integrating multiple payment gateways while keeping the search engine lightning fast. Designed a layered architecture using React Query and Redis to handle thousands of concurrent users."
    },
    selvaFrontend: {
      title: "Selva Nail Shop",
      description: "Frontend for a premium nail care service, offering seamless booking, product management, and responsive dashboards. Focus on UX/UI and smooth transitions to increase conversion rates.",
      techStack: ["React", "Next.js", "TailwindCSS", "Directus CMS"],
      demo: "https://selva-nail-shop.vercel.app/",
      role: "Front-End Developer",
      challenges: ["Synchronizing online bookings with in-store inventory", "Designing high-conversion checkout flows"],
      story: "Implemented a responsive frontend for Selva with real-time booking updates. Focused on high-conversion UX flows for seamless checkout and product browsing."
    },
    selvaBackend: {
      title: "Selva Nail Shop API",
      description: "RESTful API managing products, categories, users, authentication, and admin operations. Secure JWT-based access control ensures proper role management and data integrity.",
      techStack: ["Node.js", "Express", "MongoDB", "Swagger"],
      demo: "https://selva-server.vercel.app/api-docs/",
      role: "Backend Developer",
      challenges: ["Implementing secure RESTful endpoints", "CRUD operations with role-based access", "Scalable architecture for growing e-commerce demands"],
      story: "Built REST APIs for Selva managing inventory, users, and admin tasks. Used JWT for secure access control and optimized MongoDB queries for fast operations."
    },
    hardNonaFrontend: {
      title: "Hard Nona",
      description: "A high-end nail care platform combining artistic creativity with medical-grade precision. Modern React/Next.js front-end with visually appealing UI and smooth UX.",
      techStack: ["Next.js", "React", "TailwindCSS", "Axios"],
      demo: "https://hardnona.vercel.app/",
      role: "Front-End Developer",
      challenges: ["High-performance rendering for product galleries", "Dynamic content updates without affecting UX"],
      story: "Developed a highly interactive frontend with smooth product gallery rendering and dynamic updates, ensuring premium UX for luxury nail services."
    },
    hardNonaBackend: {
      title: "Hard Nona API",
      description: "Backend powering the Hard Nona platform with secure, scalable endpoints. Focused on luxury service management, booking, and real-time inventory updates.",
      techStack: ["Node.js", "Express", "MongoDB", "Swagger"],
      demo: "https://hardnona-backend.vercel.app/api-docs",
      role: "Backend Developer",
      challenges: ["Designing high-performance APIs for luxury services", "Ensuring data security and scalability"],
      story: "Implemented secure and scalable backend for Hard Nona, handling bookings and inventory updates in real-time while maintaining luxury service standards."
    }
  },
  ar: {
    funzoneFrontend: {
      title: "FunZone نظام الحجز",
      description: "واجهة FunZone مصممة بتقنية Next.js 14 كمنصة SaaS متعددة الأدوار (Admin, Manager, Employee, Customer). تدعم ثنائي اللغة (العربية والإنجليزية)، إمكانية العمل كتطبيق PWA، إشعارات لحظية، الوضع الليلي/النهاري، ولوحات تحكم سهلة الاستخدام.",
      techStack: ["Next.js 14", "React", "Redux Toolkit", "TailwindCSS", "Shadcn/UI", "Firebase", "Axios"],
      demo: "https://funzone-frontend.vercel.app/",
      role: "مطور واجهات أمامية رئيسي",
      challenges: ["بناء لوحات تحكم متعددة الأدوار", "تحسين سرعة تحميل الصفحات (LCP & FID)", "تطبيق إشعارات لحظية ودعم ثنائي اللغة"],
      story: "واجهنا تحدي تصميم لوحات تحكم لكل دور مع الحفاظ على واجهة مستخدم موحدة. نفذت تحميل مكونات ديناميكي وتحسينات على React لضمان تجربة مستخدم سلسة وسرعة تحميل عالية."
    },
    funzoneBackend: {
      title: "FunZone API الخلفي",
      description: "نظام خلفي متكامل لإدارة المصادقة، تفويض الوصول (RBAC)، الحجوزات، برامج الولاء، التقارير، الإشعارات، والمدفوعات. معماريته قابلة للتوسع ومتوافق مع بيئة Vercel Serverless.",
      techStack: ["Node.js", "TypeScript", "Express", "MongoDB", "Redis", "Swagger"],
      demo: "https://funzone-backend.vercel.app/api-docs/",
      role: "مطور خلفي رئيسي",
      challenges: ["تصميم REST APIs قابلة للتوسع", "تطبيق نظام RBAC متعدد الأدوار", "تحسين أداء قاعدة البيانات للحمل العالي"],
      story: "تم تنفيذ REST APIs قابلة للتوسع مع نظام RBAC متعدد الأدوار. تحسين استعلامات MongoDB لدعم الحمل العالي مع دمج الإشعارات اللحظية وبرامج الولاء."
    },
    oura: {
      title: "ŌURA – منصة تجارة إلكترونية متكاملة",
      description: "نظام تجارة إلكترونية فاخر مصمم بالكامل من الصفر، يشمل إدارة المنتجات والمدفوعات والتحليلات والتسويق ولوحات المستخدمين. الأداء محسّن لضمان تجربة سلسة وسريعة.",
      techStack: ["Next.js 14", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "TailwindCSS", "Shadcn/UI", "React Query", "Zod", "React Hook Form"],
      demo: "https://oura-frontend.vercel.app/",
      role: "معماري فول ستاك أول",
      challenges: ["محرك بحث ديناميكي سريع", "تكامل بوابات دفع متعددة", "أمان وقابلية توسع النظام"],
      story: "التحدي الرئيسي كان دمج بوابات دفع متعددة مع الحفاظ على سرعة البحث. صممت بنية طبقية باستخدام React Query وRedis لضمان التعامل مع آلاف المستخدمين بالتوازي."
    },
    selvaFrontend: {
      title: "Selva – متجر الأظافر",
      description: "واجهة متجر Selva لتقديم خدمات الأظافر الفاخرة، مع إدارة الحجوزات والمنتجات ولوحات تحكم مستجيبة. التركيز على تجربة المستخدم لزيادة معدلات التحويل.",
      techStack: ["React", "Next.js", "TailwindCSS", "Directus CMS"],
      demo: "https://selva-nail-shop.vercel.app/",
      role: "مطور واجهات أمامية",
      challenges: ["مزامنة الحجوزات أونلاين مع المخزون الفعلي", "تصميم تجربة شراء سلسة عالية التحويل"],
      story: "نفذت واجهة تفاعلية مع تحديث الحجوزات لحظيًا. ركزت على تجربة مستخدم سلسة لتحسين معدلات التحويل وتصفح المنتجات."
    },
    selvaBackend: {
      title: "Selva API",
      description: "نظام RESTful API لإدارة المنتجات والفئات والمستخدمين والمصادقة والعمليات الإدارية. يعتمد على JWT للتحكم في الوصول وضمان سلامة البيانات.",
      techStack: ["Node.js", "Express", "MongoDB", "Swagger"],
      demo: "https://selva-server.vercel.app/api-docs/",
      role: "مطور خلفي",
      challenges: ["إنشاء RESTful API آمنة", "إدارة CRUD مع تحكم بالدور", "تصميم معماري قابل للتوسع"],
      story: "تم بناء REST APIs لإدارة المخزون والمستخدمين والمهام الإدارية. استخدمت JWT للتحكم الأمني وتحسين استعلامات MongoDB للأداء العالي."
    },
    hardNonaFrontend: {
      title: "Hard Nona",
      description: "واجهة منصة Hard Nona تجمع بين الدقة الطبية والإبداع الفني لخدمات الأظافر الفاخرة. تصميم حديث باستخدام React/Next.js مع تجربة مستخدم سلسة وجذابة.",
      techStack: ["Next.js", "React", "TailwindCSS", "Axios"],
      demo: "https://hardnona.vercel.app/",
      role: "مطور واجهات أمامية",
      challenges: ["عرض منتجات بسرعة عالية دون التأثير على تجربة المستخدم", "تحديث المحتوى ديناميكيًا"],
      story: "تم تطوير واجهة تفاعلية مع عرض منتجات سلس وتحديثات ديناميكية لضمان تجربة مستخدم ممتازة لخدمات الأظافر الفاخرة."
    },
    hardNonaBackend: {
      title: "Hard Nona API",
      description: "النظام الخلفي لمنصة Hard Nona يوفر Endpoints آمنة وقابلة للتوسع. يركز على إدارة الخدمات الفاخرة، الحجوزات، وتحديثات المخزون في الوقت الفعلي.",
      techStack: ["Node.js", "Express", "MongoDB", "Swagger"],
      demo: "https://hardnona-backend.vercel.app/api-docs",
      role: "مطور خلفي",
      challenges: ["تصميم API عالي الأداء", "ضمان أمان البيانات وقابلية التوسع"],
      story: "تم تنفيذ Backend آمن وقابل للتوسع لإدارة الحجوزات وتحديثات المخزون في الوقت الفعلي مع الحفاظ على جودة الخدمات الفاخرة."
    }
  }
};



export interface SkillsKnowledge {
  frontend: string[];
  backend: string[];
  testing: string[];
  databases: string[];
  tools: string[];
}

export const skillsKnowledge: Record<Lang, SkillsKnowledge> = {
  en: {
    frontend: ["React", "Next.js", "Redux", "TypeScript", "JavaScript", "HTML5", "CSS3", "Sass", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Express", "Firebase"],
    testing: ["Cypress", "Jest", "Selenium"],
    databases: ["MongoDB", "PostgreSQL"],
    tools: ["Git", "Linux", "Postman", "Chart.js", "CanvasJS"]
  },
  ar: {
    frontend: ["React", "Next.js", "Redux", "TypeScript", "JavaScript", "HTML5", "CSS3", "Sass", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Express", "Firebase"],
    testing: ["Cypress", "Jest", "Selenium"],
    databases: ["MongoDB", "PostgreSQL"],
    tools: ["Git", "Linux", "Postman", "Chart.js", "CanvasJS"]
  }
};

export interface GeneralKnowledge {
  intro: string;
  whoIs: string;
  no_demo: string;
  career: string;
  skills_intro: string;
  skills: string[];
  funFact: string;
}

export const generalKnowledge: Record<Lang, GeneralKnowledge> = {
  en: {
    intro: "👋 Hello! I'm Shireff’s digital assistant. Dive in to explore his projects, skills, or even technical comparisons with ease.",
    whoIs: "Shireff is a Senior Front-End Engineer & UI/UX Architect with 6+ years of experience delivering high-performance, scalable digital systems for global brands. He specializes in React, Next.js, and modern TypeScript-driven architectures.",
    no_demo: "🔒 This project doesn't have a public demo yet, but I can guide you through its architecture, design patterns, and tech decisions.",
    career: "He has a proven track record at companies like Digital Innovations and Appy, leading enterprise UI architectures, optimizing performance, and mentoring teams to craft maintainable and scalable systems.",
    skills_intro: "Shireff commands a robust, modern web stack optimized for speed, scalability, and cutting-edge UX:",
    skills: [
      "✅ Front-End: React, Next.js 14, TypeScript, TailwindCSS, shadcn/ui",
      "✅ State Management: Redux Toolkit, React Query, Zustand",
      "✅ Back-End: Node.js, Express, MongoDB, Redis, REST & GraphQL APIs",
      "✅ Testing & QA: Jest, Cypress, TestNG (UI & API testing)",
      "✅ DevOps & Deployment: Vercel, Railway, CI/CD pipelines, Docker basics",
      "✅ Other: PWA, SSR/SSG, LCP/FID optimization, real-time push notifications"
    ],
    funFact: "⚡ Fun fact: He loves architecting complex SaaS platforms from scratch, where performance and UX meet business goals."
  },
  ar: {
    intro: "👋 أهلاً بيك! أنا المساعد الرقمي لشريف. تقدر تستكشف مشاريعه، مهاراته، أو حتى مقارناته التقنية بسهولة.",
    whoIs: "شريف هو مهندس واجهات أمامية أول (Senior) ومعماري UI/UX بخبرة أكثر من 6 سنين، متخصص في بناء أنظمة رقمية عالية الأداء وقابلة للتوسع للشركات العالمية. خبرته تركز على React، Next.js، وTypeScript.",
    no_demo: "🔒 المشروع ده مش متاح كـ ديمو عام حالياً، بس أقدر أشرحلك معمارته، نماذج التصميم، وقرارات التقنية اللي اتاخدت.",
    career: "لديه سجل قوي في شركات زي Digital Innovations و Appy، حيث قاد تصميم واجهات المستخدم للمشاريع الكبيرة، حسّن الأداء، ودرّب الفرق لبناء أنظمة قابلة للصيانة والتوسع.",
    skills_intro: "شريف بيتقن مجموعة أدوات قوية مصممة لأداء مثالي وتجربة مستخدم متقدمة:",
    skills: [
      "✅ الواجهات الأمامية: React, Next.js 14, TypeScript, TailwindCSS, shadcn/ui",
      "✅ إدارة الحالة: Redux Toolkit, React Query, Zustand",
      "✅ الخلفية: Node.js, Express, MongoDB, Redis, REST & GraphQL APIs",
      "✅ الاختبار وضمان الجودة: Jest, Cypress, TestNG (لـ UI وAPI)",
      "✅ DevOps والنشر: Vercel, Railway, CI/CD, Docker basics",
      "✅ أخرى: PWA, SSR/SSG, تحسين LCP/FID, إشعارات لحظية"
    ],
    funFact: "⚡ معلومة ممتعة: شريف بيحب يبني منصات SaaS من الصفر بحيث يجمع بين الأداء وتجربة المستخدم وتحقيق أهداف الأعمال."
  }
};


export function pick(variants: string[]): string {
  return variants[Math.floor(Math.random() * variants.length)];
}

export interface FullKnowledge {
  general: GeneralKnowledge;
  projects: Record<string, ProjectDetails>;
  skills: SkillsKnowledge;
}

export const knowledge: Record<Lang, FullKnowledge> = {
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

