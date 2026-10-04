import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>

)
