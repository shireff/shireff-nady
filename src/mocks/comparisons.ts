import { TechComparison } from "@/types";

/**
 * @test_only
 * Deterministic mock data for UI and logic testing of technical comparisons.
 * Marked with isTestData: true for safety.
 */
export const MOCK_TECH_COMPARISONS: TechComparison[] = [
  {
    id: "test-c1",
    title: "State Management: Redux vs Context API",
    description: "A specialized lookup into when to use centralized state versus native React context.",
    leftItem: {
      name: "Redux Toolkit",
      details: "Centralized, debuggable, scalable state management with middleware support."
    },
    rightItem: {
      name: "Context API",
      details: "Native React solution for drilling props without external overhead."
    },
    criteria: ["Scalability", "DevTools Support", "Bundle Size", "Boilerplate"],
    winner: "left",
    createdAt: "2023-10-01T10:00:00Z",
    isTestData: true
  },
  {
    id: "test-c2",
    title: "Vite vs Webpack 5 Performance",
    description: "Benchmarking cold starts and HMR in enterprise-scale applications.",
    leftItem: {
      name: "Vite",
      details: "Uses ES modules for near-instant cold starts and lightning-fast HMR."
    },
    rightItem: {
      name: "Webpack 5",
      details: "Robust ecosystem with superior legacy support and deep bundle optimization."
    },
    criteria: ["Startup Speed", "HMR Consistency", "Plugin Ecosystem"],
    winner: "right",
    createdAt: "2023-11-15T14:30:00Z",
    isTestData: true
  },
  {
    id: "test-c3",
    title: "Zustand vs Jotai: Atomic vs Flux",
    description: "Comparing two modern lightweight state managers for small to medium apps.",
    leftItem: {
      name: "Zustand",
      details: "Flux-inspired state management with a small footprint."
    },
    rightItem: {
      name: "Jotai",
      details: "Atomic state management for granular updates."
    },
    criteria: ["Atomic Control", "Ease of Use"],
    winner: "tie",
    createdAt: "2023-12-01T09:00:00Z",
    isTestData: true
  },
  {
    id: "test-c4",
    title: "SQL vs NoSQL: Postgres vs MongoDB",
    description: "The classic debate for backend architecture in scalable startups.",
    leftItem: {
      name: "PostgreSQL",
      details: "Reliable relational database with advanced JSONB support."
    },
    rightItem: {
      name: "MongoDB",
      details: "Schema-less document store optimized for rapid development."
    },
    criteria: ["Data Integrity", "Write Throughput", "Schema Flexibility", "Query Complexity", "ACID Compliance"],
    winner: "left",
    createdAt: "2024-01-10T11:20:00Z",
    isTestData: true
  },
  {
    id: "test-c5",
    title: "Tailwind CSS vs Styled Components",
    description: "Styling efficiency analysis for UI/UX architects.",
    leftItem: {
      name: "Tailwind CSS",
      details: "Utility-first CSS with amazing build-time optimization."
    },
    rightItem: {
      name: "Styled Components",
      details: "Run-time CSS-in-JS providing true dynamic styling capabilities."
    },
    criteria: ["Development Speed", "Performance (Runtime)", "Custom Themes"],
    winner: "right",
    createdAt: "2024-02-05T16:45:00Z",
    isTestData: true
  },
  {
    id: "test-c6",
    title: "Minimal Data Test",
    description: "Edge case with minimal criteria.",
    leftItem: {
      name: "Item A",
      details: "Short detail."
    },
    rightItem: {
      name: "Item B",
      details: "Short detail."
    },
    criteria: ["Price"],
    winner: "tie",
    createdAt: "2024-03-01T12:00:00Z",
    isTestData: true
  }
];
