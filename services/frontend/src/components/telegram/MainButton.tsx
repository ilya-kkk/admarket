import React, { useEffect } from 'react';

interface MainButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  textColor?: string;
}

export function MainButton({ text, onClick, disabled = false, color, textColor }: MainButtonProps) {
  useEffect(() => {
    if (!window.Telegram?.WebApp) return;

    const { MainButton } = window.Telegram.WebApp;

    // Настройка кнопки
    MainButton.setText(text);
    if (color) MainButton.setParams({ color });
    if (textColor) MainButton.setParams({ text_color: textColor });
    
    // Обработчик клика
    MainButton.onClick(onClick);

    // Показываем кнопку
    MainButton.show();

    // Очистка
    return () => {
      MainButton.offClick(onClick);
      MainButton.hide();
    };
  }, [text, onClick, disabled, color, textColor]);

  return null;
} 