# ARE Start Script
# Wechselt ins ARE Verzeichnis, aktualisiert Repository und startet Azure Login

# Ins ARE Verzeichnis wechseln
Set-Location (Join-Path $env:USERPROFILE 'ARE')

# CA-Zertifikat Umgebungsvariablen konfigurieren
Write-Host "Konfiguriere CA-Zertifikat Umgebungsvariablen..."

$legacyCertPath = Join-Path $env:USERPROFILE 'Tools\azure-cli\lib\site-packages\certifi\cacert.pem'
$cacertPath = Join-Path $env:USERPROFILE 'cacert.pem'

if (Test-Path $legacyCertPath) {
    Write-Host "  Kopiere CA-Zertifikat nach $cacertPath"
    Copy-Item -Path $legacyCertPath -Destination $cacertPath -Force
}
else {
    Write-Host "  Altes CA-Zertifikat wurde nicht gefunden, verwende vorhandene Datei im Benutzerverzeichnis"
}

$envVarsToSet = @{
    'REQUESTS_CA_BUNDLE'  = $cacertPath     # Python/Azure CLI
    'SSL_CERT_FILE'       = $cacertPath     # General SSL
    'CURL_CA_BUNDLE'      = $cacertPath     # cURL
    'NODE_EXTRA_CA_CERTS' = $cacertPath     # Node.js
    'PYTHONHTTPSVERIFY'   = '1'             # Python HTTPS verification
    'GIT_SSL_CAINFO'      = $cacertPath     # Git SSL
}

Write-Host "Aktualisiere Umgebungsvariablen..."
foreach ($envVar in $envVarsToSet.GetEnumerator()) {
    Write-Host "  Setze $($envVar.Key) = $($envVar.Value)"
    [Environment]::SetEnvironmentVariable($envVar.Key, $envVar.Value, 'User')
    Set-Item -Path "env:$($envVar.Key)" -Value $envVar.Value
}

Write-Host "Umgebungsvariablen aktualisiert!"

# Repository zurücksetzen und aktualisieren
Write-Host "Repository wird aktualisiert..."
git reset --hard
git pull

# Bei Azure anmelden
Write-Output "" | & az login --allow-no-subscriptions


# Packages aktualisieren
Write-Host "Packages werden aktualisiert..."
npm install --silent

Write-Host "ARE Start abgeschlossen!" 