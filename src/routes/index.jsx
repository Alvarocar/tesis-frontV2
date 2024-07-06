import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/aspirantes",
    children: [
      {
        path: "sign-up",
        lazy: () => import('@app/page/signup')
      },
      {
        path: "sign-in",
        lazy: () => import('@app/page/login')
      }
    ],
  },
  {
    path: '/',
    lazy: () => import('@app/page/home/index'),
  }
]);
