import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MainPage from './MainPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  </StrictMode>
);
