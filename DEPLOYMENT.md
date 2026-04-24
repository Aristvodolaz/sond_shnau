# Деплой fond-schnauzers на сервер (PM2 + Nginx)

Приложение: **Nuxt 3 SSR** | Порт Node: **8448** | PM2 cluster mode

---

## Требования к серверу

| Компонент | Версия |
|-----------|--------|
| Node.js   | ≥ 18.x |
| npm       | ≥ 9.x  |
| PM2       | любая последняя |
| Nginx     | ≥ 1.18 |
| PostgreSQL| ≥ 14   |

---

## Быстрый старт (первый деплой)

### 1. Установить зависимости

```bash
# PM2 глобально (один раз на сервере)
npm install -g pm2

# Зависимости проекта
npm install
```

### 2. Создать `.env` из примера

```bash
cp .env.example .env
nano .env
```

Минимальные переменные которые нужно заполнить:

```env
PORT=8448
HOST=0.0.0.0
NODE_ENV=production

DB_HOST=localhost
DB_PORT=5432
DB_NAME=fond_shnau
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SSL=false

S3_ENDPOINT=https://storage.yandexcloud.net
S3_REGION=ru-central1
S3_BUCKET=your_bucket_name
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_PUBLIC_BASE_URL=https://your_bucket.storage.yandexcloud.net

ADMIN_USERNAME=your_admin_login
ADMIN_PASSWORD=your_secure_password
```

### 3. Инициализировать БД (только первый раз)

```bash
npm run db:init
```

### 4. Собрать приложение

```bash
npm run build
```

Создаёт оптимизированную сборку в `.output/`

### 5. Запустить через PM2

```bash
npm run pm2:start
# или напрямую:
pm2 start ecosystem.config.cjs --env production
```

Проверить что запустилось:

```bash
pm2 status
# должно показать fond-schnauzers online на нескольких инстансах
```

Проверить доступность приложения:

```bash
curl http://localhost:8448
```

### 6. Настроить Nginx

```bash
# Скопировать конфиг (замените YOUR_DOMAIN на ваш домен)
sudo cp deploy/nginx.conf /etc/nginx/sites-available/fond-schnauzers

# Отредактировать: заменить YOUR_DOMAIN на реальный домен
sudo nano /etc/nginx/sites-available/fond-schnauzers

# Активировать сайт
sudo ln -s /etc/nginx/sites-available/fond-schnauzers /etc/nginx/sites-enabled/

# Проверить конфиг и перезагрузить
sudo nginx -t && sudo systemctl reload nginx
```

### 7. Получить SSL-сертификат (опционально, Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN
```

Certbot сам обновит nginx конфиг и настроит автопродление.

### 8. Автозапуск PM2 при перезагрузке сервера

```bash
pm2 save
pm2 startup
# Выполнить команду которую покажет PM2 (с sudo)
```

---

## Управление приложением

| Действие | Команда |
|----------|---------|
| Запуск | `npm run pm2:start` |
| Остановка | `npm run pm2:stop` |
| Перезапуск (с downtime) | `npm run pm2:restart` |
| Плавный перезапуск (zero-downtime) | `npm run pm2:reload` |
| Удалить из PM2 | `npm run pm2:delete` |
| Статус | `pm2 status` |
| Логи в реальном времени | `npm run pm2:logs` |
| Мониторинг CPU/RAM | `npm run pm2:monit` |

---

## Обновление приложения

```bash
# 1. Получить новый код
git pull

# 2. Установить новые зависимости (если изменились)
npm install

# 3. Пересобрать
npm run build

# 4. Перезапустить без даунтайма
npm run pm2:reload
```

---

## Логи

Логи сохраняются в `logs/` в корне проекта:

```
logs/
  pm2-error.log     — ошибки
  pm2-out.log       — stdout
  pm2-combined.log  — всё вместе
```

Просмотр:

```bash
npm run pm2:logs
# или конкретное количество строк:
pm2 logs fond-schnauzers --lines 100
```

---

## Настройки PM2 (`ecosystem.config.cjs`)

| Параметр | Значение | Описание |
|----------|----------|----------|
| `PORT` | `8448` | Порт Node-сервера |
| `HOST` | `0.0.0.0` | Слушать все интерфейсы |
| `instances` | `max` | Кластер на все CPU ядра |
| `exec_mode` | `cluster` | Режим кластера |
| `max_memory_restart` | `1G` | Перезапуск при >1GB RAM |
| `autorestart` | `true` | Автоперезапуск при падении |

> Значения из `.env` перекрывают defaults в `ecosystem.config.cjs`. Если в `.env` указан `PORT=8448`, он всегда будет применяться.

---

## Архитектура деплоя

```
Пользователь
    │
    ▼ :80 / :443
 Nginx (reverse proxy)
    │
    ▼ localhost:8448
 PM2 Cluster (fond-schnauzers)
  ├── Worker 0  ─┐
  ├── Worker 1   ├── Nuxt 3 SSR + Nitro API
  └── Worker N  ─┘
    │
    ├──▶ PostgreSQL :5432
    └──▶ Yandex S3 (media)
```

---

## Troubleshooting

### Приложение не запускается

```bash
# Проверить что сборка существует
ls .output/server/index.mjs

# Смотреть логи PM2
pm2 logs fond-schnauzers --lines 50

# Проверить что порт 8448 слушается
ss -tlnp | grep 8448
```

### Порт занят

```bash
# Найти процесс на 8448
ss -tlnp | grep 8448
# или
lsof -i :8448

# Убить процесс
kill -9 <PID>
```

Или изменить `PORT` в `.env` и перезапустить PM2.

### 413 Request Entity Too Large при загрузке фото

Nginx по умолчанию ограничивает размер тела запроса до 1MB. Проверить что в конфиге nginx есть:

```nginx
client_max_body_size 25m;
```

Это уже включено в `deploy/nginx.conf`. Проверить что `UPLOAD_MAX_FILE_SIZE_MB=25` в `.env` совпадает.

### Высокое потребление памяти

Уменьшить число инстансов в `ecosystem.config.cjs`:

```js
instances: 2,  // вместо 'max'
```

Затем:

```bash
npm run pm2:reload
```

### Nginx 502 Bad Gateway

Приложение не запущено или упало. Проверить:

```bash
pm2 status
pm2 logs fond-schnauzers --lines 30
curl http://localhost:8448  # должен отвечать
```
