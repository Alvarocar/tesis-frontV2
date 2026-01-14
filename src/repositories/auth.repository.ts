import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { addToken } from "@app/decorators/repository.decorator";
import { IApplicationDetail } from "@app/@types/application";

class AuthRepository extends BaseRepository {
  
  constructor() {
    super(ENV.API_HOST, '/v1/auth')
  }
  
  signin(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in', payload);
  }

  signInEmployee(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in/employee', payload);
  }
}

export default new AuthRepository();