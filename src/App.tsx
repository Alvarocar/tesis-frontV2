import { Suspense } from 'react'
import { Spin } from 'antd';
import Router from './router/components/router';
import '@styles/main.scss'

const App = () => (
  <Suspense fallback={<Spin />}>
    <Router />
  </Suspense>
)

export default App
