import classNames from "classnames";
import { useLayoutEffect, useState } from "react";
import { ArrowRight, Edit } from "lucide-react";
import { Buildings, Clock } from "iconsax-react";
import { useLocation } from "wouter";
import { Link } from "@app/modules/common/router/Link";
import { TJobPreview } from "@app/@types/jobs";
import { withViewTransition } from "@app/util/viewTransition";
import { consumeLastViewedJob } from "@app/util/viewTransition/jobTransition";

type Props = {
  className?: string;
  job: TJobPreview;
};

const currencyFormat = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const JobCard: React.FC<Props> = ({ className, job }) => {
  const [, navigate] = useLocation();
  const titleId = `job-title-${job.id}`;

  // View Transitions require a unique `view-transition-name` per pair. We
  // pair the card with the corresponding hero block on the detail page.
  // On the way back (detail → list) the marker we left in sessionStorage
  // tells us which card to re-tag so the browser can pair the snapshots.
  const [transitionName, setTransitionName] = useState<string | null>(null);

  useLayoutEffect(() => {
    const lastId = consumeLastViewedJob();
    if (lastId === job.id) {
      setTransitionName(`job-card-${job.id}`);
      // Clear it after a frame so the next navigation can re-arm the marker.
      requestAnimationFrame(() => setTransitionName(null));
    }
  }, [job.id]);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Defer to the browser for modifier clicks, new-tab opens, etc.
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
    withViewTransition(() => navigate(`/empleo/${job.id}`));
  };

  return (
    <article
      style={transitionName ? { viewTransitionName: transitionName } : undefined}
      className={classNames(
        "group relative flex w-80 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        "transition-[transform,box-shadow] duration-150 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg",
        className
      )}
    >
      {job.editable ? (
        <Link
          to={`/vacante/${job.id}`}
          aria-label={`Editar vacante ${job.title}`}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-secondary opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Edit size={14} aria-hidden="true" />
        </Link>
      ) : null}

      {/* Whole card is clickable, but the title region owns the link's label
          so screen readers announce it instead of the surrounding "card". */}
      <Link
        href={`/empleo/${job.id}`}
        onClick={handleNavigate}
        aria-labelledby={titleId}
        className="flex h-full flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {job.company}
        </p>
        <h3 id={titleId} className="mt-1 text-lg font-semibold leading-snug text-foreground">
          {job.title}
        </h3>

        <div className="mt-5 rounded-lg border border-border bg-surface-muted px-3 py-2.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            Salario
          </p>
          <p className="mt-0.5 text-lg font-semibold leading-none text-foreground">
            {job.salaryOffer ? (
              currencyFormat.format(job.salaryOffer)
            ) : (
              <span className="text-sm font-medium text-secondary">A convenir</span>
            )}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Buildings size={18} variant="Bulk" className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="text-xs text-muted">Empresa</dt>
              <dd className="truncate text-foreground">{job.company}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={18} variant="Bulk" className="mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="text-xs text-muted">Jornada</dt>
              <dd className="truncate text-foreground">{job.jobType}</dd>
            </div>
          </div>
        </dl>

        <span
          className="mt-auto inline-flex items-center justify-center gap-1.5 pt-5 text-sm font-medium text-brand"
          aria-hidden="true"
        >
          Ver oferta
          <ArrowRight size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
        </span>
      </Link>
    </article>
  );
};

export default JobCard;
