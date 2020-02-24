@echo off
set /p confirm=Really want to backup and deploy? (y/n):
if "%confirm%"=="y" (
    echo starting...
    call hexo_clean.bat
    call hexo_backup.bat
    call hexo_deploy.bat
    echo done!
)