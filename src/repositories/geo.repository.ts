import { ENV } from '@app/constants';
import BaseRepository from './base.repository';
import { addToken } from '@app/decorators/repository.decorator';
import type { TCityOption, TCountryOption, TDepartmentOption } from '@app/@types/geo';

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
