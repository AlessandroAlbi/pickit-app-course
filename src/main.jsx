// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Avvia MSW PRIMA di importare App
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' }, // assicurati sia in /public
    onUnhandledRequest: 'warn',
  })
}

// importa App SOLO dopo l'avvio del worker
const { default: App } = await import('./App.jsx')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
