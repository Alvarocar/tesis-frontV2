import React, { Suspense } from "react"
import { RawRoute } from "../routes"
import { compose } from 'lodash/fp'
import { Route, Routes } from "react-router-dom"
import DefaultFallback from "@components/fallbacks/defaultFallback"

interface Props extends RawRoute { }

const AppRoute: React.FC<Props> = ({
  component: Component,
  middlewares = [],
  subRoutes = [],
  layout = v => v
}) => {
  const ComponentToRender = layout(Component ? compose(middlewares)(Component) : null)
  return (
    <Routes>
      {subRoutes.map((props, key) => (
        <Route key={key} path={props.path.concat('/*')} element={<AppRoute {...props} key={key} />} />
      ))}
      <Route
        path="*"
        element={
          <Suspense fallback={<DefaultFallback />}>
            <ComponentToRender />
          </Suspense>}
      />
    </Routes>
  )
}

export default AppRoute