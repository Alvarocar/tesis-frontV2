import { ROUTES } from "./routes";
import { ROUTES_PATHS } from "@app/constants/routes.constant";
import { TSchemaRouter } from "@app/@types/schema";
import { AuthNotFoundApplicant } from "@app/middlewares/authNotFoundApplicant";
import { AuthNotFoundRecruiter } from "@app/middlewares/AuthNotFoundRecruiter";
import { AuthPublicApplicant } from "@app/middlewares/authPublicApplicant";

export const routesSchema: TSchemaRouter[] = [
  {
    path: ROUTES_PATHS.HOME,
    component: ROUTES.Home,
    middleware: [],
  },
  {
    path: ROUTES_PATHS.SIGN_IN,
    component: ROUTES.Signin,
    middleware: [AuthPublicApplicant],
  },
  {
    path: ROUTES_PATHS.SIGN_UP,
    component: ROUTES.Signup,
    middleware: [AuthPublicApplicant],
  },
  {
    path: ROUTES_PATHS.EMPLOY,
    component: ROUTES.JobById,
    middleware: [],
  },
  {
    path: ROUTES_PATHS.ASPIRANT,
    component: ROUTES.ResumeApplicant,
    middleware: [AuthNotFoundApplicant],
  },
  {
    path: ROUTES_PATHS.SIGN_IN_RECRUITER,
    component: ROUTES.SigninRecruiter,
    middleware: [AuthPublicApplicant],
  },
  {
    path: ROUTES_PATHS.CREATE_VACANCY,
    component: ROUTES.CrearVacante,
    middleware: [AuthNotFoundRecruiter],
  },
  {
    path: ROUTES_PATHS.EDIT_VACANCY,
    component: ROUTES.EditarVacante,
    middleware: [AuthNotFoundRecruiter],
  }
]
