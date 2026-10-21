import { TResume } from "./resume";
import { TJob } from "./jobs";
import { EEducationLevel } from "@app/enums/education-level.enum";
import { VacantJobType } from "@app/enums/vacant.enum";
import type { TGeoName } from "@app/@types/geo";
import type {
  EGender,
  EEthnicGroup,
  ESex,
  ESexualOrientation,
} from "@app/enums";

/**
 * Aspirante tal como lo ve el reclutador en el detalle de una postulación.
 *
 * Es una proyección de solo lectura: el backend NO envía `password`,
 * `invitationToken`, `invitationTokenExpires` ni `isActive` porque son datos
 * de autenticación y no de hoja de vida.
 */
export interface IApplicationApplicant {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  direction: string | null;
  identification: string | null;
  birthDate: string | null;
  sex: ESex | null;
  genre: EGender | null;
  sexualOrientation: ESexualOrientation | null;
  ethnicGroup: EEthnicGroup | null;
  salaryAspiration: number | null;
  countryOfBirth: TGeoName | null;
  departmentOfBirth: TGeoName | null;
  cityOfBirth: TGeoName | null;
  countryOfResidence: TGeoName | null;
  departmentOfResidence: TGeoName | null;
  cityOfResidence: TGeoName | null;
}

export interface IApplicationDetail {
  id: number;
  feedBack: string;
  affinity: number;
  creationDate: string;
  applicant: IApplicationApplicant;
  resume: TResume;
  vacancy: TJob;
}

export type { EEducationLevel, VacantJobType };