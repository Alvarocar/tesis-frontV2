import type { TResume } from "@app/@types/resume";
import type { TCityOption, TCountryOption, TDepartmentOption } from "@app/@types/geo";

/**
 * Estado del formulario de experiencia.
 *
 * Los tres niveles geo se guardan como objetos completos (no ids) para que
 * cada `<select>` pueda renderizar el nombre sin depender del catálogo.
 * El adapter traduce a `countryId`/`departmentId`/`cityId` para la API.
 */
export type ExperienceFormData = {
  id?: number;
  rol: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  keepWorking: boolean;
  description: string;
  country: TCountryOption | null;
  department: TDepartmentOption | null;
  city: TCityOption | null;
};

/**
 * Normaliza un registro existente a valores iniciales del formulario.
 *
 * La API devuelve ids (`countryId`, `departmentId`, `cityId`); el formulario
 * trabaja con objetos. Resolvemos contra los catálogos cargados para que los
 * selects queden preseleccionados al editar.
 */
export const toExperienceFormDefaults = (
  experience?: TResume.IExperience,
  catalogs: {
    countries?: TCountryOption[];
    departments?: TDepartmentOption[];
    cities?: TCityOption[];
  } = {},
): Partial<ExperienceFormData> => {
  const { countries = [], departments = [], cities = [] } = catalogs;

  const country = countries.find((c) => c.id === experience?.country?.id) ?? null;
  const department =
    departments.find((d) => d.id === experience?.department?.id) ?? null;
  const city = cities.find((c) => c.id === experience?.city?.id) ?? null;

  return {
    id: experience?.id,
    company: experience?.company ?? '',
    description: experience?.description ?? '',
    rol: experience?.rol ?? '',
    keepWorking: experience?.keepWorking ?? false,
    country,
    department,
    city,
  };
};

/**
 * Traduce el estado del formulario al payload de la API.
 *
 * Solo viajan los ids planos: la API persiste FKs, no objetos. Los objetos
 * geo se usan unicamente para el estado del formulario y para hidratar los
 * selects cuando edita.
 */
export const toExperiencePayload = (
  data: Omit<ExperienceFormData, 'country' | 'department' | 'city' | 'startDate' | 'endDate'>,
  dates: { startDate: string; endDate?: string | null },
  geo: {
    country: TCountryOption | null;
    department: TDepartmentOption | null;
    city: TCityOption | null;
  },
): TResume.IExperience & {
  countryId: number | null;
  departmentId: number | null;
  cityId: number | null;
} => ({
  id: data.id,
  company: data.company,
  description: data.description,
  rol: data.rol,
  keepWorking: data.keepWorking,
  startDate: dates.startDate,
  endDate: dates.endDate,
  countryId: geo.country?.id ?? null,
  departmentId: geo.department?.id ?? null,
  cityId: geo.city?.id ?? null,
});