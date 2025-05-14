import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { WebAppProvider, useWebApp, useInitData } from '@vkruglikov/react-telegram-web-app';

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

// Компонент приложения
function AppContent() {
  const [user, setUser] = useState<User>({
    id: 'user123',
    name: 'Александр',
    email: 'alexander@example.com',
    isPremium: false
  });

  const webApp = useWebApp();
  const [initData] = useInitData();

  useEffect(() => {
    // Инициализация Telegram Web App
    webApp.ready();
    
    // Установка темы приложения
    webApp.setHeaderColor('#1a1a1a');
    webApp.setBackgroundColor('#1a1a1a');
    
    // Получение данных пользователя из Telegram
    const tgUser = initData?.user;
    if (tgUser) {
      setUser({
        id: tgUser.id.toString(),
        name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
        email: '',
        isPremium: false
      });
    }
  }, [webApp, initData]);

  return (
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
  );
}

// Основной компонент приложения
function TeleAdsApp() {
  return (
    <WebAppProvider>
      <Router>
        <AppContent />
      </Router>
    </WebAppProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TeleAdsApp />
  </React.StrictMode>
);
