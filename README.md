# Task Manager — Учебный проект

## Установка и запуск бэкенда

1. Открыть терминал в папке `backend/` (команда cd backend)

2. Активировать venv:
  Windows (Git Bash): source venv/Scripts/activate

Windows (CMD): venv\Scripts\activate

3. Установить зависимости:
  pip install -r requirements.txt

4. Запустить сервер:
  bash
  uvicorn app.main:app --reload
  Сервер доступен на http://localhost:8000

## Установка и запуск фронтенда

1. Открыть терминал в папке `frontend/`
  cd frontend

2. Запустить:
  bash
  npm run dev
  Фронтенд доступен на http://localhost:5173


