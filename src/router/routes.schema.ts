import { ROUTES } from "./routes";
import { TSchemaRouter } from "@app/@types/schema";
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
    middleware: [AuthPublicApplicant]
  },
]