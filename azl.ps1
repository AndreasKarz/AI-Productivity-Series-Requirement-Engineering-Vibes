# Zielordner festlegen
$dest = Join-Path $env:USERPROFILE 'Tools\azure-cli'

# REQUESTS_CA_BUNDLE setzen falls nicht vorhanden
$caCertPath = Join-Path $dest 'Lib\site-packages\certifi\cacert.pem'
$currentCaBundle = [Environment]::GetEnvironmentVariable('REQUESTS_CA_BUNDLE', 'User')
if (-not $currentCaBundle -and (Test-Path $caCertPath)) {
    [Environment]::SetEnvironmentVariable('REQUESTS_CA_BUNDLE', $caCertPath, 'User')
    $env:REQUESTS_CA_BUNDLE = $caCertPath
}

# Prüfen, ob die az tools auf Benutzerlevel installiert sind
if (Test-Path "$dest\bin\az.cmd") {
    # Wenn ja - direkt Login ausführen
    echo "" | & "$dest\bin\az.cmd" login --allow-no-subscriptions
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

    # REQUESTS_CA_BUNDLE nach Installation setzen
    $caCertPath = Join-Path $dest 'Lib\site-packages\certifi\cacert.pem'
    if (Test-Path $caCertPath) {
        [Environment]::SetEnvironmentVariable('REQUESTS_CA_BUNDLE', $caCertPath, 'User')
        $env:REQUESTS_CA_BUNDLE = $caCertPath
    }

    # Funktionstest
    & "$dest\bin\az.cmd" --version

    # Login ausführen
    echo "" | & "$dest\bin\az.cmd" login --allow-no-subscriptions
}
