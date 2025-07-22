import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="container mx-auto px-2 pt-1">
      <App />
      <Toaster richColors position="top-center" />
    </div>
  </StrictMode>
);
