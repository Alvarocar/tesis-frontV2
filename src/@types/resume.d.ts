import { ICandidate } from "./applicant"

export type TResume = {
  id: number
  title: string
  about_me: string
  modification_date: string
  experiences: TResume.IExperience[]
  educations: TResume.IEducation[]
  personal_references: TResume.PersonalReference[]
  laboral_references: TResume.LaboralReference[]
  languages: TResume.ILanguage[]
  skills: TResume.ISkill[]
  applicant: ICandidate;
}


export namespace TResume {
  export type Overview = Pick<TResume, 'id' | 'title' | 'about_me'>;
  
  export interface IExperience {
    id?: number
    rol: string
    company: string
    start_date: string
    end_date?: string
    keep_working: boolean
    description: string
  }
  
  export interface IEducation {
    id?: number
    institute: string
    title: string
    start_date: string
    end_date?: string
    keep_study: boolean
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
  
}

export type TLanguage = {
  id?: number;
  name: string;
}
