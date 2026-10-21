import { Skeleton } from "@app/components/ui/skeleton";
import { Button } from "@app/components/ui/button";

/**
 * Skeleton mirror of <PersonalInfoForm />.
 *
 * Same shape and proportions as the real form so the layout doesn't jump
 * when data arrives (legend + 2-col grid + geo card + demographics row +
 * submit button). The geo block — país / departamento / ciudad for both
 * nacimiento and residencia — is what blocks visible render the longest
 * because it depends on `useCountries` resolving, so we keep that card
 * identical in size to the real one.
 *
 * Heights match the real components where it matters: `h-9` for inputs
 * and selects (mirrors SelectTrigger / InputField), `h-4` for labels,
 * `h-5` for the legend.
 */
const PersonalInfoSkeleton = () => (
  <div aria-busy="true" aria-live="polite">
    <Skeleton className="h-5 w-56" />

    <fieldset className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
      {/* Row 1: firstName / lastName */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full" />
      </div>

      {/* Row 2: identification / phoneNumber */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-full" />
      </div>

      {/* Row 3: birthDate / salaryAspiration */}
      <div className="flex col-span-2 gap-6">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-9 w-48" />
        </div>
      </div>

      <Skeleton className="h-9 w-full" />

      {/* Geo card: país / depto / ciudad × {birth, residence} */}
      <div className="col-span-2 grid grid-cols-2 gap-6 rounded border p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>

      {/* Demographics: sex / genre / orientation / ethnicGroup */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-full" />
      </div>
    </fieldset>

    <Skeleton className="mt-5 h-9 w-24" />
  </div>
);

/**
 * Visual placeholder for the submit button so the footer alignment matches
 * the real form once it renders. We use a disabled `<Button>` rather than
 * a Skeleton so screen readers announce "Guardar (disabled)" instead of
 * reading nothing — better UX during the brief loading window.
 */
export const PersonalInfoSkeletonSubmitButton = () => (
  <Button className="mt-5" type="submit" disabled aria-hidden="true">
    Guardar
  </Button>
);

export default PersonalInfoSkeleton;
