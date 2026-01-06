import { Project } from '@/types';

export interface ADR {
  decision: string;
  context: string;
  alternatives: string[];
  rationale: string;
  consequences: {
    positive: string;
    tradeoffs: string;
  };
  changeToday: string;
  pastRationale: string;
  learning: string;
}

type ADRRule = {
  name: string;
  matchKeywords: string[];  
  createADR: (project: Project) => ADR;
  priority?: number; 
};

function createADR(
  decision: string,
  context: string,
  alternatives: string[],
  rationale: string,
  positive: string,
  tradeoffs: string,
  changeToday: string,
  pastRationale: string,
  learning: string
): ADR {
  return { decision, context, alternatives, rationale, consequences: { positive, tradeoffs }, changeToday, pastRationale, learning };
}

const ADR_RULES: ADRRule[] = [
  {
    name: 'API / Backend',
    matchKeywords: ['api', 'node', 'backend'],
    createADR: (project) => {
      const desc = project.desc.toLowerCase();
      const changeToday = desc.includes('saas') 
        ? 'Consider using tRPC or GraphQL for automatic contract safety between frontend and backend.'
        : 'I’d likely use tRPC now for contract safety between frontend and backend automatically.';
      
      const pastRationale = desc.includes('saas') 
        ? 'Previously used REST, worked fine but state sync was manual.'
        : 'REST was perfect to keep backend flexible while frontend was still evolving.';
      
      const learning = desc.includes('saas') 
        ? 'How you manage API contracts and data flow is key for SaaS applications.'
        : 'How you structure your data models (domain design) is way more important than which protocol you use to send it.';
      
      return createADR(
        'Building a simple, solid API',
        'I needed a way for different parts of the system to talk to each other without getting tangled up.',
        ['GraphQL', 'tRPC', 'Serverless single-purpose endpoints'],
        'I went with REST because it’s a reliable, industry-standard way to keep things predictable.',
        'The API is easy to document and integrates perfectly with almost any tool.',
        'Sometimes it sends a bit more data than needed, but I prioritized simplicity and consistency over micro-optimizing every bytes.',
        changeToday,
        pastRationale,
        learning
      );
    },
    priority: 1
  },
  {
    name: 'Next.js',
    matchKeywords: ['next'],
    createADR: (project) => {
      const desc = project.desc.toLowerCase();
      let context = '';
      let rationale = '';

      if (desc.includes('saas') || desc.includes('dashboard') || desc.includes('admin')) {
        context = 'The product has public pages and multi-role dashboards with frequent updates and dynamic data.';
        rationale = 'Next.js gives hybrid rendering: server-rendered pages for SEO and client-driven dashboards for flexibility.';
      } else if (desc.includes('luxury') || desc.includes('premium') || desc.includes('high-fashion')) {
        context = 'Brand image is crucial; visuals must be consistent for marketing campaigns.';
        rationale = 'Server-side rendering ensures stable layouts, fast first paint, and premium feel.';
      } else {
        context = 'We needed good initial load without committing to only SPA or static site.';
        rationale = 'Next.js allows evolving the rendering strategy per route without full rewrites.';
      }

      const changeToday = desc.includes('saas')
        ? 'Use ISR more to optimize dashboards and dynamic pages.'
        : 'Use ISR and image optimization to improve premium UI performance.';
      
      const pastRationale = desc.includes('saas')
        ? 'Server-side fetching helped dashboards but required caching.'
        : 'SSR ensured fast load and consistent layout for high-end pages.';
      
      const learning = desc.includes('saas')
        ? 'Focus on state management and caching for dynamic dashboards.'
        : 'UI/UX quality and rendering consistency are crucial for premium brands.';

      return createADR(
        'Next.js for a blend of speed and power',
        context,
        ['Pure SPA (React)', 'Static Site Generation only'],
        rationale,
        'Everything feels fast, with flexibility per page.',
        'Running a real server adds deployment complexity.',
        changeToday,
        pastRationale,
        learning
      );
    },
    priority: 2
  },
  {
    name: 'React SPA',
    matchKeywords: ['react'],
    createADR: (project) => {
      const desc = project.desc.toLowerCase();
      const changeToday = desc.includes('saas')
        ? 'Adopt advanced state management patterns (Redux Toolkit, Zustand).'
        : 'Adopt headless UI pattern (like Radix) for logic/presentation separation.';
      
      const pastRationale = desc.includes('saas')
        ? 'Component-driven design helped with dashboards state isolation.'
        : 'Using hooks to isolate component state was enough for project scope.';
      
      const learning = desc.includes('saas')
        ? 'Proper state isolation is crucial for SaaS apps with dynamic components.'
        : 'Consistent prop interfaces matter as much as the component code itself.';

      return createADR(
        'Component-driven architecture with isolated state',
        'The project is a React SPA needing reusable components and predictable state boundaries.',
        ['Monolithic components', 'Global state only', 'Ad-hoc logic'],
        'Component-driven design improves maintainability, encourages reuse, and reduces bugs in complex UI.',
        'Easier testing, consistent UI, faster onboarding for frontend devs.',
        'Initial setup overhead and discipline to keep state/props clean.',
        changeToday,
        pastRationale,
        learning
      );
    },
    priority: 3
  },
  {
    name: 'Native UI',
    matchKeywords: ['ui'],
    createADR: (project) => {
      const desc = project.desc.toLowerCase();
      const changeToday = desc.includes('luxury')
        ? 'Invest more in reusable design components for consistent premium feel.'
        : 'Introduce reusable components and a lightweight utility library.';
      
      const pastRationale = desc.includes('luxury')
        ? 'Native approach ensured fast delivery but needed careful UI planning.'
        : 'Native approach allowed fastest delivery with minimal dependencies.';
      
      const learning = desc.includes('luxury')
        ? 'Even small visual inconsistencies can hurt user perception in luxury apps.'
        : 'Even small native UIs benefit from modularity; separate structure, style, behavior.';

      return createADR(
        'Focus on accessibility, responsiveness, and visual consistency',
        'UI is native (non-framework) and needs to be clear, responsive, and maintainable.',
        ['Fixed layouts', 'Minimal accessibility', 'Ad-hoc styling'],
        'Consistency and accessibility improve user trust and adoption.',
        'Better UX, works on all devices, easier to enhance in future.',
        'Needs careful CSS/JS organization; may need a simple design system.',
        changeToday,
        pastRationale,
        learning
      );
    },
    priority: 4
  }
];

export function generateADR(project: Project, maxResults = 3): ADR[] {
  const title = project.title.toLowerCase();
  const desc = project.desc.toLowerCase();
  const category = project.category.toLowerCase();

  const scoredRules = ADR_RULES.map((rule) => {
    let score = 0;
    for (const kw of rule.matchKeywords) {
      if (title.includes(kw) || desc.includes(kw) || category.includes(kw)) {
        score += 1;
      }
    }
    return { rule, score };
  })
  .filter(({ score }) => score > 0)
  .sort((a, b) => {
    const priorityA = a.rule.priority ?? 99;
    const priorityB = b.rule.priority ?? 99;
    return priorityA - priorityB || b.score - a.score;
  });

  return scoredRules.slice(0, maxResults).map(({ rule }) => rule.createADR(project));
}
