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
      decision: 'Building a simple, solid API',
      context:
        'I needed a way for different parts of the system—like the dashboard and the mobile app—to talk to each other without getting tangled up.',
      alternatives: ['GraphQL', 'tRPC', 'Serverless single-purpose endpoints'],
      rationale:
        'I went with REST because it’s a reliable, industry-standard way to keep things predictable. It makes it much easier for anyone else joining the project to jump right in.',
      consequences: {
        positive:
          'The API is easy to document and integrates perfectly with almost any tool.',
        tradeoffs:
          'Sometimes it sends a bit more data than needed, but I prioritized simplicity and consistency over micro-optimizing every bytes.'
      },
      changeToday:
        'I’d likely use tRPC now to get that extra layer of "contract" safety between the frontend and the backend automatically.',
      pastRationale:
        'REST was the perfect choice for keeping the backend flexible while the frontend was still being figured out.',
      learning:
        'How you structure your data models (domain design) is way more important than which protocol you use to send it.'
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
      decision: 'Next.js for a blend of speed and power',
      context,
      alternatives: ['Pure SPA (React)', 'Static Site Generation only'],
      rationale,
      consequences: {
        positive:
          'Everything feels incredibly fast, and I had the freedom to decide how each specific page should be rendered.',
        tradeoffs:
          'Running a real server adds a few more moving parts to the deployment and caching strategy.'
      },
      changeToday:
        'I would lean more into Incremental Static Regeneration (ISR) to keep the speed high while keeping the server costs low.',
      pastRationale:
        'The dashboards needed real-time-ish data, so server-side fetching was the most straightforward way to keep things fresh.',
      learning:
        'Managing how data flows between the server and the client is a balancing act—get it wrong, and you deal with hydration errors.'
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
      decision: 'Choosing simplicity over "cool" features',
      context:
        'These users are usually busy running their businesses; they don’t have time to learn a complex accounting tool.',
      alternatives: ['Full accounting', 'Highly configurable enterprise tools'],
      rationale:
        'I intentionally limited the features and kept the language simple to make the app feel accessible and fast to use every day.',
      consequences: {
        positive:
          'Users get up to speed in minutes, and there’s almost zero need for support manuals.',
        tradeoffs:
          'I had to say "no" to some advanced features to keep the overall experience clean.'
      },
      changeToday:
        'I might add a "Pro Mode" that stays hidden until you actually need it, keeping the UI clean for new users.',
      pastRationale:
        'I applied the 80/20 rule: focusing on the 20% of features that 80% of people use every day.',
      learning:
        'It’s actually much harder to keep a product simple than it is to keep adding features.'
    });
  }

  // Limit noise: max 3 ADRs per project
  return adrs.slice(0, 3);
}
