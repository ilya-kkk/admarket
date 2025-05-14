#!/bin/bash

# Создаем директорию для сертификатов
mkdir -p certificates

# Генерируем самоподписанный сертификат
openssl req -x509 -newkey rsa:2048 -keyout certificates/localhost-key.pem -out certificates/localhost.pem -days 365 -nodes -subj "/CN=localhost"

# Устанавливаем права доступа
chmod 600 certificates/localhost-key.pem
chmod 600 certificates/localhost.pem 