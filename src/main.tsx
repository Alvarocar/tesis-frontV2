import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { store } from './store'
import './days'
import './styles/_global.scss'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <div className="bg-zinc-600">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  </React.StrictMode>
)
