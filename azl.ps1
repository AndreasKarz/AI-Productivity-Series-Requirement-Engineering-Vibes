# Zielordner festlegen
$dest = Join-Path $env:USERPROFILE 'Tools\azure-cli'

# REQUESTS_CA_BUNDLE und NODE_EXTRA_CA_CERTS setzen falls nicht vorhanden
$caCertPath = Join-Path $dest 'Lib\site-packages\certifi\cacert.pem'
$currentCaBundle = [Environment]::GetEnvironmentVariable('REQUESTS_CA_BUNDLE', 'User')
$currentNodeCaCerts = [Environment]::GetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'User')
if (-not $currentCaBundle -and (Test-Path $caCertPath)) {
    [Environment]::SetEnvironmentVariable('REQUESTS_CA_BUNDLE', $caCertPath, 'User')
    $env:REQUESTS_CA_BUNDLE = $caCertPath
}
if (-not $currentNodeCaCerts -and (Test-Path $caCertPath)) {
    [Environment]::SetEnvironmentVariable('NODE_EXTRA_CA_CERTS', $caCertPath, 'User')
    $env:NODE_EXTRA_CA_CERTS = $caCertPath
}
# npm cafile konfigurieren falls npm verfügbar
if ((Get-Command npm -ErrorAction SilentlyContinue) -and (Test-Path $caCertPath)) {
    npm config set cafile "$caCertPath" --location=user
}

# Prüfen, ob die az tools auf Benutzerlevel installiert sind
if (Test-Path "$dest\bin\az.cmd") {
    # Wenn ja - direkt Login ausführen
    Write-Output "" | & "$dest\bin\az.cmd" login --allow-no-subscriptions
    
    # npm install ausführen falls package.json vorhanden
    if (Test-Path "package.json") {
        Write-Host "Packages werden aktualisiert..." -ForegroundColor Yellow
        npm install --silent
    }
}
else {
    # Wenn nicht - Installation durchführen
    $tmp = Join-Path $env:TEMP 'azure-cli.zip'
    New-Item -ItemType Directory -Path $dest -Force | Out-Null

    # Offizielles aktuelles ZIP (x64) laden
    Invoke-WebRequest 'https://aka.ms/installazurecliwindowszipx64' -OutFile $tmp

    # Entpacken und aufraeumen
    Expand-Archive -Path $tmp -DestinationPath $dest -Force
    Remove-Item $tmp

    # PATH fuer den Benutzer persistent ergaenzen
    $old = [Environment]::GetEnvironmentVariable('Path', 'User')
    if (-not ($old -split ';' | ForEach-Object { $_.TrimEnd('\') }) -contains "$dest\bin") {
        [Environment]::SetEnvironmentVariable('Path', "$old;$dest\bin", 'User')
    }

    # Fuer die aktuelle Session sofort nutzbar machen
    $env:Path += ";$dest\bin"

    # REQUESTS_CA_BUNDLE und NODE_EXTRA_CA_CERTS nach Installation setzen
    $caCertPath = Join-Path $dest 'Lib\site-packages\certifi\cacert.pem'
    if (Test-Path $caCertPath) {
        [Environment]::SetEnvironmentVariable('REQUESTS_CA_BUNDLE', $caCertPath, 'User')
        $env:REQUESTS_CA_BUNDLE = $caCertPath
        [Environment]::SetEnvironmentVariable('NODE_EXTRA_CA_CERTS', $caCertPath, 'User')
        $env:NODE_EXTRA_CA_CERTS = $caCertPath
        # npm cafile konfigurieren falls npm verfügbar
        if (Get-Command npm -ErrorAction SilentlyContinue) {
            npm config set cafile "$caCertPath" --location=user
        }
    }

    # Funktionstest
    & "$dest\bin\az.cmd" --version

    # Login ausführen
    Write-Output "" | & "$dest\bin\az.cmd" login --allow-no-subscriptions
    
    # npm install ausführen falls package.json vorhanden
    if (Test-Path "package.json") {
        Write-Host "Packages werden aktualisiert..." -ForegroundColor Yellow
        npm install --silent
    }
}
