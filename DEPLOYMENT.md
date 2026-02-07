# Production Deployment с PM2

## Предварительные требования

1. Установите PM2 глобально:
```bash
npm install -g pm2
```

2. Убедитесь, что все зависимости установлены:
```bash
npm install
```

## Деплой на production

### Шаг 1: Сборка приложения
```bash
npm run build
```

Эта команда создаст оптимизированную production сборку в папке `.output/`

### Шаг 2: Настройка переменных окружения

Создайте файл `.env` в корне проекта с необходимыми переменными:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/fond_db
# Добавьте другие переменные окружения
```

### Шаг 3: Запуск с PM2
```bash
npm run pm2:start
```

Или напрямую:
```bash
pm2 start ecosystem.config.cjs --env production
```

## Управление приложением

### Основные команды

- **Запуск**: `npm run pm2:start`
- **Остановка**: `npm run pm2:stop`
- **Перезапуск**: `npm run pm2:restart`
- **Плавная перезагрузка без даунтайма**: `npm run pm2:reload`
- **Удаление из PM2**: `npm run pm2:delete`
- **Просмотр логов**: `npm run pm2:logs`
- **Мониторинг**: `npm run pm2:monit`

### Просмотр статуса
```bash
pm2 status
pm2 list
```

### Детальная информация
```bash
pm2 show fond-schnauzers
```

## Логи

Логи сохраняются в папке `logs/`:
- `pm2-error.log` - ошибки
- `pm2-out.log` - стандартный вывод
- `pm2-combined.log` - комбинированные логи

Просмотр логов в реальном времени:
```bash
npm run pm2:logs
# или
pm2 logs fond-schnauzers --lines 100
```

## Автозапуск при перезагрузке сервера

Сохраните текущий список процессов PM2:
```bash
pm2 save
```

Настройте автозапуск PM2 при старте системы:
```bash
pm2 startup
```

Выполните команду, которую покажет PM2 (она будет специфична для вашей ОС).

## Обновление приложения

1. Остановите текущую версию:
```bash
npm run pm2:stop
```

2. Получите новый код (git pull, etc.)

3. Установите зависимости (если изменились):
```bash
npm install
```

4. Пересоберите приложение:
```bash
npm run build
```

5. Перезапустите с плавной перезагрузкой:
```bash
npm run pm2:reload
```

## Настройки производительности

В `ecosystem.config.cjs` настроены:
- **Cluster mode**: Использует все доступные CPU ядра
- **Auto-restart**: Автоматический перезапуск при падении
- **Memory limit**: Перезапуск при превышении 1GB памяти
- **Graceful shutdown**: Корректное завершение запросов перед перезапуском

## Мониторинг

Для расширенного мониторинга используйте PM2 Plus:
```bash
pm2 link <secret_key> <public_key>
```

Или используйте встроенный мониторинг:
```bash
npm run pm2:monit
```

## Troubleshooting

### Приложение не запускается
1. Проверьте, что сборка выполнена: `ls .output/server/index.mjs`
2. Проверьте логи: `npm run pm2:logs`
3. Проверьте переменные окружения

### Высокое потребление памяти
- Уменьшите количество инстансов в `ecosystem.config.cjs`
- Измените `instances: 'max'` на конкретное число, например `instances: 2`

### Порт занят
- Измените порт в `ecosystem.config.cjs` в секции `env_production.PORT`
