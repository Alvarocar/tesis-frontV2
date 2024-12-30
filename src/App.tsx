import { Route, Switch } from "wouter"
import { Suspense } from "react"
import { ROUTES } from "./router/routes"
import { AuthProvider } from "./context/auth";

const { Home, Signin, Signup } = ROUTES;

function App() {  return (
    <div className="h-screen bg-slate-100">
      <AuthProvider>
        <Suspense fallback={<div>Cargando...</div>}>
          <Switch>
            <Route path='/' component={Home} />
            <Route path='/sign-up' component={Signup} />
            <Route path='/sign-in' component={Signin} />
            <Route>
              404
            </Route>
          </Switch>
        </Suspense>
      </AuthProvider>
    </div>
  )
}

export default App
