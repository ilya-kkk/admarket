import React, { useEffect, useState } from 'react';
import { getSafeAreaInsets } from '../../utils/telegram';

interface SafeAreaProps {
  children: React.ReactNode;
}

export function SafeArea({ children }: SafeAreaProps) {
  const [insets, setInsets] = useState(getSafeAreaInsets());

  useEffect(() => {
    // Обновляем отступы при изменении размера окна
    const handleResize = () => {
      setInsets(getSafeAreaInsets());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
} 