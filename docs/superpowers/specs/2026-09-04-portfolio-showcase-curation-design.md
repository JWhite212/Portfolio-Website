# Portfolio showcase curation — design

**Date:** 2026-09-04
**Status:** Approved design, pending implementation plan
**Repo:** `Portfolio-Website` (branch `feat/portfolio-showcase-curation`, based on `main` @ `83a98fb`)

---

## 1. Context

The portfolio currently features five case studies: Context Recall, MedTracker,
Automatic IoT Plant Watering System, Java Vending Machine, and Portfolio Platform
Redesign. All five have `featured: true`.

Two problems prompted this work.

**The site is positioned for a graduate.** `profile.role` reads "Early-career
Software Engineer", `availability` says "Open to graduate, junior, and early-career
software engineering roles", and `heroSummary` leads with "Java domain modelling".
The author is a working Software and Solutions Engineer with an MSc (Distinction).
The framing undersells the work.

**The strongest project is missing.** An audit of the wider `Projects/` folder found
Snackless — a Flutter wellness app with 736 commits over ten months, in beta on
TestFlight and Google Play — absent from the site entirely, while an academic Java
exercise occupies a featured slot.

## 2. Decisions

| Decision           | Choice                                          | Rationale                                                                   |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------------- |
| Audience           | Working engineer, open to better roles          | Matches reality; favours cutting weak work over adding volume               |
| Curation           | Add Snackless, demote Java Vending Machine      | Keeps five strong featured pieces rather than six uneven ones               |
| Demotion mechanism | "Other work" strip on the homepage              | Smallest change that avoids orphaned pages                                  |
| `medtracker-mac`   | Fold into the existing MedTracker case study    | It has no UI; standalone it invites "where's the app?"                      |
| Snackless ordering | First in the array (renders as "Case study 01") | Only shipped product with users; only mobile work; longest sustained effort |

## 3. Audit findings that shaped this

Projects assessed and **rejected**, with reasons, so this is not revisited:

- **Home Assistant Projects** — genuinely good systems C (a Layer-2 Ethernet↔WiFi
  bridge chosen over NAT for a documented reason). Rejected: contains live WiFi
  SSID and password, MQTT and OTA passwords, an ESPHome API encryption key, and a
  Tailscale key. Also overlaps the existing IoT case study.
- **obsidian-notion-sync** — excellent 327-line README, strict TypeScript.
  Rejected: evidence it was never run (no lockfile, no `node_modules`, not a git
  repo), and two bugs confirmed by execution.
- **Personal Organisation Project** — n8n workflow JSON exports, not a codebase.
  Rejected as standalone; may later serve as a one-line origin beat in Context Recall.
- **legacy-coding** — confirmed duplicate of Snackless; its HEAD is a direct
  ancestor, two commits behind. Rejected.
- **sandbox** — one 425-line React file, no build, no repo. Rejected.

## 4. Content model changes

No changes to `lib/types.ts`. `CaseStudy.featured: boolean` already exists and is
sufficient.

**`lib/site.ts`** — add one function mirroring the existing `getFeaturedCaseStudies`:

```ts
export function getOtherCaseStudies() {
  return caseStudies.filter((caseStudy) => !caseStudy.featured);
}
```

**`app/page.tsx`** — beneath the featured `CaseStudyCard` list, render an "Other
work" strip: for each non-featured case study, its `title`, its `summary`, and a
link to `/projects/[slug]`. Reuses existing fields; no new content shape.

**`lib/content.ts`** — `java-vending-machine` gets `featured: false`.

**`app/sitemap.ts`** — unchanged. `getCaseStudyParams()` already returns every case
study, so demoted pages stay indexed. That is now correct rather than a bug,
because the "Other work" strip makes them reachable by navigation.

### Why not the alternatives

A dedicated `/projects` index page was considered and rejected as over-engineering
for six case studies — it adds a route, a nav entry, and a page to maintain.
Deleting the Java case study outright was rejected because it 404s
`/projects/java-vending-machine` for anything already linking to it.

## 5. Snackless case study

Inserted **first** in the `caseStudies` array in `lib/content.ts`.

### Verified facts (do not embellish beyond these)

- 736 commits, 2025-07-16 → 2026-05-18; 742 of 747 commits authored by Jamie White
- 143 first-party Dart files; 18,666 LOC under `lib/`
- 155 test cases across 36 test files; 7,214 LOC of test code
- 3 GitHub Actions workflows; codecov integration
- Feature-first + strictly layered ("Very Good Architecture"): presentation →
  application → domain → data, with documented boundaries (no `dio` in
  application; no Flutter imports in domain)
- Features present in `lib/features/`: account, audio, auth, daily_data, feedback,
  onboarding, programme, programme_day, shell, today
- Three build flavours: `main_development.dart`, `main_staging.dart`,
  `main_production.dart`
- Stack: Flutter/Dart, `flutter_bloc` + `hydrated_bloc`, `go_router`, `get_it`,
  Freezed, `dio` with auth / 401-refresh / retry interceptors, Hive,
  `flutter_secure_storage`, Firebase (Core, Crashlytics, Firestore, Analytics),
  `audio_service` + `just_audio` for background playback, `flutter_localizations`
- Product: 30-day sequential audio coaching programme with day-gated unlocking,
  resumable playback, journaling, snack-plan checklist, food log, subscriber-gated
  access, day-30 feedback form
- Distribution: TestFlight and Google Play closed beta; backend is a Wix functions
  API at `snacklessnow.com`
- Origin: began as an MSc Advanced Computer Science project (University of Kent,
  2025); code is © 2025 Snackless, all rights reserved

### Identity

- `slug`: `"snackless"` — so the detail page is `/projects/snackless`
- `title`: `"Snackless"`
- `featured`: `true`
- `githubUrl`: **omit the field entirely** (it is optional on the `CaseStudy` type).
  Do not set it to an empty string.

### Framing

Lead with **shipped product with real users**, not with its MSc origin. The origin
is worth one clause, not the headline — otherwise it reads like another academic
exercise, which is exactly the signal being removed by demoting Java.

### Links — deliberately different from every other case study

- `links` contains exactly one entry: the live product,
  `https://snacklessnow.com` (verified HTTP 200), with `kind: "live"`
- **No repository link.** `github.com/JWhite212/Snackless-App` returns HTTP 404 —
  the repo is private and the code is owned by Snackless. A dead link is worse
  than none.
- The absence must be explained, not left silent. Add it as the final entry in
  the `outcome` array — a single sentence stating the repository is private
  because the code is commercially owned. `outcome` is chosen because the detail
  page already renders it as a bulleted list, so no template change is needed.

This is the first case study without a readable repo, which means the write-up and
screenshots carry the entire evidentiary burden.

### BLOCKER — screenshots

Snackless contains no app screenshots (`assets/images/` holds only `icon.png`).
Every other case study leads with a hero image and a "Screens" gallery of four
more. **The author must capture five screenshots** from a simulator or device
before this case study can ship:

1. Daily audio session (hero) — the core interaction
2. Programme / day list showing day-gated unlocking
3. Journal or food log
4. Onboarding
5. Account or settings

Save to `public/` following the existing camelCase convention
(`snacklessAudioSession.png`, `snacklessProgramme.png`, `snacklessJournal.png`,
`snacklessOnboarding.png`, `snacklessAccount.png`) and import at the top of
`lib/content.ts`.

Implementation may proceed on everything else while screenshots are outstanding,
but the case study must not be merged with placeholder images.

## 6. MedTracker — add the native macOS client

`medtracker-mac` is folded into the **existing** `medication-tracker` case study.
No new entry, no new page.

Verified facts:

- 406 tests passing across 6 Swift packages (MedTrackerCore 208, MedTrackerData 61,
  MedTrackerSync 47, MedTrackerApp 74, MedTrackerUI 13, MedTrackerTestSupport 3)
- CI gates all six packages, with third-party actions pinned to full commit SHAs
- `swiftformat --lint` and `swiftlint --strict` both clean across 104 files
- `docs/PARITY-DIVERGENCES.md` — a formal register of four intentional behavioural
  divergences from the TypeScript web app, including cases where a known upstream
  DST bug was deliberately **not** ported

Additions to the existing case study object:

- ~2 entries to `architecture` — the offline-first outbox, and the shared
  `/api/v1` contract between web and native clients
- 1–2 entries to `features` — offline-first native client; timezone-correct day
  bucketing pushed into SQL via a registered SQLite scalar function
- 1 entry to `challenges` — ordering dependent commands in the outbox, where a
  dose can reference a medication created seconds earlier that the server has not
  yet assigned an ID

**Honesty constraint:** the macOS client has no UI (`no @main`, no screens; its own
self-audit says "The engine is built and well-tested. The car has no body"), and
the strongest work sits on an unmerged branch. The case study must describe it as
a **client in progress with its sync layer complete**, never as a shipped app. Do
not add screenshots of it, because there is nothing to screenshot.

## 7. Repositioning

Rewrite in `lib/content.ts`:

- `profile.role` — "Early-career Software Engineer" → a current-role framing
  (e.g. "Software & Solutions Engineer")
- `profile.availability` — drop "graduate, junior, and early-career"; state
  openness to senior/mid opportunities without implying unemployment
- `profile.heroHeadline` and `profile.heroSummary` — lead with shipped systems,
  testing discipline, and production ownership. Remove "Java domain modelling",
  which now points at demoted work.
- `profile.quickFacts` — replace the Java/OOP line; mobile (Flutter/Dart) is
  currently unrepresented despite being the largest body of work.

Update `app/page.tsx` `SectionIntro` for the projects section: the current copy
enumerates the featured projects in prose and will be wrong after the swap.

## 8. Out of scope

Identified during the audit, deliberately excluded. Each is a separate task:

- Deleting `legacy-coding` (duplicate clone of Snackless)
- Removing the Claude workflows (`claude.yml`, `claude-code-review.yml`), 4 tracked
  Claude/agent files, and 2 Claude-authored commits from Snackless
- Fixing the Snackless codecov badge (points at `branch/master`; branch is `main`)
- Rotating / removing the plaintext credentials in `Home Assistant Projects`
- Reviewing the Firebase Android key committed at
  `Snackless/android/app/google-services.json`
- Adding CI to `Portfolio-Website` (currently none; `npm run check` is unenforced)

## 9. Verification

The repo has no test suite, so verification is build- and lint-based plus manual
review.

1. `npm run check` — `prettier --check . && eslint .` must pass.
2. `npm run build` — must succeed, and the route list must show
   `/projects/snackless` alongside the existing five case study routes
   (six total; demoting Java does not remove its route).
3. `npm run dev`, then confirm by eye:
   - The projects section shows **five** featured cards, Snackless as "Case study 01"
   - An "Other work" strip appears beneath, containing Java Vending Machine, and
     its link resolves to `/projects/java-vending-machine`
   - `/projects/snackless` renders hero, metrics, problem, approach, architecture,
     technical decisions, features, outcome, challenges, screens gallery, and a
     links block containing the live-product link and **no** repository link
   - The MedTracker page shows the new native-client entries
4. Confirm no copy anywhere still says "graduate", "junior", or "early-career",
   and that the projects `SectionIntro` matches the new lineup.
5. Confirm every image imported in `lib/content.ts` resolves to a real file in
   `public/` (a missing import fails the build).

## 10. Open items

- **Screenshots (blocking merge).** Five Snackless captures, listed in §5.
- **Wording of the repositioning copy.** Direction is agreed; exact sentences to be
  drafted during implementation and reviewed.
