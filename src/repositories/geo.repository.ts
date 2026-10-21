import { ENV } from '@app/constants';
import BaseRepository from './base.repository';
import { addToken } from '@app/decorators/repository.decorator';
import type { TCityOption, TCountryOption, TDepartmentOption } from '@app/@types/geo';

/**
 * Claves de SWR para el catálogo geo.
 *
 * Al vivir acá (y no dentro de cada componente) garantizamos que todos los
 * que piden el mismo recurso compartan la misma identidad de caché, así que
 * SWR deduplica: dos selects de `departments(48)` en pantallas distintas
 * generan una sola request.
 *
 * Regla: los id van como segmento propio de la key, nunca interpolados en
 * un string. `['geo/cities', 4921]` cachea por departamento; si el día de
 * mañana se agrega `countryId` al filtro, la key cambia y no se sirve stale.
 */
export const geoKeys = {
  countries: () => ['geo/countries'] as const,
  departments: (countryId: number) => ['geo/departments', countryId] as const,
  cities: (departmentId: number) => ['geo/cities', departmentId] as const,
};

class GeoRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/geo');
  }

  @addToken()
  getCountries() {
    return this.get<TCountryOption[]>('/countries');
  }

  @addToken()
  getDepartments(countryId?: number) {
    const query = countryId ? `?countryId=${countryId}` : '';
    return this.get<TDepartmentOption[]>(`/departments${query}`);
  }

  @addToken()
  getCities(departmentId?: number) {
    const query = departmentId ? `?departmentId=${departmentId}` : '';
    return this.get<TCityOption[]>(`/cities${query}`);
  }
}

export default new GeoRepository();
