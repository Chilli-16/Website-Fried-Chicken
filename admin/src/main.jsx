
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReacDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

ReacDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
