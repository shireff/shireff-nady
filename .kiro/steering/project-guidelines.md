# Project Guidelines — MANDATORY Before Any Task

## ⚠️ STRICT RULES — NO EXCEPTIONS

---

## Never Assume

- NEVER assume anything.
- If you need:
  - API response
  - console output
  - file content
  - component usage
    → STOP and ask before proceeding.

---

## Ask Before Acting — PRIORITY

If ANY of the following is missing:

- Design
- API response
- File content
- Component usage
  → DO NOT write code. Ask first.

---

## Anti-Hallucination — ZERO TOLERANCE

- NEVER invent:
  - APIs
  - functions
  - hooks
  - components
  - file paths
- If something is not confirmed to exist → ASK.

---

## Context Awareness — MANDATORY

- ALWAYS read the full file before editing.
- ALWAYS understand related files before implementing logic.
- If multiple files are involved → ask for them.
- NEVER work blindly.

---

## File Safety — STRICT

- NEVER rename, move, or delete files unless explicitly asked.
- NEVER create new files if an existing one can be extended.
- NEVER modify imports unless required.

---

## Logic Integrity — CRITICAL

- NEVER change existing logic unless explicitly requested.
- NEVER refactor or optimize logic.
- If something looks wrong → ASK before changing it.

---

## Scope Control — NO OVERENGINEERING

- Do NOT:
  - add abstractions
  - create hooks/utilities/helpers
  - generalize code
  - prepare for future use
- Implement ONLY what is required NOW.

---

## Dependency Awareness

- Do NOT:
  - install new packages
  - update dependencies
  - introduce new libraries
- Use only existing project dependencies.

---

## State Management Safety

- NEVER introduce new global state.
- NEVER modify state structure.
- Follow existing patterns exactly.

---

## Design Fidelity — STRICT

- If design is provided → implement EXACTLY as is.
- NO additions. NO removals. NO guessing.
- If no design → ASK before building UI.

---

## 🔴 Design Modification Rule — CRITICAL

- When editing ANY existing UI:
  - DO NOT change the design at all.
  - DO NOT modify layout, spacing, colors, or structure.
  - DO NOT "improve" or "fix" UI.
- When a NEW design is provided:
  - MUST follow it 100% EXACTLY.
  - MUST respect:
    - project design patterns
    - existing styling system
    - responsiveness rules
- Design accuracy has HIGHER priority than personal judgment.

---

## UI Safety

- Do NOT:
  - change spacing
  - change colors
  - change typography
  - "improve" UI
- Only follow provided design.

---

## Responsive Design — MANDATORY

- ANY UI you touch MUST be responsive.
- ALWAYS support:
  - Mobile
  - Tablet
  - Laptop
  - Desktop
  - Large screens
- If something is not responsive → FIX IT immediately.
- Responsiveness is NOT optional.
- While keeping FULL design fidelity.

---

## Component Reuse

- ALWAYS check if component already exists.
- If exists → USE IT.
- NEVER duplicate components.

---

## Component Structure — STRICT

- NEVER put everything in one file.
- When working on a page:
  - Go to `components/`
  - Create a folder with the SAME name as the page
  - Example:
    ```
    components/dashboard/
      Header.tsx
      StatsCard.tsx
      _icons.tsx
    ```
- All page-related components MUST live inside this folder.
- `_icons.tsx` must contain all icons for that page.

---

## Pages Creation Rule

- When creating a new page:
  1. FIRST request API response (if data is involved)
  2. DO NOT start UI before understanding data
  3. THEN build the page

---

## API Data — STRICT

- NEVER:
  - reshape API response
  - rename fields
  - add fallback/mock data
- If API is unclear or missing → ASK.

---

## Charts (AdminLineChart & AdminBarChart)

- Y-axis MUST be dynamic.
- X-axis MUST be day names:
  (Sat, Sun, Mon, Tue, Wed, Thu, Fri)
- NEVER use raw dates.
- Data MUST be aggregated using:
  `aggregateByWeek`
- Auto-select highest week on load.
- Each chart:
  - manages its own state
  - fetches via `fetchFn`

---

## Translation Files

- EVERY component with text MUST have translation files.
- ANY text change MUST update translations.

---

## Code Style

- NO unnecessary:
  - code
  - wrappers
  - comments
  - fallback data
- NO `any` without explanation.
- ALWAYS run:
  `getDiagnostics` after edits.

---

## Verification Before Response

- Ensure code is logically correct.
- Ensure imports/types match project.
- If unsure → ASK.

---

## Before Starting ANY Task — Checklist

1. Read this file fully.
2. Is UI involved?
   → Is design provided? If not → ASK.
3. Is data involved?
   → Is API response provided? If not → ASK.
4. Does component already exist?
   → USE IT.
5. Are you adding anything extra?
   → REMOVE IT.

---

## FINAL RULE

You are NOT here to think, redesign, or improve.
You are here to:
→ Execute the task EXACTLY as requested
→ Without assumptions
→ Without additions
→ Without breaking anything
→ دائما رد عليا بالعربى

---

## API Wiring Rule — MANDATORY

- ANY new API function added to a hook MUST be wired to the UI immediately.
- NEVER add a function to a hook without connecting it to a page/component.
- When wiring API to UI:
  - Use existing modal pattern: fixed overlay `#00000066`, white card `rounded-3xl p-6`
  - Form inputs: `rounded-[97px]` with `var(--primary-100)` background
  - Submit button: `background: #C19632`, `color: #fff`, `rounded-[97px]`
  - Cancel button: `background: var(--primary-100)`, `color: var(--secondary-500)`, `rounded-[97px]`
  - Error display: `fontSize: 13px`, `color: #C0392B`
  - ALWAYS use `extractApiError` for all error handling — NO raw error messages
  - ALWAYS reload data after successful mutation (`load(bid)` or equivalent)
  - ALWAYS add translation keys for ALL new UI text in both `en.json` and `ar.json`

---

## Project Design Tokens — REFERENCE

- Gold accent: `#C19632`
- Primary background: `var(--primary-50)`
- Input background: `var(--primary-100)`
- Text color: `var(--secondary-500)`
- Card shadow: `boxShadow: "0px 0px 2px #0821334D"`
- Button border-radius: `rounded-[97px]`
- Card border-radius: `rounded-3xl`
- Font family: `var(--regular-14-PX-font-family)`
- Modal overlay: `background: #00000066`
- Delete/error color: `#C0392B`
- Delete button bg: `#FDECEA`
- Success color: `#27AE60`
- Table header color: `#7BBCEA`

---

## Wired API Functions — STATUS (as of last session)

### `useTables`

- `getStats` ✅ wired
- `getRevenue` ✅ wired
- `getQueue` ✅ wired
- `getAll` ✅ wired
- `updateStatus` ✅ wired → action menu on TableFloorMap
- `create` ✅ wired → "Add Table" button + modal in TableFloorMap
- `update` ✅ wired → "Edit" in action menu + modal in TableFloorMap
- `remove` ✅ wired → "Delete" in action menu in TableFloorMap

### `useStaff`

- `getStaffStats` ✅ wired
- `getStaff` ✅ wired
- `addStaff` ✅ wired → "Invite Employee" button + modal
- `updateStaff` ✅ wired → Edit button on StaffCard + modal
- `deleteStaff` ✅ wired → Trash button on StaffCard
- `updateStaffStatus` ✅ wired → Status badge dropdown on StaffCard
- `getLeaves` ✅ wired
- `createLeave` ✅ wired → "Create Leave" button + modal
- `approveLeave` ✅ wired → Approve button on pending leave items
- `rejectLeave` ✅ wired → Reject button on pending leave items
- `getOvertime` ✅ wired
- `addOvertime` ✅ wired → "Add Overtime" button + modal

### `useBusinessAuth`

- `login` ✅ wired
- `register` ✅ wired
- `forgotPassword` ✅ wired
- `logout` ✅ wired
- `getProfile` ✅ wired
- `updateProfile` ✅ wired → Edit button on BusinessProfileSection
- `changePassword` ✅ wired → "Change Password" button + modal in BusinessProfileSection
