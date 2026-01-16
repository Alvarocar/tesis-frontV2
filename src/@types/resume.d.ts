import { ICandidate } from "./applicant"

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
  }
  
  export interface IEducation {
    id?: number
    institute: string
    title: string
    startDate: string
    endDate?: string
    keepStudy: boolean
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
