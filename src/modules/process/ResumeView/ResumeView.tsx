import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import {
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { TResume } from "@app/@types/resume";
import { IApplicationApplicant } from "@app/@types/application";
import { LanguageNameFactory } from "@app/constants/resume.constant";

type Props = {
  resume: TResume;
  applicant: IApplicationApplicant;
  className?: string;
};

type SectionId =
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "knowledge"
  | "languages";

const iconClass = "shrink-0";

/** Nombre completo del aspirante; `lastName` es opcional en el backend. */
const fullName = (applicant: IApplicationApplicant) =>
  `${applicant.firstName ?? ""} ${applicant.lastName ?? ""}`.trim();

/** Une partes de una ubicación descartando las vacías. */
const joinLocation = (...parts: (string | null | undefined)[]) =>
  parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .join(", ");

/** Enum → texto legible: `PREFIERO_NO_DECIRLO` → `Prefiero no decirlo`. */
const humanizeEnum = (value: string | null | undefined) =>
  value ? value.replace(/_/g, " ").toLowerCase() : "";

/** Rango de fechas legible, o `null` si no hay nada que mostrar. */
const dateRange = (
  start: string | null | undefined,
  end: string | null | undefined,
  ongoing: boolean | undefined,
) => {
  if (!start && !end) return null;
  if (ongoing) return `${start ?? ""} — Actualmente`.trim();
  return `${start ?? ""} — ${end ?? ""}`.replace(/\s*—\s*$/, "").trim();
};

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/**
 * Renderiza la hoja de vida del postulante tal como la ve el reclutador.
 *
 * El título es el nombre del Glimepiride (no `resume.title`, que es un campo
 * de edición del prospecto). La información se ordena en contacto → datos
 * personales → hoja de vida por secciones, y **solo se muestran las secciones
 * que tienen datos**.
 */
export const ResumeView: React.FC<Props> = ({
  resume,
  applicant,
  className,
}) => {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  // Map of id → element so the IntersectionObserver can register each one.
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const experiences = resume.experiences ?? [];
  const educations = resume.educations ?? [];
  const skills = resume.skills ?? [];
  const knowledge = resume.knowledge ?? [];
  const languages = resume.languages ?? [];

  /**
   * Solo las secciones con datos. Se calcula antes de pintar para que el nav
   * y el observer coincidan con lo que realmente se ve en pantalla.
   */
  const sections = useMemo(() => {
    const all: { id: SectionId; label: string; icon: React.ReactNode }[] = [];
    if (resume.aboutMe?.trim())
      all.push({
        id: "about",
        label: "Sobre mí",
        icon: <User size={14} aria-hidden="true" />,
      });
    if (experiences.length > 0)
      all.push({
        id: "experience",
        label: "Experiencia",
        icon: <Briefcase size={14} aria-hidden="true" />,
      });
    if (educations.length > 0)
      all.push({
        id: "education",
        label: "Educación",
        icon: <GraduationCap size={14} aria-hidden="true" />,
      });
    if (skills.length > 0)
      all.push({
        id: "skills",
        label: "Habilidades",
        icon: <Sparkles size={14} aria-hidden="true" />,
      });
    if (knowledge.length > 0)
      all.push({
        id: "knowledge",
        label: "Conocimientos",
        icon: <Award size={14} aria-hidden="true" />,
      });
    if (languages.length > 0)
      all.push({
        id: "languages",
        label: "Idiomas",
        icon: <Languages size={14} aria-hidden="true" />,
      });
    return all;
  }, [resume.aboutMe, experiences.length, educations.length, skills.length, knowledge.length, languages.length]);

  useEffect(() => {
    setActiveId(sections[0]?.id ?? null);
  }, [sections]);

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

    Object.values(refs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const setRef = (id: SectionId) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  // --- Datos de contacto -------------------------------------------------
  const contact = [
    { icon: <Mail size={14} aria-hidden="true" />, value: applicant.email },
    { icon: <Phone size={14} aria-hidden="true" />, value: applicant.phoneNumber },
    { icon: <MapPin size={14} aria-hidden="true" />, value: applicant.direction },
  ].filter((item) => Boolean(item.value?.trim()));

  // --- Datos personales ---------------------------------------------------
  const birthPlace = joinLocation(
    applicant.countryOfBirth?.name,
    applicant.departmentOfBirth?.name,
    applicant.cityOfBirth?.name
  );
  const residence = joinLocation(
    applicant.countryOfResidence?.name,
    applicant.departmentOfResidence?.name,
    applicant.cityOfResidence?.name
  );

  const personal = [
    { label: "Identificación", value: applicant.identification },
    { label: "Fecha de nacimiento", value: applicant.birthDate },
    { label: "Sexo", value: humanizeEnum(applicant.sex) },
    { label: "Género", value: humanizeEnum(applicant.genre) },
    {
      label: "Orientación sexual",
      value: humanizeEnum(applicant.sexualOrientation),
    },
    { label: "Grupo étnico", value: humanizeEnum(applicant.ethnicGroup) },
    { label: "Lugar de nacimiento", value: birthPlace },
    { label: "Lugar de residencia", value: residence },
    {
      label: "Aspiración salarial",
      value:
        applicant.salaryAspiration != null
          ? currency.format(applicant.salaryAspiration)
          : null,
    },
    {
      label: "Modalidad de trabajo",
      value: resume.workModality ?? null,
    },
  ].filter((item) => Boolean(item.value?.trim()));

  const hasContact = contact.length > 0;
  const hasPersonal = personal.length > 0;

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
            {fullName(applicant)}
          </h2>
          {resume.workModality ? (
            <p className="mt-1 text-sm text-secondary">
              Modalidad: {resume.workModality}
            </p>
          ) : null}
        </div>
      </header>

      {hasContact || hasPersonal ? (
        <div className="space-y-6 border-b border-border px-6 py-6">
          {hasContact ? (
            <section aria-labelledby="resume-contact">
              <h3
                id="resume-contact"
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
              >
                Información de contacto
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {contact.map((item) => (
                  <li
                    key={item.value}
                    className="flex items-center gap-2 text-sm text-secondary"
                  >
                    <span className={classNames(iconClass, "text-muted")}>
                      {item.icon}
                    </span>
                    <span className="break-all">{item.value}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {hasPersonal ? (
            <section aria-labelledby="resume-personal">
              <h3
                id="resume-personal"
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted"
              >
                Información personal
              </h3>
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {personal.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline gap-2 text-sm"
                  >
                    <dt className="shrink-0 text-muted">{item.label}:</dt>
                    <dd className="min-w-0 break-words font-medium text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </div>
      ) : null}

      {sections.length > 0 ? (
        <nav
          aria-label="Secciones de la hoja de vida"
          className="sticky top-16 z-10 border-b border-border bg-surface/95 px-6 py-2 backdrop-blur supports-[backdrop-filter]:bg-surface/80"
        >
          <ul className="flex flex-wrap gap-1">
            {sections.map(({ id, label, icon }) => (
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
      ) : null}

      <div className="space-y-8 p-6">
        {sections.length === 0 ? (
          <p className="rounded-md border border-dashed border-border bg-surface-muted/40 px-3 py-2 text-sm text-muted">
            Este postulante aún no ha diligenciado información en su hoja de vida.
          </p>
        ) : null}

        {resume.aboutMe?.trim() ? (
          <Section
            id="about"
            ref={setRef("about")}
            title="Sobre mí"
            icon={<User size={16} aria-hidden="true" />}
          >
            <p className="whitespace-pre-line text-secondary">
              {resume.aboutMe}
            </p>
          </Section>
        ) : null}

        {experiences.length > 0 ? (
          <Section
            id="experience"
            ref={setRef("experience")}
            title="Experiencia laboral"
            icon={<Briefcase size={16} aria-hidden="true" />}
          >
            <ol className="space-y-5">
              {experiences.map((exp, i) => {
                const period = dateRange(
                  exp.startDate,
                  exp.endDate,
                  exp.keepWorking
                );
                const location = joinLocation(
                  exp.country?.name,
                  exp.department?.name,
                  exp.city?.name
                );
                return (
                  <li key={exp.id ?? i} className="border-l-2 border-border pl-4">
                    <h3 className="text-base font-semibold text-foreground">
                      {exp.rol} <span className="text-muted">·</span>{" "}
                      {exp.company}
                    </h3>
                    {period ? (
                      <p className="mt-0.5 text-xs text-muted">{period}</p>
                    ) : null}
                    {location ? (
                      <p className="mt-0.5 text-xs text-muted">{location}</p>
                    ) : null}
                    {exp.description ? (
                      <p className="mt-2 whitespace-pre-line text-secondary">
                        {exp.description}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </Section>
        ) : null}

        {educations.length > 0 ? (
          <Section
            id="education"
            ref={setRef("education")}
            title="Educación"
            icon={<GraduationCap size={16} aria-hidden="true" />}
          >
            <ol className="space-y-4">
              {educations.map((edu, i) => {
                const period = dateRange(
                  edu.startDate,
                  edu.endDate,
                  edu.keepStudy
                );
                return (
                  <li key={edu.id ?? i} className="border-l-2 border-border pl-4">
                    <h3 className="text-base font-semibold text-foreground">
                      {edu.title} <span className="text-muted">·</span>{" "}
                      {edu.institute}
                    </h3>
                    {edu.programName ? (
                      <p className="mt-0.5 text-sm text-secondary">
                        {edu.programName}
                      </p>
                    ) : null}
                    <p className="mt-0.5 text-xs text-muted">
                      {[
                        period,
                        humanizeEnum(edu.educationLevel),
                        edu.country?.name,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </li>
                );
              })}
            </ol>
          </Section>
        ) : null}

        {skills.length > 0 ? (
          <Section
            id="skills"
            ref={setRef("skills")}
            title="Habilidades"
            icon={<Sparkles size={16} aria-hidden="true" />}
          >
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <li
                  key={skill.id ?? i}
                  className="rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {knowledge.length > 0 ? (
          <Section
            id="knowledge"
            ref={setRef("knowledge")}
            title="Conocimientos"
            icon={<Award size={16} aria-hidden="true" />}
          >
            <ul className="flex flex-wrap gap-2">
              {knowledge.map((item, i) => (
                <li
                  key={item.id ?? i}
                  className="rounded-full border border-border bg-surface-muted/60 px-3 py-1 text-sm font-medium text-secondary"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {languages.length > 0 ? (
          <Section
            id="languages"
            ref={setRef("languages")}
            title="Idiomas"
            icon={<Languages size={16} aria-hidden="true" />}
          >
            <ul className="grid gap-1 sm:grid-cols-2">
              {languages.map((lang, i) => (
                <li key={lang.id ?? i} className="text-sm text-secondary">
                  <span className="font-medium text-foreground">
                    {lang.name}
                  </span>
                  <span className="text-muted">
                    {" "}
                    — {LanguageNameFactory.get(lang.level) ?? "—"}
                  </span>
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
  <section id={id} ref={ref as React.Ref<HTMLElement>} className="scroll-mt-28">
    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
      {icon}
      {title}
    </h3>
    {children}
  </section>
));
Section.displayName = "Section";

export default ResumeView;