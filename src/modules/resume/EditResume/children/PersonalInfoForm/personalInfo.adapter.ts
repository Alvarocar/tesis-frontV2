import { formatDate } from '@app/util/date/dateParser.util';
import type { PersonalInfoFormData } from './usePersonalInfoFormData';

export type UpdateApplicantPayload = {
  firstName: string;
  lastName: string;
  identification: string;
  phoneNumber: string;
  birthDate: string;
  direction: string;
  countryOfBirthId?: number | null;
  departmentOfBirthId?: number | null;
  cityOfBirthId?: number | null;
  countryOfResidenceId?: number | null;
  departmentOfResidenceId?: number | null;
  cityOfResidenceId?: number | null;
  sex?: string | null;
  genre?: string | null;
  sexualOrientation?: string | null;
  ethnicGroup?: string | null;
  salaryAspiration?: number | null;
};

export const toApplicantPersonalInfoPayload = (
  data: PersonalInfoFormData,
): UpdateApplicantPayload => ({
  firstName: data.firstName,
  lastName: data.lastName,
  identification: data.identification,
  phoneNumber: data.phoneNumber,
  birthDate: formatDate(data.birthDate)!,
  direction: data.direction,
  countryOfBirthId: data.countryOfBirth?.id ?? null,
  departmentOfBirthId: data.departmentOfBirth?.id ?? null,
  cityOfBirthId: data.cityOfBirth?.id ?? null,
  countryOfResidenceId: data.countryOfResidence?.id ?? null,
  departmentOfResidenceId: data.departmentOfResidence?.id ?? null,
  cityOfResidenceId: data.cityOfResidence?.id ?? null,
  sex: data.sex ?? null,
  genre: data.genre ?? null,
  sexualOrientation: data.sexualOrientation ?? null,
  ethnicGroup: data.ethnicGroup ?? null,
  salaryAspiration: data.salaryAspiration ?? null,
});
