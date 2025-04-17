import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Battleship } from './components/Battleship.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Battleship />
  </StrictMode>
);
