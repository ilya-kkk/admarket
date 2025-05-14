import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { useTelegramApp } from "./telegram";
import { validateInitData } from './utils/telegram';
import { SafeArea } from './components/telegram/SafeArea';

// Ленивая загрузка страниц
const HomePage = React.lazy(() => import('./pages/HomePage'));
const BuyAdsPage = React.lazy(() => import('./pages/BuyAdsPage'));
const BuyAdsPremiumPage = React.lazy(() => import('./pages/BuyAdsPremiumPage'));
const ChannelDetailPage = React.lazy(() => import('./pages/ChannelDetailPage'));
const ChannelDetailPremiumPage = React.lazy(() => import('./pages/ChannelDetailPremiumPage'));
const ChannelOffersPage = React.lazy(() => import('./pages/ChannelOffersPage'));
const SellAdsPage = React.lazy(() => import('./pages/SellAdsPage'));

// Импорт стилей
import "./styles/main.css";

// Компонент загрузки
function LoadingFallback() {
  return <div>Загрузка...</div>;
}

// Компонент приложения
function AppContent() {
  const { theme } = useTelegramApp();

  // Инициализация Telegram Web App
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      // Инициализируем Web App
      window.Telegram.WebApp.ready();
      
      // Разворачиваем на весь экран
      window.Telegram.WebApp.expand();

      // Проверяем initData
      const initData = window.Telegram.WebApp.initData;
      const botToken = import.meta.env.VITE_BOT_TOKEN;
      
      if (!validateInitData(initData, botToken)) {
        console.error('Invalid initData');
        return;
      }
    }
  }, []);

  // Применение темы Telegram
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#fff');
      document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color || '#999');
      document.documentElement.style.setProperty('--tg-theme-link-color', theme.link_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color || '#fff');
    }
  }, [theme]);

  return (
    <SafeArea>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyAdsPage />} />
          <Route path="/buy/premium" element={<BuyAdsPremiumPage />} />
          <Route path="/channel/:id" element={<ChannelDetailPage />} />
          <Route path="/channel/:id/premium" element={<ChannelDetailPremiumPage />} />
          <Route path="/channel/:id/offers" element={<ChannelOffersPage />} />
          <Route path="/sell" element={<SellAdsPage />} />
        </Routes>
      </Suspense>
    </SafeArea>
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

// Инициализация приложения
const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

// Рендерим приложение
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <TeleAdsApp />
  </React.StrictMode>
);
