import type { TResume } from "@app/@types/resume";
import type { TCountryOption } from "@app/@types/geo";
import type { EEducationLevel } from "@app/enums/education-level.enum";

/**
 * Estado del formulario de educación.
 *
 * `country` es un objeto completo (no un id) para que el `<select>` pueda
 * mostrar el nombre sin depender del catálogo cargado. El adapter lo
 * traduce a `countryId` para la API.
 */
export type StudyFormData = {
  id?: number;
  institute: string;
  title: string;
  keepStudy: boolean;
  startDate: Date;
  endDate: Date;
  educationLevel?: EEducationLevel | null;
  programName?: string | null;
  country: TCountryOption | null;
};

/**
 * Normaliza un registro existente a valores iniciales del formulario.
 * La API devuelve `countryId`; el formulario trabaja con el objeto.
 */
export const toStudyFormDefaults = (
  study?: TResume.IEducation,
  countries: TCountryOption[] = [],
): Partial<StudyFormData> => {
  const countryId = study?.country?.id;

  return {
    id: study?.id,
    institute: study?.institute ?? '',
    title: study?.title ?? '',
    keepStudy: study?.keepStudy ?? false,
    educationLevel: study?.educationLevel ?? null,
    programName: study?.programName ?? null,
    // Resolvemos el país contra el catálogo para no dejar el select en blanco.
    country: countries.find((country) => country.id === countryId) ?? null,
  };
};

/**
 * Traduce el estado del formulario al payload de la API.
 *
 * Solo viajan los ids planos: la API persiste FKs, no objetos. El objeto
 * geo se usa unicamente para el estado del formulario y para hidratar el
 * select cuando edita. `educationLevel` viaja como string del enum.
 */
export const toEducationPayload = (
  data: Omit<StudyFormData, 'country' | 'startDate' | 'endDate'>,
  dates: { startDate: string; endDate?: string | null },
  country: TCountryOption | null,
): TResume.IEducation & { countryId: number | null } => ({
  id: data.id,
  institute: data.institute,
  title: data.title,
  keepStudy: data.keepStudy,
  startDate: dates.startDate,
  endDate: dates.endDate,
  educationLevel: data.educationLevel ?? undefined,
  programName: data.programName ?? undefined,
  countryId: country?.id ?? null,
});