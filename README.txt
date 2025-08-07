# FORMA MODELS — пакет ускорения загрузки

Что внутри:
- index.html — патченый: preconnect для шрифтов, preload='none' + poster для видео, cache-busting для script.js
- script.js — безопасный прелоадер с фолбэком (скроет экран через 5 сек)
- /favicon.ico — чтобы убрать 404
- /assets/poster.jpg — постер для видео
- /assets/textures/noise.png — локальная текстура
- /assets/textures/cubes.png — локальная текстура

Что сделать в проекте:
1) Заменить ваш index.html на этот.
2) Заменить ваш script.js на этот.
3) Добавить файлы: /favicon.ico, /assets/poster.jpg, /assets/textures/noise.png, /assets/textures/cubes.png

Важно: Откройте `styles.css` и замените внешние/битые фоновые картинки на локальные:
ИСКАТЬ (или удалить):
  url("noise.png")
  url("https://www.transparenttextures.com/patterns/cubes.png")

ЗАМЕНИТЬ НА:
  url("/assets/textures/noise.png")
  url("/assets/textures/cubes.png")

Дополнительно:
- После замены обновите страницу с Ctrl+F5.
- Если используете кастомный домен/Pages — подождите 1–10 минут на CDN.