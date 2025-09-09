# ARE Start Script
# Wechselt ins ARE Verzeichnis, aktualisiert Repository und startet Azure Login

# Ins ARE Verzeichnis wechseln
Set-Location (Join-Path $env:USERPROFILE 'ARE')

# Repository zurücksetzen und aktualisieren
Write-Host "Repository wird aktualisiert..." -ForegroundColor Yellow
git reset --hard
git pull --force

# Prüfen ob Azure CLI installiert ist
$azCliPath = Join-Path $env:USERPROFILE 'Tools\azure-cli\bin\az.cmd'
if (-not (Test-Path $azCliPath)) {
    Write-Host "Lokales Azure CLI nicht gefunden, führe Installation und Login aus..." -ForegroundColor Yellow
    .\azl.ps1
}
else {
    Write-Host "Azure CLI gefunden, führe Login aus..." -ForegroundColor Green
    az login --allow-no-subscriptions
    az account show
}

# Packages aktualisieren
Write-Host "Packages werden aktualisiert..." -ForegroundColor Yellow
npm install --silent

Write-Host "ARE Start abgeschlossen!" -ForegroundColor Green 