import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted faces. No external font requests leave the page.
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/azeret-mono/400.css'
import '@fontsource/azeret-mono/500.css'

import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
