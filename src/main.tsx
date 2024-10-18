import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { store } from './store'
import './days'
import './styles/_global.scss'

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
      hashed: false,
    }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
