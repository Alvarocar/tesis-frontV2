import { ROUTES } from "./routes";
import { TSchemaRouter } from "@app/@types/schema";
import { AuthNotFoundApplicant } from "@app/middlewares/authNotFoundApplicant";
import { AuthNotFoundRecruiter } from "@app/middlewares/AuthNotFoundRecruiter";
import { AuthPublicApplicant } from "@app/middlewares/authPublicApplicant";

export const routesSchema: TSchemaRouter[] = [
  {
    path: '/',
    component: ROUTES.Home,
    middleware: [],
  },
  {
    path: '/sign-in',
    component: ROUTES.Signin,
    middleware: [AuthPublicApplicant],
  },
  {
    path: '/sign-up',
    component: ROUTES.Signup,
    middleware: [AuthPublicApplicant],
  },
  {
    path: 'empleo/:jobSlug',
    component: ROUTES.JobById,
    middleware: [],
  },
  {
    path: 'aspirante/:cvSlug',
    component: ROUTES.ResumeApplicant,
    middleware: [AuthNotFoundApplicant],
  },
  {
    path: '/sign-in/reclutadores',
    component: ROUTES.SigninRecruiter,
    middleware: [AuthPublicApplicant],
  },
  {
    path: '/vacante/crear',
    component: ROUTES.CrearVacante,
    middleware: [AuthNotFoundRecruiter],
  }
]
