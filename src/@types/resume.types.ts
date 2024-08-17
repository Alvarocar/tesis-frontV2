export interface IResumeOverview {
  id: number;
  title: string;
  about_me: string;
}

export interface IResumeDetail {
  id: number
  title: string
  about_me: string
  modification_date: string
  experiences: IExperience[]
  educations: IEducation[]
  personal_references: PersonalReference[]
  laboral_references: LaboralReference[]
  languages: Language[]
  skills: Skill[]
  applicant: Applicant
}

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

export interface Skill {
  id?: number
  name: string
}

export interface Language {
  name: string
  level: number
}

interface Applicant {
  id: number
  name: string
  email: string
  modification_date: string
  direction: string
  identification: number
  phone_number: string
  birth_date: string
}

export type IApplicantDetail = Applicant;