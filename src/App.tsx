import { Route, Switch } from "wouter"
import { Header } from "./modules/common/header"
import { Suspense, lazy } from "react"

const Home = lazy(() => import('./pages/Home').then(({ Home }) => ({ default: Home })))
const Signup = lazy(() => import('./pages/Signup').then(({ Signup }) => ({ default: Signup })))

function App() {  return (
    <div className="h-screen bg-slate-100">
      <Suspense fallback={<div>Cargando...</div>}>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/sign-up' component={Signup} />
          <Route>
            404
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
