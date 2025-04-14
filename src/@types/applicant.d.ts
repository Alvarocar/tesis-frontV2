export interface ICandidate {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  creationDate: string;
  modificationDate: string;
  token: string;
  birthDate: string;
  direction: string;
  identification: number;
  identificationType: string;
  phoneNumber: string;
}

export namespace ICandidate {
  export type SignupPayload = Pick<ICandidate, 'email' | 'firstName' | 'lastName' | 'password'>;
  export type SigninPayload = Pick<ICandidate, 'email' | 'password'>;
  export type PersonalInfo = Pick<ICandidate, 'firstName' | 'lastName' | 'identification' | 'phoneNumber' | 'birthDate' | 'direction'>
}