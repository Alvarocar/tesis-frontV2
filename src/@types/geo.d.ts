export type TCountryOption = {
  id: number;
  name: string;
  code: string;
};

export type TDepartmentOption = {
  id: number;
  name: string;
  code: string;
  countryId: number;
};

export type TCityOption = {
  id: number;
  name: string;
  type?: string | null;
  countryId: number;
  departmentId: number;
};

/**
 * Geo reducido para vistas de solo lectura (detalle de postulación).
 * El backend proyecta únicamente `id` y `name` porque el resto no se renderiza.
 */
export type TGeoName = {
  id: number;
  name: string;
};
