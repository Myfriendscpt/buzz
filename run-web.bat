@echo off
cd /d "%~dp0"
echo Starting Buzz Web Development Server...
"C:\Program Files\nodejs\corepack.cmd" pnpm --filter buzz-web dev --host 0.0.0.0
pause

