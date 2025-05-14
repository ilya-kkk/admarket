import { useEffect } from 'react';
import { initializeWebApp } from '../utils/telegram';

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  useEffect(() => {
    // Инициализируем Web App при монтировании компонента
    initializeWebApp();
  }, []);

  return <>{children}</>;
} 