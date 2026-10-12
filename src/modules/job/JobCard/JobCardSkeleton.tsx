import classNames from "classnames";

type Props = {
  className?: string;
};

/**
 * Skeleton mirror of <JobCard />. Same dimensions and proportions so the
 * grid doesn't reflow when real data arrives.
 *
 * `aria-hidden` because the whole grid is wrapped in a `role="status"`
 * region by the consumer; we don't want every skeleton announcing itself.
 */
const JobCardSkeleton: React.FC<Props> = ({ className }) => (
  <article
    aria-hidden="true"
    className={classNames(
      "flex h-full w-80 flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm",
      className
    )}
  >
    <div className="h-3 w-24 rounded skeleton" />
    <div className="h-5 w-3/4 rounded skeleton" />

    <div className="mt-1 space-y-2 rounded-lg border border-border bg-surface-muted p-3">
      <div className="h-2.5 w-12 rounded skeleton" />
      <div className="h-5 w-32 rounded skeleton" />
    </div>

    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="h-[18px] w-[18px] shrink-0 rounded skeleton" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-2.5 w-10 rounded skeleton" />
            <div className="h-4 w-full rounded skeleton" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto h-4 w-20 self-center rounded skeleton" />
  </article>
);

export default JobCardSkeleton;
