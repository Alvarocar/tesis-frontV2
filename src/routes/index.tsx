import { Error } from "@app/page/error";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/aspirantes",
    ErrorBoundary: Error,
    children: [
      {
        path: "sign-up",
        lazy: () => import('@app/page/applicants/signup'),
      },
      {
        path: "sign-in",
        lazy: () => import('@app/page/applicants/login')
      },
      {
        path: "home",
        lazy: () => import('@app/page/applicants/home'),
      },
      {
        path: "cv",
        lazy: () => import('@app/page/applicants/resumes'),
      },
      {
        path: "cv/:id",
        lazy: () => import('@app/page/applicants/resumes/edit'),
      }
    ],
  },
  {
    path: '/',
    lazy: () => import('@app/page/home'),
  },
  {
    path: "*",
    lazy: () => import('@app/page/404'),
  },
]);
