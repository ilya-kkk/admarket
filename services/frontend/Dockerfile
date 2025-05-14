# Этап сборки
FROM node:18-alpine as builder

WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install && \
    npm install react-icons && \
    npm install --save-dev vite && \
    npm install @twa-dev/sdk && \
    npm install @twa-dev/types && \
    npm install react-router-dom && \
    npm install @types/react-router-dom

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап продакшена
FROM nginx:alpine

# Копируем собранное приложение в nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Копируем SSL сертификаты
COPY nginx/ssl /etc/nginx/ssl

# Открываем порты
EXPOSE 80
EXPOSE 443

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"] 