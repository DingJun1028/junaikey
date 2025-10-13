import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // 修正為匯入 .tsx 檔案
import './index.css';
import './App.css'; // Import App.css for component-specific styles
import { CodexAutomationService } from './modules/CodexAutomation/CodexAutomationService'; // Import the new service

// Initialize CodexAutomationService early in the application lifecycle
// The service will load its enabled state from localStorage and subscribe/unsubscribe accordingly.
CodexAutomationService.Instance.initialize();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);