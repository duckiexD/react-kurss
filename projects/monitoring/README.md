# Мониторинг сайтов группы (модуль 3)

Проект модуля 3 внутри репозитория `react-kurss`: несколько экранов (сводка, страница
сайта, «О проверке», «Не найдено»), данные через контекст, публикация на GitHub Pages,
ночная проверка по расписанию и оповещение в Telegram при изменениях.

Сайт: `https://duckiexd.github.io/react-kurss/`

Конвейеры лежат в корне репозитория: `.github/workflows/deploy.yml` и
`.github/workflows/check.yml` (с `working-directory: monitoring`).

## Запуск (из папки monitoring)

```
npm install
npm run dev              # localhost:5173/react-kurss/
node scripts/check.mjs   # проверка сайтов вручную, пишет public/data/results.json
npm run build
npm run lint
npm run preview          # localhost:4173/react-kurss/
```

## Что настроить на GitHub (репозиторий react-kurss)

1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Secrets and variables → Actions → два секрета:
   `TELEGRAM_TOKEN` и `TELEGRAM_CHAT_ID` (бот из модуля 1). В коде их нет.
3. Actions → «Ночная проверка сайтов» → Run workflow — проверка и публикация.
   Дальше конвейер сам запускается в 00:00 по Москве (21:00 UTC).

## Список сайтов

`public/data/sites.json` — заменить адреса на сайты своей группы (не меньше пяти,
у каждого свой `id` латиницей). Тестовый неработающий адрес `monitoring-test`
оставлен, чтобы видеть сбой и проверить оповещение.

Однокурсники добавляют в свои мониторы адрес `https://duckiexd.github.io/react-kurss/`.

После коммитов бота работа начинается с `git pull`.