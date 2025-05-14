import crypto from 'crypto';

interface InitData {
  query_id?: string;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  };
  auth_date: number;
  hash: string;
}

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// Проверка подписи initData
export function validateInitData(initData: string, botToken: string): boolean {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    if (!hash) return false;

    // Удаляем hash из параметров
    urlParams.delete('hash');
    
    // Сортируем параметры
    const params = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Создаем HMAC
    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const hmac = crypto.createHmac('sha256', secretKey)
      .update(params)
      .digest('hex');

    return hmac === hash;
  } catch (error) {
    console.error('Error validating initData:', error);
    return false;
  }
}

// Получение initData из WebApp
export function getInitData(): InitData | null {
  if (!window.Telegram?.WebApp?.initDataUnsafe) {
    return null;
  }
  return window.Telegram.WebApp.initDataUnsafe;
}

// Получение безопасных отступов
export function getSafeAreaInsets(): SafeAreaInsets {
  if (!window.Telegram?.WebApp) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  // Используем viewportHeight и viewportStableHeight для расчета отступов
  const { viewportHeight, viewportStableHeight } = window.Telegram.WebApp;
  const bottomInset = viewportHeight - viewportStableHeight;

  return {
    top: 0, // Верхний отступ обычно не требуется в Telegram Web App
    right: 0, // Правый отступ обычно не требуется
    bottom: bottomInset, // Нижний отступ для учета системной навигации
    left: 0, // Левый отступ обычно не требуется
  };
}

// Создание заголовков для API-запросов
export function createAuthHeaders() {
  const initData = window.Telegram?.WebApp?.initData;
  if (!initData) {
    throw new Error('Telegram WebApp not initialized');
  }
  return {
    'X-Telegram-Init-Data': initData,
  };
} 