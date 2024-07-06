import ReactDOM from 'react-dom/client'
import './styles/_global.scss'
import React from 'react'
import { ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
      hashed: false,
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
