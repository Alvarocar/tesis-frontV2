export interface ICandidate {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  creation_date: string;
  modification_date: string;
  token: string;
  birth_date: string;
  direction: string;
  identification: number;
  phone_number: string;
}

export namespace ICandidate {
  export type SignupPayload = Pick<ICandidate, 'email' | 'firstName' | 'lastName' | 'password'>;
  export type SigninPayload = Pick<ICandidate, 'email' | 'password'>;
  export type PersonalInfoPayload = Pick<ICandidate, 'name' | 'identification' | 'phone_number' | 'birth_date' | 'direction'>;
}