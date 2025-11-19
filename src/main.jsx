import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

// Try to configure Amplify from local import
async function loadAmplifyConfig() {
  try {
    // First try to use the window config that was set by HTML
    if (typeof window !== 'undefined' && window.AMPLIFY_CONFIG) {
      console.log('Loading Amplify config from window.AMPLIFY_CONFIG');
      Amplify.configure(window.AMPLIFY_CONFIG);
      console.log('✅ Amplify configured');
      return;
    }
  } catch (e) {
    console.warn('Failed to load from window.AMPLIFY_CONFIG:', e);
  }
  
  // Fallback: try local import
  try {
    console.log('Attempting to load amplify_outputs.json locally...');
    const amplifyConfig = import.meta.glob('../amplify_outputs.json', { eager: true });
    const configFile = Object.values(amplifyConfig)[0];
    if (configFile) {
      const config = configFile.default || configFile;
      console.log('Loading Amplify config from local file');
      Amplify.configure(config);
      console.log('✅ Amplify configured from local file');
      return;
    }
  } catch (e) {
    console.warn('Failed to load amplify_outputs.json:', e);
  }
  
  console.warn('⚠️ Could not load Amplify configuration');
}

// Load config then render
loadAmplifyConfig().then(() => {
  setTimeout(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:uuid" element={<App />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>,
    );
  }, 50);
});
