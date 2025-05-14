import { init, useLaunchParams } from '@telegram-apps/sdk-react';

// Инициализация SDK
init();

// Хук для работы с Telegram Mini App
export function useTelegramApp() {
  const launchParams = useLaunchParams();
  
  return {
    user: launchParams.tgWebAppData?.user,
    theme: launchParams.tgWebAppThemeParams,
    platform: launchParams.tgWebAppPlatform,
    version: launchParams.tgWebAppVersion,
    initData: launchParams.tgWebAppInitData,
    initDataUnsafe: launchParams.tgWebAppInitDataUnsafe
  };
} 