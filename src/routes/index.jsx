import { createBrowserRouter } from "react-router-dom";
import { Signup } from "@app/page/signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/aspirantes",
    children: [
      {
        path: "sign-up",
        element: <Signup />


      },
    ],
  },
]);
