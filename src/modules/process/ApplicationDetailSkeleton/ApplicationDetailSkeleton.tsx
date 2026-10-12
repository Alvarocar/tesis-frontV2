import classNames from "classnames";

/**
 * Page-shaped skeleton for the application detail view. Mirrors the actual
 * layout (vacancy context card → feedback+affinity grid → resume) so the
 * page doesn't reflow when data arrives.
 */
const ApplicationDetailSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Cargando postulación"
    className={classNames(
      "mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6",
      className
    )}
  >
    <span className="sr-only">Cargando postulación</span>

    {/* Back link placeholder */}
    <div className="h-4 w-32 rounded skeleton" />

    {/* Vacancy context */}
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-24 rounded skeleton" />
          <div className="h-6 w-3/4 rounded skeleton" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="h-4 w-4 shrink-0 rounded skeleton" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="h-2.5 w-10 rounded skeleton" />
              <div className="h-4 w-full rounded skeleton" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end border-t border-border pt-4">
        <div className="h-4 w-40 rounded skeleton" />
      </div>
    </div>

    {/* Feedback + Affinity */}
    <section className="grid gap-4 lg:grid-cols-[minmax(0,_1fr)_18rem]">
      <div className="space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="h-6 w-1/2 rounded skeleton" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded skeleton"
              style={{ width: `${85 - i * 7}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="h-3 w-28 rounded skeleton" />
        <div className="h-12 w-24 rounded skeleton" />
        <div className="h-1.5 w-full max-w-[16rem] rounded-full skeleton" />
      </div>
    </section>

    {/* Resume */}
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-surface-muted/40 px-6 py-5">
        <div className="h-3 w-20 rounded skeleton" />
        <div className="mt-2 h-7 w-1/2 rounded skeleton" />
        <div className="mt-2 h-3 w-1/3 rounded skeleton" />
      </div>
      <div className="border-b border-border bg-surface/95 px-6 py-3">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-7 w-20 rounded-md skeleton" />
          ))}
        </div>
      </div>
      <div className="space-y-8 p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-3 w-32 rounded skeleton" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded skeleton" />
              <div className="h-4 w-5/6 rounded skeleton" />
              <div className="h-4 w-4/6 rounded skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ApplicationDetailSkeleton;
