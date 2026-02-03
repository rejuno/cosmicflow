import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Dashboard from './Dashboard'
import Header from './components/Header/Header';
import fundoLight from './assets/images/fundolightmode.webp'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fundoLight})`}}
    >
      <Header />
      <Dashboard />
    </div>
  </React.StrictMode>
)
