import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// Импорт страниц
import HomePage from './src/pages/HomePage';
import BuyAdsPage from './src/pages/BuyAdsPage';
import BuyAdsPremiumPage from './src/pages/BuyAdsPremiumPage';
import ChannelDetailPage from './src/pages/ChannelDetailPage';
import ChannelDetailPremiumPage from './src/pages/ChannelDetailPremiumPage';
import ChannelOffersPage from './src/pages/ChannelOffersPage';
import SellAdsPage from './src/pages/SellAdsPage';

// Импорт стилей
import './src/styles/main.css';

// Типы данных
interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

// Основной компонент приложения
function TeleAdsApp() {
  const [user, setUser] = useState<User>({
    id: 'user123',
    name: 'Александр',
    email: 'alexander@example.com',
    isPremium: false
  });

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyAdsPage />} />
          <Route path="/buy/premium" element={<BuyAdsPremiumPage />} />
          <Route path="/channel/:id" element={<ChannelDetailPage />} />
          <Route path="/channel/:id/premium" element={<ChannelDetailPremiumPage />} />
          <Route path="/channel/:id/offers" element={<ChannelOffersPage />} />
          <Route path="/sell" element={<SellAdsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TeleAdsApp />
  </React.StrictMode>
);
