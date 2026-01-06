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
}

export function generateADR(project: Project): ADR[] {
  const adrs: ADR[] = [];

  const title = project.title.toLowerCase();
  const desc = project.desc.toLowerCase();
  const category = project.category.toLowerCase();

  const isAPI = title.includes('api') || category.includes('node');
  const isNext = category.includes('next');
  const isReact = category.includes('react');
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
      decision: 'REST-first API with explicit domain boundaries',
      context:
        'As the product evolved beyond a single interface, the backend needed to serve multiple consumers such as dashboards, admin panels, and potential future clients. Tight coupling between backend logic and frontend needs would have slowed down iteration and increased coordination costs.',
      alternatives: ['GraphQL', 'tRPC', 'Single-purpose serverless endpoints'],
      rationale:
        'REST was chosen to keep the mental model simple and familiar for both current and future developers. Resource-oriented endpoints aligned naturally with the business language of the domain, while avoiding early complexity around schema governance and client-server coupling that alternatives like GraphQL or tRPC would introduce at this stage.',
      consequences: {
        positive:
          'Clear and predictable API contracts, straightforward documentation via Swagger, and low onboarding friction for new team members or external integrators.',
        tradeoffs:
          'Some level of over-fetching is accepted. This is treated as a conscious tradeoff to preserve simplicity, instead of introducing additional abstraction layers prematurely.'
      }
    });
  }

  /**
   * 2️⃣ Frontend Rendering / Framework
   */
  if (isNext) {
    let context = '';
    let rationale = '';

    if (isSaaS) {
      context =
        'The product includes both public-facing entry points and authenticated dashboards with frequent state changes and evolving requirements. Performance expectations differ significantly between these areas.',
      rationale =
        'Next.js enabled a pragmatic hybrid approach: server-rendered pages for fast first paint and SEO where it matters, while keeping complex dashboards client-driven to preserve flexibility and developer velocity as features evolve.';
    } else if (isLuxuryBrand) {
      context =
        'First impressions and visual stability were critical for the brand, especially for users arriving through marketing campaigns on a wide range of devices.',
      rationale =
        'Server-side rendering was prioritized to ensure consistent layout, predictable loading behavior, and reduced visual shifts, all of which directly support a premium brand perception.';
    } else {
      context =
        'The application required strong initial load performance without committing too early to a single rendering strategy.',
      rationale =
        'Next.js provided a balanced foundation that allows the rendering model to evolve per route as the product matures, without forcing a full architectural rewrite.';
    }

    adrs.push({
      decision: 'Hybrid rendering strategy using Next.js',
      context,
      alternatives: ['Pure SPA (React)', 'Static Site Generation only'],
      rationale,
      consequences: {
        positive:
          'Good performance characteristics combined with the flexibility to choose the right rendering strategy per feature or page.',
        tradeoffs:
          'Introduces a server runtime and requires more deliberate decisions around caching, deployment, and failure handling compared to static-only solutions.'
      }
    });
  }

  /**
   * 3️⃣ State & Data Strategy (Dashboards / SaaS)
   */
  if (isSaaS) {
    adrs.push({
      decision: 'Explicit client-side state layer for server data',
      context:
        'Multiple user roles interact with shared datasets such as users, reports, and bookings, often in parallel. Changes in one area of the UI can have cascading effects across the system.',
      alternatives: ['Prop drilling', 'Context-only state', 'Ad-hoc fetch logic'],
      rationale:
        'Introducing a dedicated client-side server-state layer helped clarify data ownership, reduce duplicated network requests, and make complex UI flows easier to reason about as the application scaled.',
      consequences: {
        positive:
          'More predictable data flow, fewer synchronization bugs, and improved perceived performance during frequent interactions.',
        tradeoffs:
          'Additional upfront setup and the need for clear conventions to prevent the state layer from becoming a dumping ground.'
      }
    });
  }

  /**
   * 4️⃣ Product Simplicity Decision (Business Tools)
   */
  if (isBusinessTool) {
    adrs.push({
      decision: 'Intentional feature restraint with simplified domain language',
      context:
        'The primary users were non-technical business owners who valued clarity and speed over exhaustive feature sets.',
      alternatives: ['Full accounting workflows', 'Highly configurable enterprise-style systems'],
      rationale:
        'By limiting scope and simplifying terminology, the product reduces cognitive load and encourages consistent daily usage, which was more valuable than supporting every edge case.',
      consequences: {
        positive:
          'Faster onboarding, higher user confidence, and fewer support requests related to misunderstood features.',
        tradeoffs:
          'Some advanced use cases are intentionally unsupported to protect overall simplicity and usability.'
      }
    });
  }

  /**
   * Limit noise: max 3 ADRs per project
   */
  return adrs.slice(0, 3);
}
