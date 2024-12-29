import { lazy } from 'react'

export const ROUTES = {
  Home: lazy(() => import('@app/pages/Home').then(({ Home }) => ({ default: Home }))),
  Signup: lazy(() => import('@app/pages/Signup').then(({ Signup }) => ({ default: Signup }))),
  Signin: lazy(() => import('@app/pages/Signin').then(({ Signin }) => ({ default: Signin }))),
}
