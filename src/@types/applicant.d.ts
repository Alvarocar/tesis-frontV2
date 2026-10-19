import { ECountry } from "@app/enums/country.enum";
import { ESex } from "@app/enums/sex.enum";
import { EGender } from "@app/enums/gender.enum";
import { ESexualOrientation } from "@app/enums/sexual-orientation.enum";
import { EEthnicGroup } from "@app/enums/ethnic-group.enum";

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
  // Phase 0 — SPE personal data fields (additive, all optional)
  countryOfBirth?: ECountry | null;
  departmentOfBirth?: string | null;
  cityOfBirth?: string | null;
  countryOfResidence?: ECountry | null;
  departmentOfResidence?: string | null;
  cityOfResidence?: string | null;
  sex?: ESex | null;
  genre?: EGender | null;
  sexualOrientation?: ESexualOrientation | null;
  ethnicGroup?: EEthnicGroup | null;
  salaryAspiration?: number | null;
}

export namespace ICandidate {
  export type SignupPayload = Pick<ICandidate, 'email' | 'firstName' | 'lastName' | 'password'>;
  export type SigninPayload = Pick<ICandidate, 'email' | 'password'>;
  export type PersonalInfo = Pick<ICandidate, 'firstName' | 'lastName' | 'identification' | 'phoneNumber' | 'birthDate' | 'direction'>;
}