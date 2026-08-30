import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/variables.css'
import './styles/global.css'

// Handle SPA redirect from 404.html fallback page
// When a user navigates directly to a non-root URL and the host serves 404.html,
// that page stores the intended path in sessionStorage and redirects to /.
// Here we restore the intended path using history.replaceState before React mounts.
const spaRedirectPath = sessionStorage.getItem('spa_redirect');
if (spaRedirectPath) {
  sessionStorage.removeItem('spa_redirect');
  if (spaRedirectPath !== '/' && spaRedirectPath !== window.location.pathname) {
    window.history.replaceState(null, '', spaRedirectPath);
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
