import CaseStudyCard from "@/components/case-study-card";
import ContactForm from "@/components/contact-form";
import HeroSection from "@/components/hero-section";
import Marquee from "@/components/marquee";
import Reveal from "@/components/reveal";
import SectionIntro from "@/components/section-intro";
import StructuredData from "@/components/structured-data";
import TextScramble from "@/components/text-scramble";
import {
  contactConfig,
  contactLinks,
  education,
  experience,
  profile,
  skillsByGroup,
} from "@/lib/content";
import { buildHomeStructuredData, getFeaturedCaseStudies } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BsArrowUpRight } from "react-icons/bs";

const featuredCaseStudies = getFeaturedCaseStudies();

const allSkills = skillsByGroup.flatMap((g) => g.skills);

export default function Home() {
  return (
    <>
      <StructuredData data={buildHomeStructuredData()} />

      <main>
        <HeroSection />

        {/* Proof Points */}
        <section
          aria-label="Professional highlights"
          className="border-b-brutal border-[var(--line-strong)] px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-[88rem] gap-0 border-brutal border-[var(--line-strong)] lg:grid-cols-3">
            {profile.proofPoints.map((point, index) => (
              <Reveal
                key={point.label}
                delay={index * 0.06}
                className={cn(
                  "border-b border-[var(--line)] bg-[var(--surface)] p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0",
                )}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {point.label}
                </p>
                <p className="mt-4 font-display text-2xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
                  <TextScramble
                    text={point.value}
                    trigger="mount"
                    speed={35}
                  />
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {point.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Marquee Divider */}
        <Marquee className="py-4 text-sm font-bold uppercase tracking-[0.3em] text-[var(--muted)]">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className="whitespace-nowrap">
              {skill}
              <span className="mx-4 text-[var(--accent)]">/</span>
            </span>
          ))}
        </Marquee>

        {/* Projects */}
        <section
          id="projects"
          className="border-t-brutal-thick border-[var(--accent)] px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto max-w-[88rem]">
            <Reveal>
              <SectionIntro
                index={1}
                eyebrow="Featured work"
                title="Four projects that best represent how I think and build."
                body="These are the strongest examples of my technical judgement right now: a local-first desktop transcription tool, a production SvelteKit medication tracker, a cross-disciplinary embedded systems prototype, and a fundamentals-heavy Java build — each chosen to show different layers of the stack."
              />
            </Reveal>

            <div className="mt-14">
              {featuredCaseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={caseStudy.slug}
                  caseStudy={caseStudy}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section
          id="approach"
          className="border-y-brutal border-[var(--line-strong)] px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionIntro
                index={2}
                eyebrow="Engineering approach"
                title="I prefer clear structure, honest tradeoffs, and work that still reads well after the deadline."
                body="The strongest thread through my projects is not a single framework. It is the way I work: model the problem carefully, choose tools deliberately, and carry the quality bar through to the final interface and behaviour."
              />
            </Reveal>

            <div className="grid gap-6">
              <Reveal
                delay={0.05}
                className="border-brutal border-[var(--line-strong)] bg-[var(--surface)] p-6 sm:p-8">
                <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
                  {profile.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal
                delay={0.1}
                className="border-brutal border-[var(--line-strong)] bg-[var(--accent-muted)] p-6 sm:p-8">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--accent)]">
                  &gt; What I optimise for
                </p>
                <ul className="mt-5 space-y-0">
                  {profile.principles.map((principle) => (
                    <li
                      key={principle}
                      className="border-t border-[var(--line)] py-3 text-sm leading-7 text-[var(--foreground)] first:border-t-0">
                      <span className="text-[var(--accent)]">&gt;</span>{" "}
                      {principle}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[88rem]">
            <Reveal>
              <SectionIntro
                index={3}
                eyebrow="Skill groups"
                title="A practical stack shaped more by delivery than by trend-chasing."
                body="I learn tools in context: enough depth to use them responsibly, enough range to move between interface, logic, and data concerns when the project demands it."
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-0 border-brutal border-[var(--line-strong)] lg:grid-cols-2">
              {skillsByGroup.map((group, index) => (
                <Reveal
                  key={group.title}
                  delay={index * 0.06}
                  className={cn(
                    "border-b border-[var(--line)] bg-[var(--surface)] p-6 last:border-b-0 sm:p-8",
                    "lg:border-b-0 lg:border-r lg:odd:border-r lg:last:border-r-0",
                    index < 2 && "lg:border-b",
                  )}>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    {group.title}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {group.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="border-brutal border-[var(--line-strong)] bg-transparent px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="border-y-brutal border-[var(--line-strong)] px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto max-w-[88rem]">
            <Reveal>
              <SectionIntro
                index={4}
                eyebrow="Experience and education"
                title="From customer-facing roles to engineering solutions that ship."
                body="Years of public-facing work built communication, prioritisation, and reliability. Now I apply those foundations alongside technical skill as a Software and Solutions Engineer."
              />
            </Reveal>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {/* Education */}
              <Reveal
                delay={0.05}
                className="self-start">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Education
                </p>
                <div className="mt-6 space-y-0">
                  {education.map((item) => (
                    <article
                      key={item.title}
                      className="border-l-[3px] border-[var(--accent)] border-b border-b-[var(--line)] py-5 pl-5 last:border-b-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                            {item.title}
                          </h3>
                          <h4 className="text-sm font-semibold text-[var(--foreground)]">
                            {item.grade}
                          </h4>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {item.institution}
                          </p>
                        </div>
                        <span className="bg-[var(--accent)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--background)]">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        {item.summary}
                      </p>
                    </article>
                  ))}
                </div>
              </Reveal>

              {/* Professional experience */}
              <Reveal delay={0.1}>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Professional experience
                </p>
                <div className="mt-6 space-y-0">
                  {experience.map((item) => (
                    <article
                      key={`${item.title}-${item.period}`}
                      className="border-l-[3px] border-[var(--accent)] border-b border-b-[var(--line)] py-5 pl-5 last:border-b-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-base font-bold text-[var(--foreground)]">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {item.organisation} / {item.location}
                          </p>
                        </div>
                        <span className="bg-[var(--accent)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--background)]">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        {item.summary}
                      </p>
                      <ul className="mt-4 grid gap-1.5">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm leading-7 text-[var(--foreground)]">
                            <span className="text-[var(--muted)]">//</span>{" "}
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionIntro
                index={5}
                eyebrow="Contact"
                title="If the work here feels relevant, I would be glad to talk."
                body={contactConfig.formIntro}
              />
              <div className="mt-8 space-y-4 text-sm leading-7 text-[var(--muted)]">
                <p>{contactConfig.availabilityNote}</p>
                <p>{contactConfig.responseNote}</p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className={cn(
                      "group border-brutal border-[var(--line-strong)] bg-[var(--surface)] px-5 py-5 transition-all duration-200",
                      "hover:border-[var(--accent)] hover:shadow-[0_0_20px_var(--accent-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                    )}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-medium text-[var(--foreground)]">
                        {link.label}
                      </span>
                      <BsArrowUpRight className="text-xs text-[var(--muted)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
