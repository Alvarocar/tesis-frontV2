import { ENV } from "@app/constants";
import BaseRepository from "./base.repository";
import { addToken } from "@app/decorators/repository.decorator";

class AuthRepository extends BaseRepository {
  
  constructor() {
    super(ENV.API_HOST, '/v1/auth')
  }

  signup(payload: { firstName: string, lastName: string, email: string, password: string }) {
    return this.post<{ data: { token: string } }, { firstName: string, lastName: string, email: string, password: string }>('/sign-up', payload);
  }
  
  signin(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in', payload);
  }

  signInEmployee(payload: { email: string, password: string }) {
    return this.put<{ data: { token: string } }, { email: string, password: string }>('/sign-in/employee', payload);
  }

  @addToken()
  check() {
    return this.get('/check');
  }
}

export default new AuthRepository();