import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/aspirantes",
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
        path: "hojas-de-vida",
        lazy: () => import('@app/page/applicants/resumes'),
      },
      {
        path: "hojas-de-vida/:id",
        lazy: () => import('@app/page/applicants/resumes/edit'),
      }
    ],
  },
  {
    path: '/',
    lazy: () => import('@app/page/home'),
  }
]);
