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

export function generateADR(project: Project): ADR[] {
  const adrs: ADR[] = [];

  const title = project.title.toLowerCase();
  const desc = project.desc.toLowerCase();
  const category = project.category.toLowerCase();

  const isAPI = title.includes('api') || category.includes('node');
  const isNext = category.includes('next');
  const isReact = category.includes('react');
  const isUI = category.includes('ui') && !isReact && !isNext; // Native UI
  const isSaaS =
    desc.includes('saas') ||
    desc.includes('dashboard') ||
    desc.includes('admin') ||
    desc.includes('multi-role');

  const isBusinessTool =
    desc.includes('small business') ||
    desc.includes('freelancer') ||
    desc.includes('management') ||
    desc.includes('tracking');

  const isLuxuryBrand =
    desc.includes('luxury') ||
    desc.includes('premium') ||
    desc.includes('high-fashion');

  /**
   * 1️⃣ Backend / API Architecture
   */
  if (isAPI) {
    adrs.push({
      decision: 'REST-first API with clear boundaries',
      context:
        'The backend needs to serve multiple consumers like dashboards, admin panels, or apps. Tight coupling with frontend would slow things down.',
      alternatives: ['GraphQL', 'tRPC', 'Serverless single-purpose endpoints'],
      rationale:
        'REST is simple, familiar, and lets future developers understand endpoints easily without over-complicating things.',
      consequences: {
        positive:
          'Clear API contracts, easy documentation via Swagger, predictable integration for multiple clients.',
        tradeoffs:
          'Some over-fetching may happen compared to GraphQL, but simplicity is prioritized over micro-optimizations.'
      },
      changeToday:
        'Add type-safe RPC layer (like tRPC) to keep frontend and backend contracts in sync automatically.',
      pastRationale:
        'At the time, REST was standard and allowed maximum flexibility for unknown future clients.',
      learning:
        'Focusing on domain-driven design in API endpoints matters more than early over-optimization.'
    });
  }

  /**
   * 2️⃣ Frontend Rendering / Next.js Strategy
   */
  if (isNext) {
    let context = '';
    let rationale = '';

    if (isSaaS) {
      context =
        'The product has public pages and multi-role dashboards with frequent updates and dynamic data.';
      rationale =
        'Next.js gives hybrid rendering: server-rendered pages for SEO and client-driven dashboards for flexibility.';
    } else if (isLuxuryBrand) {
      context =
        'Brand image is crucial; visuals must be consistent for marketing campaigns.';
      rationale =
        'Server-side rendering ensures stable layouts, fast first paint, and premium feel.';
    } else {
      context =
        'We needed good initial load without committing to only SPA or static site.';
      rationale =
        'Next.js allows evolving the rendering strategy per route without full rewrites.';
    }

    adrs.push({
      decision: 'Hybrid rendering using Next.js',
      context,
      alternatives: ['Pure SPA (React)', 'Static Site Generation only'],
      rationale,
      consequences: {
        positive:
          'Good performance and flexibility to pick the right rendering per page.',
        tradeoffs:
          'Server runtime adds complexity in caching, deployment, and handling failures.'
      },
      changeToday:
        'Move towards Incremental Static Regeneration (ISR) for pages that rarely change to save server compute.',
      pastRationale:
        'Dynamic dashboards required server-side fetching for consistent data at that time.',
      learning:
        'Mixing Server and Client components requires clear data flow to avoid hydration issues.'
    });
  }

  /**
   * 3️⃣ React SPA Strategy
   */
  if (isReact && !isNext) {
    adrs.push({
      decision: 'Component-driven architecture with isolated state',
      context:
        'The project is a React SPA needing reusable components and predictable state boundaries.',
      alternatives: ['Monolithic components', 'Global state only', 'Ad-hoc logic'],
      rationale:
        'Component-driven design improves maintainability, encourages reuse, and reduces bugs in complex UI.',
      consequences: {
        positive:
          'Easier testing, consistent UI, faster onboarding for frontend devs.',
        tradeoffs:
          'Initial setup overhead and discipline to keep state/props clean.'
      },
      changeToday:
        'Adopt a headless UI pattern (like Radix) to separate logic from presentation for more flexibility.',
      pastRationale:
        'Using hooks to isolate component state was enough for project scope then.',
      learning:
        'Consistent prop interfaces matter as much as the component code itself for long-term health.'
    });
  }

  /**
   * 4️⃣ Native UI Strategy
   */
  if (isUI) {
    adrs.push({
      decision: 'Focus on accessibility, responsiveness, and visual consistency',
      context:
        'UI is native (non-framework) and needs to be clear, responsive, and maintainable.',
      alternatives: ['Fixed layouts', 'Minimal accessibility', 'Ad-hoc styling'],
      rationale:
        'Consistency and accessibility improve user trust and adoption, especially for public-facing projects.',
      consequences: {
        positive:
          'Better UX, works on all devices, easier to enhance in future.',
        tradeoffs:
          'Needs careful CSS/JS organization; may need a simple design system for maintainability.'
      },
      changeToday:
        'Introduce minimal reusable components and consider a lightweight utility library (Tailwind or Alpine.js) to standardize UI patterns.',
      pastRationale:
        'Native approach allowed fastest delivery with minimal dependencies.',
      learning:
        'Even small native UIs benefit from modularity; separating structure, style, and behavior early pays off.'
    });
  }

  /**
   * 5️⃣ SaaS / State Strategy
   */
  if (isSaaS) {
    adrs.push({
      decision: 'Central client-side state layer for server data',
      context:
        'Multiple roles interact with shared datasets; predictable and synchronized state is critical.',
      alternatives: ['Prop drilling', 'Context only', 'Ad-hoc fetch logic'],
      rationale:
        'Centralized client state avoids duplicated network calls and clarifies data ownership.',
      consequences: {
        positive:
          'Fewer sync bugs, better perceived performance, predictable flow.',
        tradeoffs:
          'Extra setup; must enforce conventions to prevent misuse.'
      },
      changeToday:
        'Use Server Actions and cache revalidation to reduce client-side complexity and simplify state management.',
      pastRationale:
        'Redux/centralized state was needed for multi-user dashboards at the time.',
      learning:
        'Local state is sufficient for simple interactions; global state is for cross-cutting shared data.'
    });
  }

  /**
   * 6️⃣ Business Tool / Simplicity
   */
  if (isBusinessTool) {
    adrs.push({
      decision: 'Limit features and simplify domain language',
      context:
        'Target users are small business owners needing clarity and speed, not full accounting systems.',
      alternatives: ['Full accounting', 'Highly configurable enterprise tools'],
      rationale:
        'Simplifying terminology reduces cognitive load and increases daily use.',
      consequences: {
        positive:
          'Faster onboarding, higher confidence, fewer support requests.',
        tradeoffs:
          'Some advanced use cases are unsupported to maintain simplicity.'
      },
      changeToday:
        'Add optional "Advanced Mode" for power users without cluttering main interface.',
      pastRationale:
        '80/20 rule applied to ensure usability for target non-technical users.',
      learning:
        'Feature restraint is a skill; avoiding complexity is harder than adding it.'
    });
  }

  // Limit noise: max 3 ADRs per project
  return adrs.slice(0, 3);
}
