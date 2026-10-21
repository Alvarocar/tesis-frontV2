import useSWR from "swr";
import geoRepository, { geoKeys } from "@app/repositories/geo.repository";
import type { TCityOption, TCountryOption, TDepartmentOption } from "@app/@types/geo";

/**
 * SWR config compartida por el catálogo geo.
 *
 * - `revalidateOnFocus: false`: la lista de países/departamentos/ciudades
 *   cambia muy pocas veces. Revalidar en cada foco de ventana genera
 *   requests sin valor y, en cascada, puede resetear un select que el
 *   usuario ya eligió.
 * - `shouldRetryOnError: false`: si geo falla, no tiene sentido reintentar
 *   en loop; el formulario muestra el estado vacío y el usuario reintenta
 *   al cambiar de selección.
 */
const GEO_SWR_CONFIG = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  keepPreviousData: false,
} as const;

/**
 * Países. Lista plana, se pide una sola vez.
 */
export const useCountries = () =>
  useSWR<TCountryOption[]>(geoKeys.countries(), geoRepository.getCountries.bind(geoRepository), GEO_SWR_CONFIG);

/**
 * Departamentos de un país.
 *
 * `countryId` null desactiva la request (key falsy) en vez de pedir la lista
 * completa: en cascada no tiene sentido traer 4739 departamentos hasta que
 * el usuario elija país.
 */
export const useDepartments = (countryId: number | null | undefined) =>
  useSWR<TDepartmentOption[]>(
    countryId ? geoKeys.departments(countryId) : null,
    ([, countryId]) => geoRepository.getDepartments(countryId as number),
    GEO_SWR_CONFIG,
  );

/**
 * Ciudades de un departamento.
 *
 * Misma regla que `useDepartments`: sin `departmentId` no se pide nada.
 */
export const useCities = (departmentId: number | null | undefined) =>
  useSWR<TCityOption[]>(
    departmentId ? geoKeys.cities(departmentId) : null,
    ([, departmentId]) => geoRepository.getCities(departmentId as number),
    GEO_SWR_CONFIG,
  );