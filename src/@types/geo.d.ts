export type TCountryOption = {
  id: number;
  name: string;
  code: string;
};

export type TDepartmentOption = {
  id: number;
  name: string;
  code: string;
  countryId: number;
};

export type TCityOption = {
  id: number;
  name: string;
  type?: string | null;
  countryId: number;
  departmentId: number;
};
