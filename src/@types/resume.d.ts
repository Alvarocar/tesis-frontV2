import { ICandidate } from "./applicant";
import { EEducationLevel } from "@app/enums/education-level.enum";
import { VacantJobType } from "@app/enums/vacant.enum";

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
    // Phase 0 — SPE experience location fields
    country?: string;
    department?: string;
    city?: string;
  }

  export interface IEducation {
    id?: number
    institute: string
    title: string
    startDate: string
    endDate?: string | null
    keepStudy: boolean
    // Phase 0 — SPE academic formation fields
    educationLevel?: EEducationLevel;
    programName?: string;
    country?: string;
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