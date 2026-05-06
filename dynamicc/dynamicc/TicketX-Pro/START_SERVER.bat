@echo off
REM TicketX Pro - Windows Launcher
REM This script runs the website without needing Node.js or manual setup

echo.
echo ╔════════════════════════════════════════╗
echo ║    🎟️  TicketX Pro - Launching 🎟️      ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Python not found. Trying alternative method...
    echo.
    REM Try to open index.html directly
    start "" "%CD%\index.html"
    echo ✓ Opened index.html in default browser
    echo.
    echo 📝 Note: Website works in browser (no server needed for basic features)
    echo 🔧 For backend features, install Node.js from https://nodejs.org/
    pause
) else (
    echo ✓ Python found. Starting server...
    echo ✓ Server: http://localhost:3000
    echo ✓ Website: http://localhost:3000/index.html
    echo.
    echo 🌐 Opening in browser...
    timeout /t 2 /nobreak
    start "" "http://localhost:3000"
    echo.
    echo 💡 Press Ctrl+C in this window to stop the server
    echo.
    
    python run_server.py
)
