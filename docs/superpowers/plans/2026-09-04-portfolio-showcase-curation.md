# Portfolio Showcase Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the portfolio for a working engineer by adding Snackless as the lead case study, demoting the academic Java project behind a new "Other work" strip, and folding the native macOS client into the existing MedTracker study.

**Architecture:** All content lives in `lib/content.ts` as a typed `caseStudies` array; the homepage filters it by `featured` and `/projects/[slug]` renders each entry from the same objects. So most of this work is data edits plus one small filter function and one new presentational block. No new routes, no new types.

**Tech Stack:** Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion. ESLint via `.eslintrc.json` (not flat config), Prettier.

**Spec:** `docs/superpowers/specs/2026-09-04-portfolio-showcase-curation-design.md`

## Global Constraints

- Branch: `feat/portfolio-showcase-curation`, based on `main` @ `83a98fb`.
- **No test framework exists in this repo.** There is no vitest/jest, no `test` script. Verification for every task is `npm run check`, `npm run build`, and named visual checks. Do not invent test files; do not add a test runner (out of scope).
- `npm run check` is `prettier --check . && eslint .` — it does **not** run `tsc`. Type errors surface only via `npm run build`. Always run both.
- **No Claude/AI attribution in any commit message.** No `Co-Authored-By: Claude`, no "Generated with" lines.
- Never claim the macOS client is shipped — it has no UI. Describe it as a client in progress with its sync layer complete.
- Never add a repository link for Snackless — `github.com/JWhite212/Snackless-App` is private and returns 404.
- Every image referenced in `lib/content.ts` must exist in `public/`, or the build fails.
- Case study card numbering derives from array order, so array position is meaningful.

---

## File Structure

| File                           | Responsibility                    | Change                                                                  |
| ------------------------------ | --------------------------------- | ----------------------------------------------------------------------- |
| `app/projects/[slug]/page.tsx` | Case study detail page            | Modify — guard the hero against empty `media`                           |
| `lib/site.ts`                  | Content selectors + site metadata | Modify — add `getOtherCaseStudies`; update description and `knowsAbout` |
| `app/page.tsx`                 | Homepage                          | Modify — render "Other work" strip; update projects intro copy          |
| `lib/content.ts`               | All site content                  | Modify — demote Java, add Snackless, extend MedTracker, rewrite profile |
| `public/snackless*.png`        | Snackless screenshots             | Create — **user-supplied, Task 7 only**                                 |

---

### Task 1: Guard the hero image against empty media

The detail page reads `caseStudy.media[0].src` with no guard, while the homepage card (`components/case-study-card.tsx:138`) and the screens gallery (`app/projects/[slug]/page.tsx:311`) both check length first. `CaseStudyMedia[]` permits an empty array, so this is a latent crash. Fixing it first is what allows Snackless to land before screenshots exist.

**Files:**

- Modify: `app/projects/[slug]/page.tsx:118-131`

**Interfaces:**

- Consumes: nothing
- Produces: a detail page that renders correctly when `caseStudy.media` is `[]`

- [ ] **Step 1: Confirm the bug before fixing it**

Run:

```bash
cd /Users/jamiewhite/Documents/Personal/Projects/Portfolio-Website
sed -n '118,131p' 'app/projects/[slug]/page.tsx'
```

Expected: you see `caseStudy.media[0].src` and `caseStudy.media[0].alt` and `caseStudy.media[0].caption` with no surrounding length check or optional chaining.

- [ ] **Step 2: Wrap the hero block in a length guard**

Replace lines 118-131 of `app/projects/[slug]/page.tsx`:

<!-- prettier-ignore -->
```tsx
          {/* Hero image */}
          {caseStudy.media.length > 0 ? (
            <div className="mt-12 border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-3">
              <GlitchImage
                src={caseStudy.media[0].src}
                alt={caseStudy.media[0].alt}
                fill
                priority
                sizes="(min-width: 1024px) 80rem, 100vw"
                className="relative aspect-[16/9] border border-[var(--line)]"
              />
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {caseStudy.media[0].caption}
              </p>
            </div>
          ) : null}
```

- [ ] **Step 3: Verify nothing regressed**

Run:

```bash
npm run check && npm run build
```

Expected: both pass. Build output still lists all five `/projects/*` routes. Existing case studies all have media, so their heroes are unchanged.

- [ ] **Step 4: Commit**

```bash
git add 'app/projects/[slug]/page.tsx'
git commit -m "fix: guard case study hero image against empty media array

The homepage card and screens gallery both check media.length before
indexing, but the detail page hero read media[0] directly. CaseStudyMedia[]
permits an empty array, so a case study added without screenshots crashed
static generation."
```

---

### Task 2: Add the "Other work" selector and strip

**Files:**

- Modify: `lib/site.ts` (after `getFeaturedCaseStudies`, around line 26)
- Modify: `app/page.tsx` (projects section)

**Interfaces:**

- Consumes: `caseStudies` from `lib/content.ts`
- Produces: `getOtherCaseStudies(): CaseStudy[]` — returns non-featured case studies, used by `app/page.tsx`

- [ ] **Step 1: Add the selector**

In `lib/site.ts`, directly beneath `getFeaturedCaseStudies`:

```ts
export function getOtherCaseStudies() {
  return caseStudies.filter((caseStudy) => !caseStudy.featured);
}
```

- [ ] **Step 2: Import it on the homepage**

In `app/page.tsx`, extend the existing import from `@/lib/site`:

```tsx
import {
  buildHomeStructuredData,
  getFeaturedCaseStudies,
  getOtherCaseStudies,
} from "@/lib/site";
```

Then beside the existing `const featuredCaseStudies = getFeaturedCaseStudies();` add:

```tsx
const otherCaseStudies = getOtherCaseStudies();
```

- [ ] **Step 3: Render the strip**

In `app/page.tsx`, inside the projects `<section>`, immediately after the closing `</div>` of the `<div className="mt-14">` that maps `featuredCaseStudies`:

<!-- prettier-ignore -->
```tsx
            {otherCaseStudies.length > 0 ? (
              <Reveal>
                <div className="mt-16 border-t-brutal border-[var(--line-strong)] pt-8">
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                    <span className="text-[var(--accent)]">[</span> Other work{" "}
                    <span className="text-[var(--accent)]">]</span>
                  </h3>
                  <ul className="mt-6 grid gap-0">
                    {otherCaseStudies.map((caseStudy) => (
                      <li
                        key={caseStudy.slug}
                        className="border-t border-[var(--line)] first:border-t-0">
                        <Link
                          href={`/projects/${caseStudy.slug}`}
                          className="group flex flex-col gap-1 py-5 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:flex-row sm:items-baseline sm:gap-6">
                          <span className="font-display text-lg font-bold tracking-[-0.02em] text-[var(--foreground)] group-hover:text-[var(--accent)] sm:w-64 sm:shrink-0">
                            {caseStudy.title}
                          </span>
                          <span className="text-sm leading-7 text-[var(--muted)]">
                            {caseStudy.summary}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
```

- [ ] **Step 4: Add the `Link` import**

`app/page.tsx` does **not** currently import `next/link` (verified). Add it to
the imports at the top of the file:

```tsx
import Link from "next/link";
```

Without this the build fails with `Link is not defined`.

- [ ] **Step 5: Verify**

Run:

```bash
npm run check && npm run build
```

Expected: both pass. The strip renders nothing yet — every case study is still `featured: true`, so `otherCaseStudies` is empty and the guard returns `null`. This is correct at this stage.

- [ ] **Step 6: Commit**

```bash
git add lib/site.ts app/page.tsx
git commit -m "feat: add Other work strip for non-featured case studies

Demoting a case study to featured:false previously left its page routed
and in the sitemap but unreachable by navigation. This gives demoted work
a home on the homepage without competing with the featured cards."
```

---

### Task 3: Demote the Java Vending Machine

**Files:**

- Modify: `lib/content.ts:576` (the `featured: true` inside the `java-vending-machine` object, which starts at line 519)

**Interfaces:**

- Consumes: `getOtherCaseStudies` from Task 2
- Produces: exactly one non-featured case study, so the Task 2 strip becomes visible

- [ ] **Step 1: Locate the right line**

Run:

```bash
grep -n 'slug: "\|featured: ' lib/content.ts
```

Expected: `slug: "java-vending-machine"` at 519 and its `featured: true` at 576 (the first `featured:` line _after_ 519). Confirm before editing — do not edit by line number alone if the output differs.

- [ ] **Step 2: Flip the flag**

In the `java-vending-machine` object only, change:

```ts
    featured: true,
```

to:

```ts
    featured: false,
```

- [ ] **Step 3: Verify counts**

Run:

```bash
grep -c 'featured: true' lib/content.ts   # expect 4
grep -c 'featured: false' lib/content.ts  # expect 1
npm run check && npm run build
```

Expected: 4 and 1; both commands pass; build still lists five `/projects/*` routes (demotion does not remove the route).

- [ ] **Step 4: Visual check**

Run `npm run dev`, open `http://localhost:3000`, and confirm:

- Four featured cards, numbered 01–04
- An "Other work" strip beneath them containing "Java Vending Machine"
- Clicking it loads `/projects/java-vending-machine` and the page renders normally

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts
git commit -m "refactor: demote Java Vending Machine to Other work

An academic exercise is the weakest signal alongside shipped production
systems. The case study is preserved and still reachable via the Other
work strip rather than deleted."
```

---

### Task 4: Add the Snackless case study

Added **first** in the array so it renders as "Case study 01". `media` is intentionally `[]` — Task 1's guard makes this safe, and Task 7 fills it once screenshots exist.

Every claim below is verified. Do not add figures not present here.

**Files:**

- Modify: `lib/content.ts` — insert as the first element of `caseStudies` (before the `context-recall` object at line 83)

**Interfaces:**

- Consumes: the `CaseStudy` type from `lib/types.ts`; the empty-media guard from Task 1
- Produces: a case study with `slug: "snackless"`, routed at `/projects/snackless` via the existing `generateStaticParams`

- [ ] **Step 1: Insert the object**

Insert immediately after `export const caseStudies: CaseStudy[] = [`:

```ts
  {
    slug: "snackless",
    title: "Snackless",
    summary:
      "A Flutter wellness app delivering a 30-day audio coaching programme with day-gated content, resumable background playback, and offline-first daily tracking. In beta on TestFlight and Google Play.",
    role: "Solo developer",
    period: "2025 – 2026",
    problem:
      "Behaviour-change programmes fail when the app gets in the way. Users needed to move through thirty sequential days of audio coaching without losing their place, without being able to skip ahead and break the programme's structure, and without the app becoming useless the moment their connection dropped mid-session. The content also had to stay behind a subscription boundary, which meant authentication, token refresh, and access checks all had to be reliable rather than best-effort.",
    approach: [
      "Structured the codebase feature-first with strict layer boundaries (presentation, application, domain, data) so each feature owns its own vertical slice. The rules are enforced by convention and documented: no HTTP client in the application layer, no Flutter imports in the domain layer, which keeps business logic pure Dart and directly testable.",
      "Centralised the day-unlock rules into a single pure-Dart policy object rather than scattering conditionals through the UI. Unlocking is driven by two independent paths — elapsed time and completion — and resolving both in one place removed a class of bugs where different screens disagreed about whether a day was available.",
      "Built the network layer as a stack of composable Dio interceptors, each with one responsibility: attaching auth headers, refreshing expired tokens, retrying transient failures, and logging with sensitive fields redacted.",
    ],
    technicalDecisions: [
      {
        title: "A single unlock policy in the domain layer",
        detail:
          "ProgrammeUnlockPolicy is pure Dart with no Flutter or I/O dependencies. It resolves the highest unlocked day as max(currentDay, highestCompleted + 1), clamped to the programme length, so time-based progression and completion-based progression cannot disagree. Because it is a pure function it is unit tested directly, and every screen asks the same object rather than reimplementing the rule.",
      },
      {
        title: "BLoC with hydrated state for resumability",
        detail:
          "State lives in flutter_bloc, with hydrated_bloc persisting the blocs that matter — programme progress, navigation, completion settings — to disk automatically. Reopening the app restores position without a bespoke save/restore path, and the persistence concern stays out of the UI entirely.",
      },
      {
        title: "Composable Dio interceptors over a monolithic client",
        detail:
          "Auth, token refresh, retry, and redacted logging are four separate interceptors rather than branching logic inside one client. Each is independently testable and independently removable, and the redaction interceptor means debug logging can stay enabled without leaking tokens.",
      },
      {
        title: "Background audio through audio_service",
        detail:
          "Coaching sessions play through audio_service and just_audio so playback survives backgrounding and integrates with OS media controls. Session position is tracked so a user can leave mid-session and resume where they stopped rather than restarting the day.",
      },
    ],
    stack: [
      "Flutter",
      "Dart",
      "BLoC",
      "hydrated_bloc",
      "GoRouter",
      "get_it",
      "Freezed",
      "Dio",
      "Hive",
      "Firebase",
      "audio_service",
      "just_audio",
    ],
    outcome: [
      "Shipped to beta on both platforms — TestFlight for iOS and a Google Play closed beta — against a live backend, with Firebase Crashlytics reporting from real devices.",
      "Sustained 736 commits across ten months on a single codebase, ending at 143 Dart source files and roughly 18,700 lines under lib/.",
      "Built a 155-case test suite across 36 files, gated by three GitHub Actions workflows with coverage reporting.",
      "Note: the repository is private and the code is commercially owned, so it is not linkable here. The architecture and decisions described above are drawn from the codebase directly.",
    ],
    links: [
      {
        label: "Live product",
        href: "https://snacklessnow.com",
        kind: "live",
      },
    ],
    media: [],
    featured: true,
    metrics: [
      {
        label: "Commits over 10 months",
        value: "736",
        detail:
          "Sustained solo development from July 2025 to May 2026 on one codebase.",
      },
      {
        label: "Test cases",
        value: "155",
        detail: "Across 36 test files and roughly 7,200 lines of test code.",
      },
      {
        label: "CI workflows",
        value: "3",
        detail: "GitHub Actions gating analysis and tests, with coverage reporting.",
      },
      {
        label: "Build flavours",
        value: "3",
        detail:
          "Separate development, staging, and production entry points.",
      },
    ],
    architecture: [
      "Feature-first structure under lib/features — account, audio, auth, daily_data, feedback, onboarding, programme, programme_day, shell, today — each owning its own presentation, application, domain, and data layers.",
      "Strict unidirectional flow: UI renders from BLoC state, BLoCs coordinate repositories, repositories own data sources. The domain layer is pure Dart with no Flutter imports, so it is deterministic and directly testable.",
      "A Dio client composed of four single-responsibility interceptors — auth header injection, 401 token refresh, transient retry, and redacted logging.",
      "Local persistence split by purpose: Hive for feature caches and offline reads, hydrated_bloc for automatic state restoration, and flutter_secure_storage for tokens.",
      "Firebase provides Crashlytics, Firestore, and Analytics; audio_service and just_audio drive background playback with OS media controls.",
      "Three build flavours (development, staging, production) with a shared bootstrap entry point, so environment configuration never leaks into feature code.",
    ],
    features: [
      {
        title: "30-day gated programme",
        detail:
          "Content unlocks day by day, driven by a single domain policy that resolves elapsed time and completion progress into one answer so no two screens disagree.",
      },
      {
        title: "Resumable background audio",
        detail:
          "Sessions continue playing when the app is backgrounded, integrate with OS media controls, and resume from the last position rather than restarting.",
      },
      {
        title: "Daily journaling and food log",
        detail:
          "Per-day notes, a snack-plan checklist, and a food log with timestamps and optional ratings, cached locally so entries survive connection loss.",
      },
      {
        title: "Subscriber-gated access",
        detail:
          "Authentication with automatic token refresh and a subscription check; users without an active subscription are routed to sign-up rather than shown locked content.",
      },
      {
        title: "Guided onboarding",
        detail:
          "An interactive coach-mark tutorial introduces the programme structure on first run.",
      },
      {
        title: "Localisation-ready",
        detail:
          "All user-facing strings flow through Flutter's l10n pipeline with ARB resources rather than being hardcoded in widgets.",
      },
    ],
    challenges: [
      {
        title: "Two sources of truth for whether a day is unlocked",
        detail:
          "Days unlock either because enough time has elapsed or because the previous day was completed, and early on the rule was reimplemented per screen. That let the programme list and the day page disagree. Consolidating into ProgrammeUnlockPolicy — a pure function taking current day, completed set, and programme length — made the rule testable in isolation and removed the disagreement by construction.",
      },
      {
        title: "Keeping debug logging safe on a subscription API",
        detail:
          "Useful network logs and auth tokens travel in the same requests. Rather than disabling logging in release or relying on remembering to strip fields, redaction is its own interceptor in the chain, so sensitive values are removed at one known point regardless of who added the log call.",
      },
      {
        title: "Preserving position across app lifecycle",
        detail:
          "Users leave mid-session and return later, sometimes after the OS has evicted the app. Rather than a bespoke persistence path, progress-bearing blocs are hydrated, so restoration is a property of the state layer instead of logic each screen must remember to run.",
      },
    ],
  },
```

- [ ] **Step 2: Verify it builds and routes**

Run:

```bash
npm run check && npm run build
```

Expected: both pass. Build output now lists **six** `/projects/*` routes including `/projects/snackless`. Featured count is back to five.

- [ ] **Step 3: Visual check**

Run `npm run dev`, then:

- `http://localhost:3000` — Snackless is "Case study 01"; five featured cards; Java still in "Other work"
- `http://localhost:3000/projects/snackless` — renders with **no hero image** (expected until Task 7) and no "Screens" section, but with metrics, problem, approach, architecture, technical decisions, features, outcome, and challenges all present
- The links block shows only "Live product"; there is **no** repository link

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add Snackless as the lead case study

A Flutter wellness app with 736 commits over ten months, 155 test cases,
and beta distribution on TestFlight and Google Play. It is the only mobile
work and the only shipped product on the site, so it leads.

Screenshots follow separately; media is intentionally empty and the hero
is guarded."
```

---

### Task 5: Fold the native macOS client into MedTracker

**Source for the claims in this task:** `/Users/jamiewhite/Documents/Personal/Projects/medtracker-mac`. The 406 tests across six packages are verifiable there by running `swift test` in each package under `Packages/`.

**Files:**

- Modify: `lib/content.ts` — the `medication-tracker` object (starts line 261; its `architecture`, `features`, and `challenges` arrays sit between roughly lines 391 and 454, but locate them by content, not line number, since Task 4 shifted everything)

**Interfaces:**

- Consumes: the existing `medication-tracker` case study object
- Produces: no new exports; the same object with three arrays extended

- [ ] **Step 1: Locate the arrays**

Run:

```bash
grep -n 'slug: "medication-tracker"' lib/content.ts
awk 'NR>=S && /^    (architecture|features|challenges):/ {print NR": "$0}' S=$(grep -n 'slug: "medication-tracker"' lib/content.ts | cut -d: -f1) lib/content.ts
```

- [ ] **Step 2: Append two entries to `architecture`**

Add as the final two elements of the `medication-tracker` `architecture` array:

```ts
      "A versioned /api/v1 JSON surface sits beside the form actions, because a native client cannot post SvelteKit form actions. Both surfaces funnel through the same service layer into the same schema, so a dose logged on either is the same row.",
      "A native macOS client (Swift 6, SwiftUI, GRDB/SQLite) consumes that API offline-first: writes land in a local outbox and drain to the server when connectivity allows, with server IDs reconciled back into local rows.",
```

- [ ] **Step 3: Append one entry to `features`**

Add as the final element of the `features` array:

```ts
      {
        title: "Offline-first native client",
        detail:
          "A macOS client shares the domain rules with the web app but keeps its own local SQLite store, so dose logging works with no connection and reconciles when the network returns. Its sync layer is complete and covered by 406 tests across six Swift packages; the user interface is still in progress.",
      },
```

- [ ] **Step 4: Append one entry to `challenges`**

Add as the final element of the `challenges` array:

```ts
      {
        title: "Ordering dependent writes in an offline outbox",
        detail:
          "A user can create a medication offline and log a dose against it seconds later, before the server has ever assigned that medication an ID. The outbox therefore sends one command per request rather than batching, so the server-assigned ID from the first can be substituted into the second, and the ID rewrite plus the outbox status flip happen in a single local transaction. Porting the domain logic also surfaced timezone bugs in the original TypeScript around DST boundaries; those were deliberately not reproduced, and the divergences are recorded rather than left implicit.",
      },
```

- [ ] **Step 5: Verify**

Run:

```bash
npm run check && npm run build
```

Then `npm run dev` and open `http://localhost:3000/projects/medication-tracker`. Confirm the two new architecture lines, the new feature card, and the new challenge all render, and that nothing claims the macOS app is shipped or available to download.

- [ ] **Step 6: Commit**

```bash
git add lib/content.ts
git commit -m "feat: document the native macOS client in the MedTracker case study

The client's sync layer is complete with 406 passing tests, but it has no
UI yet, so it is described inside the existing case study rather than
given one of its own. Explicitly framed as in progress."
```

---

### Task 6: Reposition the profile copy

**Files:**

- Modify: `lib/content.ts` — the `profile` object (starts line 33)
- Modify: `lib/site.ts` — `siteConfig.description`, and `knowsAbout` in `buildHomeStructuredData`
- Modify: `app/page.tsx` — the projects `SectionIntro`

**Interfaces:**

- Consumes: nothing
- Produces: no signature changes; copy only

- [ ] **Step 1: Rewrite the profile fields**

In `lib/content.ts`, replace these five fields inside `profile`:

```ts
  role: "Software & Solutions Engineer",
  location: "United Kingdom",
  heroEyebrow: "Jamie White / software engineer / UK-based",
  heroHeadline:
    "Building and shipping software that stays maintainable after the first release — mobile, web, and the systems behind them.",
  heroSummary:
    "I work across the stack and take features from design through to production: a Flutter wellness app in beta on both stores, a SvelteKit medication tracker with a native macOS client, and a local-first desktop transcription tool. I care about testing, clear boundaries, and code that reads well six months later.",
  availability:
    "Working as a Software and Solutions Engineer and open to roles where I can take more ownership of production systems.",
  quickFacts: [
    "Flutter and Dart, BLoC architecture, published to TestFlight and Google Play",
    "TypeScript across Next.js, SvelteKit, and Node — typed end to end",
    "Testing, CI, and security hardening as part of delivery, not after it",
  ],
```

- [ ] **Step 2: Update the `about` paragraphs**

Replace the second `about` paragraph, which currently leads with Java:

```ts
    "The work I am most proud of shares a shape: a real user-facing product, a test suite I trust, and architecture decisions I can still justify. That covers a thirty-day coaching app in beta, a medication tracker hardened over several security review passes, and embedded prototypes that tie software decisions to real-world behaviour.",
```

- [ ] **Step 3: Update site metadata**

In `lib/site.ts`, replace `siteConfig.description`:

```ts
  description:
    "Portfolio for Jamie White, a software and solutions engineer building and shipping mobile, web, and systems software.",
```

And in `buildHomeStructuredData`, replace `knowsAbout`:

```ts
    knowsAbout: [
      "Flutter",
      "Dart",
      "TypeScript",
      "Next.js",
      "SvelteKit",
      "React",
      "Swift",
      "Software engineering",
      "Automated testing",
    ],
```

- [ ] **Step 4: Update the projects intro**

In `app/page.tsx`, the `SectionIntro` currently says "Four projects" while five are featured — a pre-existing inaccuracy. Replace `title` and `body`:

```tsx
title = "Five projects that show how I build and ship.";
body =
  "A Flutter wellness app in beta on both app stores, a production medication tracker with a native client, a local-first desktop transcription tool, an embedded systems prototype, and the site you are reading — each chosen to show a different layer of the stack.";
```

- [ ] **Step 5: Verify no stale positioning remains**

Run:

```bash
grep -rniE 'early-career|graduate|junior' lib/ app/ components/ --include=*.ts --include=*.tsx
```

Expected: **no matches.** If any remain, fix them.

Then:

```bash
npm run check && npm run build
```

- [ ] **Step 6: Visual check**

Run `npm run dev` and confirm on `http://localhost:3000`: the hero, availability badge, quick facts, and projects intro all read as a working engineer, and the projects intro count matches the five featured cards on screen.

- [ ] **Step 7: Commit**

```bash
git add lib/content.ts lib/site.ts app/page.tsx
git commit -m "content: reposition site for a working engineer

The site described a graduate seeking a first role while the author is a
working software and solutions engineer. Rewrites the role, availability,
hero copy, quick facts, site description, and structured-data keywords,
and adds mobile work which was previously unrepresented.

Also corrects the projects intro, which said Four projects while five
were featured."
```

---

### Task 7: Add Snackless screenshots — BLOCKED ON USER

**Do not start this task until the user supplies the image files.** Everything before it is complete and verifiable without them.

**Files:**

- Create: `public/snacklessAudioSession.png`, `public/snacklessProgramme.png`, `public/snacklessJournal.png`, `public/snacklessOnboarding.png`, `public/snacklessAccount.png`
- Modify: `lib/content.ts` — imports at the top, and the `media` array of the `snackless` case study

**Interfaces:**

- Consumes: the `snackless` case study object from Task 4
- Produces: a populated `media` array, which re-enables the hero (Task 1 guard) and the "Screens" gallery (needs `media.length > 1`)

- [ ] **Step 1: Confirm all five files exist**

Run:

```bash
ls -la public/snackless*.png
```

Expected: five files. If any are missing, stop — the build will fail on a missing import.

- [ ] **Step 2: Add the imports**

At the top of `lib/content.ts`, alongside the existing image imports:

```ts
import snacklessAudioImg from "@/public/snacklessAudioSession.png";
import snacklessProgrammeImg from "@/public/snacklessProgramme.png";
import snacklessJournalImg from "@/public/snacklessJournal.png";
import snacklessOnboardingImg from "@/public/snacklessOnboarding.png";
import snacklessAccountImg from "@/public/snacklessAccount.png";
```

- [ ] **Step 3: Populate `media`**

Replace `media: [],` in the `snackless` case study with:

```ts
    media: [
      {
        src: snacklessAudioImg,
        alt: "Snackless daily audio coaching session with playback controls",
        caption:
          "The core interaction — a day's audio session with resumable playback that continues in the background and integrates with OS media controls.",
      },
      {
        src: snacklessProgrammeImg,
        alt: "Snackless 30-day programme list showing locked and unlocked days",
        caption:
          "The 30-day programme. Days unlock through a single domain policy that resolves elapsed time and completion progress into one answer.",
      },
      {
        src: snacklessJournalImg,
        alt: "Snackless daily journal and food log entry screen",
        caption:
          "Daily journaling, snack-plan checklist, and food log — cached locally so entries survive a dropped connection.",
      },
      {
        src: snacklessOnboardingImg,
        alt: "Snackless onboarding tutorial introducing the programme",
        caption:
          "Guided onboarding introduces the programme structure on first run using interactive coach marks.",
      },
      {
        src: snacklessAccountImg,
        alt: "Snackless account and settings screen",
        caption:
          "Account and settings, including the subscription state that gates access to programme content.",
      },
    ],
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run check && npm run build
```

Expected: both pass. A missing or misnamed file fails the build here with a module-not-found error naming the import.

- [ ] **Step 5: Visual check**

Run `npm run dev` and open `http://localhost:3000/projects/snackless`. Confirm:

- The hero image renders with its caption (it was absent before this task)
- A "Screens" section appears with the remaining four images and captions
- The homepage "Case study 01" card now shows the Snackless hero image

- [ ] **Step 6: Commit**

```bash
git add public/snackless*.png lib/content.ts
git commit -m "feat: add Snackless screenshots

Populates the media array, which enables the hero image and the Screens
gallery. The case study previously rendered without images by design."
```

---

## Final verification

After all seven tasks:

- [ ] `npm run check` passes
- [ ] `npm run build` passes and lists six `/projects/*` routes
- [ ] `grep -c 'featured: true' lib/content.ts` returns 5; `featured: false` returns 1
- [ ] `grep -rniE 'early-career|graduate|junior' lib/ app/ components/ --include=*.ts --include=*.tsx` returns nothing
- [ ] Homepage: five featured cards with Snackless as 01, plus an "Other work" strip containing Java Vending Machine
- [ ] `/projects/snackless` has a live-product link and no repository link
- [ ] `/projects/medication-tracker` describes the macOS client as in progress, never as shipped
- [ ] No commit on the branch contains Claude/AI attribution:
      `git log main..HEAD --format=%B | grep -ci claude` returns 0
