import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { AuthSessionProvider } from '@/src/modules/auth/providers/auth-session-provider';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/lib/query-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthSessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
      </QueryClientProvider>
    </AuthSessionProvider>
  </React.StrictMode>
);
