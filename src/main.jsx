// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const enableMSW =
  import.meta.env.DEV ||
  import.meta.env.VITE_ENABLE_MSW === 'true' || // <-- abilita in preview test
  (typeof window !== 'undefined' && window.Cypress); // opzionale: abilita in Cypress

if (enableMSW) {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' }, // deve stare in /public
    onUnhandledRequest: 'warn',
  });
}

const { default: App } = await import('./App.jsx');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
