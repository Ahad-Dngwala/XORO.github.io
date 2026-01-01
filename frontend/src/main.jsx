import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

// Verify root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found!');
}

console.log('🚀 XORO: Starting React app...');

// Render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('✅ XORO: React app mounted successfully');
