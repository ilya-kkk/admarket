import React, { useEffect } from 'react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const { BackButton } = window.Telegram.WebApp;

    // Обработчик клика
    BackButton.onClick(onClick);

    // Показываем кнопку
    BackButton.show();

    // Очистка
    return () => {
      BackButton.offClick(onClick);
      BackButton.hide();
    };
  }, [onClick]);

  return null;
} 