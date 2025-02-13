// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './component/Home'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Import PrimeReact theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Home />
  // </StrictMode>,
)
