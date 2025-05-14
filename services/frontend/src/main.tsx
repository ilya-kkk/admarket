import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { useTelegramApp } from "./telegram";

// Импорт страниц
import HomePage from "./pages/HomePage";
import BuyAdsPage from "./pages/BuyAdsPage";
import BuyAdsPremiumPage from "./pages/BuyAdsPremiumPage";
import ChannelDetailPage from "./pages/ChannelDetailPage";
import ChannelDetailPremiumPage from "./pages/ChannelDetailPremiumPage";
import ChannelOffersPage from "./pages/ChannelOffersPage";
import SellAdsPage from "./pages/SellAdsPage";

// Импорт стилей
import "./styles/main.css";

// Компонент приложения
function AppContent() {
  const { theme } = useTelegramApp();

  // Применение темы Telegram
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', theme.link_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color || '#ffffff');
    }
  }, [theme]);

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
    <Router>
      <AppContent />
    </Router>
  );
}

// Проверка, что приложение запущено внутри Telegram


// Инициализация приложения
const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
  // Инициализация Telegram Web App
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TeleAdsApp />
    </React.StrictMode>
  );
} else {
  console.error('Приложение должно быть запущено внутри Telegram Mini App');
  // Для разработки можно рендерить приложение без Telegram
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TeleAdsApp />
    </React.StrictMode>
  );
}
