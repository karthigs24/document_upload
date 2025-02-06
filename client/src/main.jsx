import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/saga-blue/theme.css' // Import theme
import 'primereact/resources/primereact.min.css' // Core CSS
import 'primeicons/primeicons.css' // Icons
import 'primeflex/primeflex.css' // Flexbox

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
