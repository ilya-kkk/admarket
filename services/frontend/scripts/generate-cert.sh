#!/bin/bash

# Создаем директорию для сертификатов
mkdir -p .cert

# Генерируем самоподписанный сертификат
openssl req -x509 -newkey rsa:2048 -keyout .cert/key.pem -out .cert/cert.pem -days 365 -nodes -subj "/CN=localhost"

echo "SSL сертификаты созданы в директории .cert/" 