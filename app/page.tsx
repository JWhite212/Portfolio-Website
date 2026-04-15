import CaseStudyCard from "@/components/case-study-card";
import ContactForm from "@/components/contact-form";
import HeroSection from "@/components/hero-section";
import Reveal from "@/components/reveal";
import SectionIntro from "@/components/section-intro";
import StructuredData from "@/components/structured-data";
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

export default function Home() {
  return (
    <>
      <StructuredData data={buildHomeStructuredData()} />

      <main>
        <HeroSection />

        <section
          aria-label="Professional highlights"
          className="border-b border-[var(--line)] px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-[88rem] gap-4 lg:grid-cols-3">
            {profile.proofPoints.map((point, index) => (
              <Reveal
                key={point.label}
                delay={index * 0.06}
                className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_12px_36px_rgba(15,20,18,0.04)]">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {point.label}
                </p>
                <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {point.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {point.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto max-w-[88rem]">
            <Reveal>
              <SectionIntro
                eyebrow="Featured work"
                title="Three projects that best represent how I think and build."
                body="These are the strongest examples of my technical judgement right now: one cross-disciplinary systems prototype, one fundamentals-heavy Java build, and one product-facing platform I designed around clearer storytelling and stronger implementation quality."
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

        <section
          id="approach"
          className="border-y border-[var(--line)] px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionIntro
                eyebrow="Engineering approach"
                title="I prefer clear structure, honest tradeoffs, and work that still reads well after the deadline."
                body="The strongest thread through my projects is not a single framework. It is the way I work: model the problem carefully, choose tools deliberately, and carry the quality bar through to the final interface and behaviour."
              />
            </Reveal>

            <div className="grid gap-6">
              <Reveal
                delay={0.05}
                className="rounded-[1.9rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
                <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
                  {profile.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal
                delay={0.1}
                className="rounded-[1.9rem] border border-[var(--line)] bg-[color:rgba(20,67,61,0.08)] p-6 sm:p-8">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                  What I optimise for
                </p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {profile.principles.map((principle) => (
                    <li
                      key={principle}
                      className="rounded-[1.35rem] border border-[color:rgba(20,67,61,0.14)] bg-[color:rgba(255,255,255,0.74)] px-4 py-4 text-sm leading-7 text-[var(--foreground)]">
                      {principle}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[88rem]">
            <Reveal>
              <SectionIntro
                eyebrow="Skill groups"
                title="A practical stack shaped more by delivery than by trend-chasing."
                body="I learn tools in context: enough depth to use them responsibly, enough range to move between interface, logic, and data concerns when the project demands it."
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {skillsByGroup.map((group, index) => (
                <Reveal
                  key={group.title}
                  delay={index * 0.06}
                  className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
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
                        className="rounded-full border border-[color:rgba(20,67,61,0.14)] bg-white px-3.5 py-2 text-sm text-[var(--foreground)]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="border-t border-[var(--line)] px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <Reveal>
              <SectionIntro
                eyebrow="Experience and education"
<<<<<<< HEAD
                title="From customer-facing roles to engineering solutions that ship."
                body="Years of public-facing work built communication, prioritisation, and reliability. Now I apply those foundations alongside technical skill as a Software and Solutions Engineer."
=======
                 title="From customer-facing roles to engineering solutions that ship."
                 body="Years of public-facing work built communication, prioritisation, and reliability. Now I apply those foundations alongside technical skill as a Software and Solutions Engineer."
>>>>>>> a8f77a7cfaf370a033ad9d323da9ed5ce50fdf86
              />
            </Reveal>

            <div className="grid gap-8 xl:grid-cols-2">
              <Reveal
                delay={0.05}
                className="rounded-[1.85rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Education
                </p>
                <div className="mt-6 space-y-5">
                  {education.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[1.35rem] border border-[color:rgba(20,67,61,0.12)] bg-white px-5 py-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-[var(--foreground)]">
                            {item.title}
                          </h3>
                          <h4 className="text-m font-semibold text-[var(--foreground)]">
                            {item.grade}
                          </h4>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {item.institution}
                          </p>
                        </div>
                        <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
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

              <Reveal
                delay={0.1}
                className="rounded-[1.85rem] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Professional experience
                </p>
                <div className="mt-6 space-y-5">
                  {experience.map((item) => (
                    <article
                      key={`${item.title}-${item.period}`}
                      className="rounded-[1.35rem] border border-[color:rgba(20,67,61,0.12)] bg-white px-5 py-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--foreground)]">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--muted)]">
                            {item.organisation} / {item.location}
                          </p>
                        </div>
                        <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        {item.summary}
                      </p>
                      <ul className="mt-4 grid gap-2">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm leading-7 text-[var(--foreground)]">
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

        <section
          id="contact"
          className="border-t border-[var(--line)] px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
          data-nav-section>
          <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionIntro
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
                      "group rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-5 transition-colors duration-200",
                      "hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                    )}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-medium text-[var(--foreground)]">
                        {link.label}
                      </span>
                      <BsArrowUpRight className="text-xs text-[var(--muted)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
