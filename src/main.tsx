import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './lib/react-query/QueryProvider.tsx';
import AuthProvider from './context/AuthContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          {/* TODO: uncoment before testing cart state  */}
          {/* <CartProvider> */}
          <App />
          {/* </CartProvider> */}
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
