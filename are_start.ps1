# ARE Start Script
# Wechselt ins ARE Verzeichnis, aktualisiert Repository und startet Azure Login

# Ins ARE Verzeichnis wechseln
Set-Location (Join-Path $env:USERPROFILE 'ARE')

# CA-Zertifikat Umgebungsvariablen konfigurieren
Write-Host "Konfiguriere CA-Zertifikat Umgebungsvariablen..." -ForegroundColor Cyan

$cacertPath = Join-Path $env:USERPROFILE 'Tools\azure-cli\lib\site-packages\certifi\cacert.pem'
$envVarsToSet = @{
    'REQUESTS_CA_BUNDLE'  = $cacertPath      # Python/Azure CLI
    'SSL_CERT_FILE'       = $cacertPath           # General SSL
    'CURL_CA_BUNDLE'      = $cacertPath          # cURL
    'NODE_EXTRA_CA_CERTS' = $cacertPath     # Node.js
    'PYTHONHTTPSVERIFY'   = '1'               # Python HTTPS verification
}

$envVarsChanged = $false

foreach ($envVar in $envVarsToSet.GetEnumerator()) {
    $currentValue = [Environment]::GetEnvironmentVariable($envVar.Key, 'User')
    
    if ($currentValue -ne $envVar.Value) {
        Write-Host "  Setze $($envVar.Key) = $($envVar.Value)" -ForegroundColor Yellow
        [Environment]::SetEnvironmentVariable($envVar.Key, $envVar.Value, 'User')
        $envVarsChanged = $true
    }
    else {
        Write-Host "  $($envVar.Key) bereits korrekt gesetzt" -ForegroundColor Green
    }
}

# Umgebungsvariablen neu laden falls Änderungen vorgenommen wurden
if ($envVarsChanged) {
    Write-Host "Lade Umgebungsvariablen neu..." -ForegroundColor Yellow
    foreach ($envVar in $envVarsToSet.GetEnumerator()) {
        $env:($envVar.Key) = $envVar.Value
    }
    Write-Host "Umgebungsvariablen aktualisiert!" -ForegroundColor Green
}
else {
    Write-Host "Alle CA-Zertifikat Umgebungsvariablen bereits korrekt konfiguriert" -ForegroundColor Green
}

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
    Write-Output "" | & az login --allow-no-subscriptions
}

# Packages aktualisieren
Write-Host "Packages werden aktualisiert..." -ForegroundColor Yellow
npm install --silent

Write-Host "ARE Start abgeschlossen!" -ForegroundColor Green 