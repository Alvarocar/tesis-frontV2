import classNames from "classnames";
import { Sparkles } from "lucide-react";

type Props = {
  /** 0–100. Numbers outside the range are clamped for the bar fill. */
  affinity: number;
  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

/**
 * Big-number affinity card with a thin progress bar underneath. Color
 * shifts with the score: red < 60, amber 60–79, green ≥ 80.
 *
 * Kept dumb on purpose: the parent supplies the number. No fetch, no
 * derived "fortalezas / a mejorar" parsing — that's a separate concern.
 */
const AffinityScore: React.FC<Props> = ({ affinity, className }) => {
  const safe = clamp(Number.isFinite(affinity) ? affinity : 0, 0, 100);
  const tone =
    safe < 60 ? "danger" : safe < 80 ? "warning" : "success";

  const toneClasses: Record<typeof tone, { text: string; bar: string; label: string }> = {
    danger: {
      text: "text-danger",
      bar: "bg-danger",
      label: "Afinidad baja",
    },
    warning: {
      text: "text-warning",
      bar: "bg-warning",
      label: "Afinidad media",
    },
    success: {
      text: "text-success",
      bar: "bg-success",
      label: "Afinidad alta",
    },
  };
  const t = toneClasses[tone];

  return (
    <section
      role="group"
      aria-label="Puntaje de afinidad"
      className={classNames(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-surface p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
        <Sparkles size={14} aria-hidden="true" />
        <span>{t.label}</span>
      </div>

      <p
        className={classNames(
          "mt-2 text-5xl font-semibold leading-none tabular-nums",
          t.text
        )}
        aria-label={`${safe} por ciento de afinidad`}
      >
        {safe}
        <span className="ml-1 text-2xl font-medium text-muted" aria-hidden="true">
          %
        </span>
      </p>

      <div
        className="mt-5 h-1.5 w-full max-w-[16rem] overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Porcentaje de afinidad"
      >
        <div
          className={classNames("h-full rounded-full transition-[width] duration-500 motion-safe:animate-[bar-grow_600ms_ease-out]", t.bar)}
          style={{ width: `${safe}%` }}
        />
      </div>
    </section>
  );
};

export default AffinityScore;
