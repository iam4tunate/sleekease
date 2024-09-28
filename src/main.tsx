import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryProvider } from './lib/react-query/QueryProvider.tsx';
import AuthProvider from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
