import classNames from "classnames";
import { ArrowUpRight, Building2, Clock, DollarSign, Edit } from "lucide-react";
import { Link } from "@app/modules/common/router/Link";
import { TJob } from "@app/@types/jobs";
import { withViewTransition } from "@app/util/viewTransition";

type Props = {
  vacancy: TJob;
  className?: string;
};

const currencyFormat = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const formatExperience = (years?: number | null) => {
  if (years == null || years === 0) return null;
  if (years === 1) return "1 año de experiencia";
  return `${years} años de experiencia`;
};

/**
 * Compact context card for the vacancy. Renders the bits a recruiter needs
 * to keep in mind while reading the AI feedback and the candidate's resume:
 * title, company, salary, contract type, experience, and a deep-link to the
 * full vacancy detail.
 */
const VacancyContext: React.FC<Props> = ({ vacancy, className }) => {
  const openDetail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Defer to the browser for modifier clicks.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    withViewTransition(() => {
      window.location.assign(`/empleo/${vacancy.id}`);
    });
  };

  return (
    <section
      aria-labelledby={`vacancy-context-title-${vacancy.id}`}
      className={classNames(
        "rounded-xl border border-border bg-surface p-5 shadow-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {vacancy.company}
          </p>
          <h2
            id={`vacancy-context-title-${vacancy.id}`}
            className="mt-1 text-xl font-semibold leading-snug text-foreground"
          >
            {vacancy.title}
          </h2>
        </div>

        {vacancy.editable ? (
          <Link
            to={`/vacante/${vacancy.id}`}
            aria-label={`Editar vacante ${vacancy.title}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Edit size={14} aria-hidden="true" />
            Editar
          </Link>
        ) : null}
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Meta
          icon={<DollarSign size={16} aria-hidden="true" />}
          label="Salario"
          value={
            vacancy.salaryOffer
              ? currencyFormat.format(vacancy.salaryOffer)
              : "A convenir"
          }
        />
        <Meta
          icon={<Clock size={16} aria-hidden="true" />}
          label="Jornada"
          value={vacancy.jobType || "No especificada"}
        />
        {(() => {
          const experience = formatExperience(vacancy.experienceYears);
          return experience ? (
            <Meta
              icon={<Building2 size={16} aria-hidden="true" />}
              label="Experiencia"
              value={experience}
            />
          ) : null;
        })()}
      </dl>

      <div className="mt-5 flex justify-end border-t border-border pt-4">
        <a
          href={`/empleo/${vacancy.id}`}
          onClick={openDetail}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          Ver vacante completa
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

const Meta: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="mt-0.5 shrink-0 text-secondary">{icon}</span>
    <div className="min-w-0">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="truncate text-sm font-medium text-foreground">{value}</dd>
    </div>
  </div>
);

export default VacancyContext;
