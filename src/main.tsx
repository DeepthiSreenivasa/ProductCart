import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProductSellingCartRouterProvider from './providers/ProductSellingCartRouterProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductSellingCartRouterProvider></ProductSellingCartRouterProvider>
  </StrictMode>,
);
