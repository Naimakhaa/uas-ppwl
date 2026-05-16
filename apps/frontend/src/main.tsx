import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Aktifkan import App yang standar, hapus yang mengarah ke App2
import App from './App' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)