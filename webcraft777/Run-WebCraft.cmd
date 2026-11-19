@echo off
cd /d "%~dp0"
node preview.mjs --open
if errorlevel 1 pause
