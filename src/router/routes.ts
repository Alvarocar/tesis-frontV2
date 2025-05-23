import { lazy } from 'react'

export const ROUTES = {
  Home: lazy(() => import('@app/pages/Home').then(({ Home }) => ({ default: Home }))),
  Signup: lazy(() => import('@app/pages/Signup').then(({ Signup }) => ({ default: Signup }))),
  Signin: lazy(() => import('@app/pages/Signin').then(({ Signin }) => ({ default: Signin }))),
  JobById: lazy(() => import('@app/pages/Empleo/[id]').then(({ JobById }) => ({ default: JobById }))),
  NotFound: lazy(() => import('@app/modules/common/error/NotFound').then(({ NotFound }) => ({ default: NotFound }))),
  ResumeApplicant: lazy(() => import('@app/pages/Resume/Applicant/ResumeApplicant').then(({ ResumeApplicant }) => ({ default: ResumeApplicant }))),
  SigninRecruiter: lazy(() => import('@app/pages/Signin/Recruiter').then(({ Recruiter }) => ({ default: Recruiter }))),
  CrearVacante: lazy(() => import('@app/pages/Vacante/Crear')),
  EditarVacante: lazy(() => import('@app/pages/Vacante/[id]')),
  Vacantes: lazy(() => import('@app/pages/Vacantes').then(({ Vacantes }) => ({ default: Vacantes }))),
  Procesos: lazy(() => import('@app/pages/Procesos').then(({ Procesos }) => ({ default: Procesos }))),
  ApplicationDetail: lazy(() => import('@app/pages/Procesos/Aplicacion').then(({ ApplicationDetail }) => ({ default: ApplicationDetail }))),
}
