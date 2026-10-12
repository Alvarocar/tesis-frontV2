import JobCardSkeleton from "./JobCardSkeleton";

type Props = {
  count?: number;
  className?: string;
};

/**
 * Grid-shaped skeleton used while the jobs list is loading.
 * Renders `count` cards in the same auto-fill grid as the real list, so
 * there's no layout shift when the data arrives.
 */
const JobGridSkeleton: React.FC<Props> = ({ count = 6, className }) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Cargando ofertas"
    className={
      "mx-auto grid min-h-[70vh] max-w-7xl grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-center gap-x-5 gap-y-8 px-4 py-10 sm:px-6 " +
      (className ?? "")
    }
  >
    <span className="sr-only">Cargando ofertas</span>
    {Array.from({ length: count }).map((_, i) => (
      <JobCardSkeleton key={i} className="justify-self-center" />
    ))}
  </div>
);

export default JobGridSkeleton;
