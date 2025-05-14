import { init } from '@telegram-apps/sdk-react';

// Инициализация SDK
init();

// Простой хук для работы с Telegram Mini App
export function useTelegramApp() {
  // Здесь можно добавить базовую функциональность
  return {
    user: null,
    theme: null
  };
} 