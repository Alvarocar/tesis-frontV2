import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "@router/routes";
import AppRoute from "./appRoute";

const Router = () => (
  <BrowserRouter>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path.concat('/*')} element={<AppRoute {...route} />} />
      ))}
      <Route
        path='*'
        element={
          <div>PAGINA NO ENCONTRADA</div>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default Router