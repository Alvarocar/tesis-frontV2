import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Briefcase, GraduationCap, Languages, Sparkles, User } from "lucide-react";
import { TResume } from "@app/@types/resume";
import { LanguageNameFactory } from "@app/constants/resume.constant";

type Props = {
  resume: TResume;
  phoneNumber?: string;
  className?: string;
};

type SectionId = "about" | "experience" | "education" | "skills" | "languages";

const SECTIONS: { id: SectionId; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "Sobre mí", icon: <User size={14} aria-hidden="true" /> },
  { id: "experience", label: "Experiencia", icon: <Briefcase size={14} aria-hidden="true" /> },
  { id: "education", label: "Educación", icon: <GraduationCap size={14} aria-hidden="true" /> },
  { id: "skills", label: "Skills", icon: <Sparkles size={14} aria-hidden="true" /> },
  { id: "languages", label: "Idiomas", icon: <Languages size={14} aria-hidden="true" /> },
];

/**
 * Renders the candidate's resume with an in-card anchor nav. The active
 * section is tracked via IntersectionObserver so the nav highlights the
 * part the recruiter is currently looking at — useful when comparing a
 * specific section (e.g. skills) against the AI feedback.
 */
export const ResumeView: React.FC<Props> = ({ resume, phoneNumber, className }) => {
  const [activeId, setActiveId] = useState<SectionId>("about");
  // Map of id → element so the IntersectionObserver can register each one.
  const refs = useRef<Record<SectionId, HTMLElement | null>>({
    about: null,
    experience: null,
    education: null,
    skills: null,
    languages: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id as SectionId);
        }
      },
      {
        // The card's sticky nav occupies ~3rem; bias the trigger line so
        // a section is "active" once it crosses below the nav.
        rootMargin: "-72px 0px -60% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = refs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id: SectionId) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  return (
    <article
      className={classNames(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        className
      )}
    >
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-border bg-surface-muted/40 px-6 py-5">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Aspirante
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">
            {resume.title}
          </h2>
          {phoneNumber ? (
            <p className="mt-1 text-sm text-secondary">
              Teléfono: {phoneNumber}
            </p>
          ) : null}
        </div>
      </header>

      <nav
        aria-label="Secciones de la hoja de vida"
        className="sticky top-16 z-10 border-b border-border bg-surface/95 px-6 py-2 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
      >
        <ul className="flex flex-wrap gap-1">
          {SECTIONS.map(({ id, label, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeId === id ? "true" : undefined}
                className={classNames(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  activeId === id
                    ? "bg-brand-soft text-brand"
                    : "text-secondary hover:bg-surface-muted hover:text-foreground"
                )}
              >
                {icon}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-8 p-6">
        <Section
          id="about"
          ref={setRef("about")}
          title="Sobre mí"
          icon={<User size={16} aria-hidden="true" />}
        >
          {resume.aboutMe ? (
            <p className="whitespace-pre-line text-secondary">{resume.aboutMe}</p>
          ) : (
            <Empty>Falta una descripción personal del candidato.</Empty>
          )}
        </Section>

        {resume.experiences.length > 0 ? (
          <Section
            id="experience"
            ref={setRef("experience")}
            title="Experiencia laboral"
            icon={<Briefcase size={16} aria-hidden="true" />}
          >
            <ol className="space-y-5">
              {resume.experiences.map((exp, i) => (
                <li key={i} className="border-l-2 border-border pl-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {exp.rol} <span className="text-muted">·</span> {exp.company}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {exp.startDate} — {exp.keepWorking ? "Actualmente" : exp.endDate}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-secondary">
                    {exp.description}
                  </p>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {resume.educations.length > 0 ? (
          <Section
            id="education"
            ref={setRef("education")}
            title="Educación"
            icon={<GraduationCap size={16} aria-hidden="true" />}
          >
            <ol className="space-y-4">
              {resume.educations.map((edu, i) => (
                <li key={i} className="border-l-2 border-border pl-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {edu.title} <span className="text-muted">·</span> {edu.institute}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {edu.startDate} — {edu.keepStudy ? "Actualmente" : edu.endDate}
                  </p>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        {resume.skills.length > 0 ? (
          <Section
            id="skills"
            ref={setRef("skills")}
            title="Habilidades"
            icon={<Sparkles size={16} aria-hidden="true" />}
          >
            <ul className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {resume.languages.length > 0 ? (
          <Section
            id="languages"
            ref={setRef("languages")}
            title="Idiomas"
            icon={<Languages size={16} aria-hidden="true" />}
          >
            <ul className="grid gap-1 sm:grid-cols-2">
              {resume.languages.map((lang) => (
                <li key={lang.id} className="text-sm text-secondary">
                  <span className="font-medium text-foreground">{lang.name}</span>
                  <span className="text-muted"> — {LanguageNameFactory.get(lang.level)}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </div>
    </article>
  );
};

const Section = React.forwardRef<
  HTMLElement,
  {
    id: SectionId;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }
>(({ id, title, icon, children }, ref) => (
  <section
    id={id}
    ref={ref as React.Ref<HTMLElement>}
    className="scroll-mt-28"
  >
    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
      {icon}
      {title}
    </h3>
    {children}
  </section>
));
Section.displayName = "Section";

const Empty: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="rounded-md border border-dashed border-border bg-surface-muted/40 px-3 py-2 text-sm text-muted">
    {children}
  </p>
);

export default ResumeView;
