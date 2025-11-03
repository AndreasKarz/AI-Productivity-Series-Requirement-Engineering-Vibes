# Clear NPM cache and reinstall packages
Write-Host "Clearing NPM cache..." -ForegroundColor Yellow

# Remove APPDATA npm-cache
Write-Host "Removing npm-cache from APPDATA..." -ForegroundColor Cyan
Remove-Item -Recurse -Force "$env:APPDATA\npm-cache" -ErrorAction SilentlyContinue

# Remove LOCALAPPDATA npm-cache
Write-Host "Removing npm-cache from LOCALAPPDATA..." -ForegroundColor Cyan
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\npm-cache" -ErrorAction SilentlyContinue

Write-Host "NPM cache cleared successfully!" -ForegroundColor Green

# Reinstall packages
Write-Host "Installing npm packages..." -ForegroundColor Yellow
npm install --force

Write-Host "Done!" -ForegroundColor Green
