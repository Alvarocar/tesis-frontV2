import { AuthPublic } from "@app/middlewares/authPublic";
import { ROUTES } from "./routes";
import { TSchemaRouter } from "@app/@types/schema";

export const routesSchema: TSchemaRouter[] = [
  {
    path: '/',
    component: ROUTES.Home,
    middleware: [],
  },
  {
    path: '/sign-in',
    component: ROUTES.Signin,
    middleware: [AuthPublic]
  },
]