import { ENV } from "@app/constants";
import { TLanguage } from "@app/@types/resume";
import BaseRepository from "./base.repository";

class LanguagesRepository extends BaseRepository {
  constructor() {
    super(ENV.API_HOST, '/v1/language')
  }

  getAll() {
    return this.get<TLanguage[]>('');
  }
}

export default new LanguagesRepository();
