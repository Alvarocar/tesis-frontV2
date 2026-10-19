import { ICandidate } from '@app/@types/applicant';
import type { TCityOption, TCountryOption, TDepartmentOption } from '@app/@types/geo';
import { ESex } from '@app/enums/sex.enum';
import { EGender } from '@app/enums/gender.enum';
import { ESexualOrientation } from '@app/enums/sexual-orientation.enum';
import { EEthnicGroup } from '@app/enums/ethnic-group.enum';

export type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  identification: string;
  phoneNumber: string;
  birthDate: Date;
  direction: string;
  countryOfBirth?: TCountryOption | null;
  departmentOfBirth?: TDepartmentOption | null;
  cityOfBirth?: TCityOption | null;
  countryOfResidence?: TCountryOption | null;
  departmentOfResidence?: TDepartmentOption | null;
  cityOfResidence?: TCityOption | null;
  sex?: ESex | null;
  genre?: EGender | null;
  sexualOrientation?: ESexualOrientation | null;
  ethnicGroup?: EEthnicGroup | null;
  salaryAspiration?: number | null;
};

export const toPersonalInfoDefaults = (data: ICandidate | undefined): PersonalInfoFormData => ({
  firstName: data?.firstName ?? '',
  lastName: data?.lastName ?? '',
  identification: data?.identification ? String(data.identification) : '',
  phoneNumber: data?.phoneNumber ?? '',
  birthDate: data?.birthDate ? new Date(data.birthDate) : new Date(),
  direction: data?.direction ?? '',
  countryOfBirth: data?.countryOfBirth ?? null,
  departmentOfBirth: data?.departmentOfBirth ?? null,
  cityOfBirth: data?.cityOfBirth ?? null,
  countryOfResidence: data?.countryOfResidence ?? null,
  departmentOfResidence: data?.departmentOfResidence ?? null,
  cityOfResidence: data?.cityOfResidence ?? null,
  sex: data?.sex ?? null,
  genre: data?.genre ?? null,
  sexualOrientation: data?.sexualOrientation ?? null,
  ethnicGroup: data?.ethnicGroup ?? null,
  salaryAspiration: data?.salaryAspiration ?? null,
});
