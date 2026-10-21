import { ICandidate } from "./applicant";
import { EEducationLevel } from "@app/enums/education-level.enum";
import { VacantJobType } from "@app/enums/vacant.enum";
import type { TCityOption, TCountryOption, TDepartmentOption, TGeoName } from "@app/@types/geo";

export type TResume = {
  id: number
  title: string
  aboutMe: string
  modificationDate: string
  experiences: TResume.IExperience[]
  educations: TResume.IEducation[]
  personalReferences: TResume.PersonalReference[]
  laboralReferences: TResume.LaboralReference[]
  languages: TResume.ILanguage[]
  skills: TResume.ISkill[]
  applicant: ICandidate;
  // Phase 0 — SPE fields (additive, all optional)
  workModality?: VacantJobType;
  knowledge?: TResume.IKnowledge[];
}


export namespace TResume {
  export type Overview = Pick<TResume, 'id' | 'title' | 'aboutMe'>;

  export interface IExperience {
    id?: number
    rol: string
    company: string
    startDate: string
    endDate?: string | null
    keepWorking: boolean
    description: string
    // Ubicación: forma completa en formularios, reducida en vistas de solo lectura.
    country?: TCountryOption | TGeoName | null;
    department?: TDepartmentOption | TGeoName | null;
    city?: TCityOption | TGeoName | null;
  }

  export interface IEducation {
    id?: number
    institute: string
    title: string
    startDate: string
    endDate?: string | null
    keepStudy: boolean
    // Formación académica
    educationLevel?: EEducationLevel | null;
    programName?: string | null;
    country?: TCountryOption | TGeoName | null;
  }

  export interface PersonalReference {
    id?: number
    name: string
    number: string
    relationship: string
  }

  export interface LaboralReference {
    id?: number
    name: string
    number: string
    rol: string
  }

  export interface ISkill {
    id?: number
    name: string
  }

  export interface ILanguage {
    id?: number;
    name: string;
    level: number;
  }

  // Phase 0 — Knowledge entity (SPE "conocimientos")
  export interface IKnowledge {
    id?: number;
    name: string;
  }

}

export type TLanguage = {
  id?: number;
  name: string;
}
