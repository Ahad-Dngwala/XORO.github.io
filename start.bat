@echo off
echo ========================================
echo   XORO - Kanban Task Manager
echo   Starting all services...
echo ========================================
echo.

REM Check if PostgreSQL is running (optional check)
echo [1/3] Checking PostgreSQL connection...
REM You can add a check here if needed
echo    PostgreSQL check skipped (ensure database is running)
echo.

REM Start Backend Server
echo [2/3] Starting Backend Server...
start "XORO Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
echo    Backend server starting on http://localhost:3001
echo.

REM Start Frontend Server
echo [3/3] Starting Frontend Server...
start "XORO Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 2 /nobreak >nul
echo    Frontend server starting on http://localhost:5173
echo.

echo ========================================
echo   All services are starting!
echo ========================================
echo.
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:5173
echo   API:      http://localhost:3001/api/tasks
echo.
echo   Press any key to exit this window...
echo   (The servers will continue running in separate windows)
echo.
pause >nul

