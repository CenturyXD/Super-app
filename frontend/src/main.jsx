import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <RoutesConfig />
    </Router>
  </StrictMode>,
)
