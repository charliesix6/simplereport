import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 👇 IMPORTA HashRouter
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 Envuelve la app en HashRouter */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)