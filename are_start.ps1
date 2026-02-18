# ARE Start Script
# Wechselt ins ARE Verzeichnis, aktualisiert Repository und startet Azure Login

# Ins ARE Verzeichnis wechseln
Set-Location (Join-Path $env:USERPROFILE 'ARE')

# Node.js PATH bereinigen (Dubletten entfernen und korrekten Pfad setzen)
Write-Host "Bereinige Node.js PATH..."
$nodeVersion = "v22.18.0"
$nodeBasePath = Join-Path $env:USERPROFILE "Apps\Node\node-$nodeVersion-win-x64"
$npmBasePath = Join-Path $nodeBasePath "node_modules\npm\bin"
$pathsToAdd = @($nodeBasePath, $npmBasePath)

# Entferne alle existierenden Node.js-Pfade aus User PATH um Dubletten zu vermeiden
$currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$pathEntries = $currentUserPath -split ';' | Where-Object { $_.Trim() -ne '' }
$cleanedEntries = $pathEntries | Where-Object { 
    $entry = $_.Trim().TrimEnd('\').ToLower()
    -not ($entry -like '*\node\*' -or $entry -like '*\node')
}
$cleanedPath = ($cleanedEntries -join ';')

# Füge die korrekten Node.js-Pfade hinzu
$newPath = "$cleanedPath;$($pathsToAdd -join ';')"
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

# Aktualisiere auch die aktuelle Session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + $newPath
Write-Host "Node.js PATH bereinigt: $($pathsToAdd -join '; ')"

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

# Repository aktualisieren
Write-Host "Repository wird aktualisiert..."
git config --global --unset credential.helper
git config --global --unset credential.usehttppath
git config --global --unset credential.guiprompt
git config --global --unset credential.githubauthmodes
git config --global --unset credential.msauthflow
git config --global --unset credential.interactivemode

git remote set-url origin https://github.com/AndreasKarz/Agentic-BA-RE-Tester-Setup.git
git fetch origin
git checkout main 2>$null
git reset --hard origin/main
git pull --force

# Bei Azure anmelden
Write-Output "" | & az login --allow-no-subscriptions


# Packages aktualisieren
Write-Host "Packages werden aktualisiert..."
npm install --silent

Write-Host "ARE Start abgeschlossen!" 