import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { AdminTurnoApp } from './AdminTurnoApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <AdminTurnoApp />
      </BrowserRouter>
  </StrictMode>
)
