# ARE - Agentic Requirements Engineering Setup
# Automatische Installation aller benötigten Tools für die Entwicklungsumgebung

param(
    [string]$NodeVersion = "v20.11.0"
)

# Fehlerbehandlung aktivieren
$ErrorActionPreference = 'Stop'

function Write-Status {
    param([string]$Message, [string]$Status = "Info")
    switch ($Status) {
        "Success" { Write-Host "[OK] $Message" }
        "Warning" { Write-Host "[!] $Message" }
        "Error" { Write-Host "[X] $Message" }
        default { Write-Host "-> $Message" }
    }
}

Clear-Host
Write-Host "========================================"
Write-Host "  Entwicklungsumgebung Setup"
Write-Host "========================================"

# 1. Git Installation prüfen und (portabel) installieren
Write-Status "Prüfe Git Installation..."
$gitBasePath = Join-Path $env:USERPROFILE "Apps\Git\PortableGit"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Status "Git nicht gefunden, lade und installiere PortableGit..." "Warning"
    try {
        $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/PortableGit-2.42.0.2-64-bit.7z.exe"
        $gitInstaller = Join-Path $env:TEMP "git-portable.exe"
        
        New-Item -ItemType Directory -Path $gitBasePath -Force | Out-Null
        Invoke-WebRequest $gitUrl -OutFile $gitInstaller -UseBasicParsing
        Start-Process $gitInstaller -ArgumentList "-o`"$gitBasePath`"", "-y" -Wait
        Remove-Item $gitInstaller
        
        Write-Status "Git erfolgreich installiert" "Success"

        Write-Status "Prüfe und aktualisiere PATH Variable..."
        $currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
        $gitBinPath = Join-Path $gitBasePath 'bin'
        $gitCmdPath = Join-Path $gitBasePath 'cmd'
        if ($currentUserPath -notlike "*$gitBasePath*") {
            $newPath = "$currentUserPath; $gitBinPath; $gitCmdPath"
            [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
            $env:Path = "$env:Path; $gitBinPath; $gitCmdPath"
            Write-Status "PATH erfolgreich aktualisiert: $gitBinPath; $gitCmdPath" "Success"
        }
        else {
            Write-Status "Git Pfad bereits im USER PATH vorhanden" "Success"
        }
        
    }
    catch {
        Write-Status "Git Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    $gitVersion = & git --version
    Write-Status "Git bereits installiert: $gitVersion" "Success"
}

# 2. Repository klonen falls nicht vorhanden
$repoPath = Join-Path $env:USERPROFILE "ARE"
if (-not (Test-Path $repoPath)) {
    Write-Status "Repository nicht gefunden, klone in $repoPath..." "Warning"
    git clone https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes.git $repoPath
    Write-Status "Repository erfolgreich geklont" "Success"
}
else {
    Write-Status "Repository bereits vorhanden: $repoPath" "Success"
}

# 3. Azure CLI auf Benutzerebene installieren
Write-Status "Prüfe Azure CLI Installation..."
$azDest = Join-Path $env:USERPROFILE "Tools\azure-cli"
$azBinPath = Join-Path $azDest 'bin'
$azCmdPath = Join-Path $azBinPath 'az.cmd'
if (-not (Test-Path $azCmdPath)) {
    Write-Status "Azure CLI nicht gefunden, installiere auf Benutzerebene..." 
    try {
        $tmp = Join-Path $env:TEMP 'azure-cli.zip'
        New-Item -ItemType Directory -Path $azDest -Force | Out-Null

        # Offizielles aktuelles ZIP (x64) laden
        Invoke-WebRequest 'https://aka.ms/installazurecliwindowszipx64' -OutFile $tmp -UseBasicParsing

        # Entpacken und aufraeumen
        Expand-Archive -Path $tmp -DestinationPath $azDest -Force
        Remove-Item $tmp

        # PATH fuer den Benutzer persistent ergaenzen
        $old = [Environment]::GetEnvironmentVariable('Path', 'User')
        if (-not ($old -split ';' | ForEach-Object { $_.TrimEnd('\') }) -contains $azBinPath) {
            [Environment]::SetEnvironmentVariable('Path', "$old; $azBinPath", 'User')
        }

        # Fuer die aktuelle Session sofort nutzbar machen
        $env:Path += "; $azBinPath"

        # REQUESTS_CA_BUNDLE und NODE_EXTRA_CA_CERTS setzen
        $caCertPath = Join-Path $azDest 'Lib\site-packages\certifi\cacert.pem'
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

        Write-Status "Azure CLI erfolgreich installiert" "Success"
        
        # Funktionstest
        & $azCmdPath --version
    }
    catch {
        Write-Status "Azure CLI Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    Write-Status "Azure CLI bereits installiert" "Success"
}

# 4. Azure PowerShell Modul prüfen
Write-Status "Prüfe Azure PowerShell Modul..."
try {
    $azModule = Get-Module -ListAvailable -Name Az
    if (-not $azModule) {
        Write-Status "Az PowerShell Modul nicht gefunden, installiere..." "Warning"
        Install-Module -Name Az -Repository PSGallery -Force -AllowClobber -Scope CurrentUser
        Write-Status "Az PowerShell Modul erfolgreich installiert" "Success"
    }
    else {
        Write-Status "Az PowerShell Modul bereits installiert (Version: $($azModule[0].Version))" "Success"
    }
}
catch {
    Write-Status "Fehler beim Azure PowerShell Modul: $($_.Exception.Message)" "Error"
}

# 5. Node.js Installation
$nodeBasePath = Join-Path $env:USERPROFILE "Apps\Node\node-$NodeVersion-win-x64"
Write-Status "Prüfe Node.js Installation..."
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Status "Node.js nicht gefunden, lade und installiere..." "Warning"
    try {
        $downloadUrl = "https://nodejs.org/dist/$NodeVersion/node-$NodeVersion-win-x64.zip"
        $appsDir = Join-Path $env:USERPROFILE 'Apps\Node'
        $zipFile = Join-Path $env:TEMP 'node-latest.zip'
        
        New-Item -ItemType Directory -Path $appsDir -Force | Out-Null
        Invoke-WebRequest $downloadUrl -OutFile $zipFile -UseBasicParsing
        Expand-Archive $zipFile $appsDir -Force
        Remove-Item $zipFile
        
        Write-Status "Node.js erfolgreich installiert" "Success"

        Write-Status "Prüfe und aktualisiere PATH Variable..."
        $currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
        if ($currentUserPath -notlike "*$nodeBasePath*") {
            $newPath = "$currentUserPath; $nodeBasePath"
            [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
            $env:Path = "$env:Path; $nodeBasePath"
            Write-Status "PATH erfolgreich aktualisiert: $nodeBasePath" "Success"
        }
        else {
            Write-Status "Node.js Pfad bereits im USER PATH vorhanden" "Success"
        }
        
        # PATH für aktuelle Session laden
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + "; " + [System.Environment]::GetEnvironmentVariable("Path", "User")
    }
    catch {
        Write-Status "Node.js Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    Write-Status "Node.js bereits vorhanden: $nodeBasePath" "Success"
}

# 6. NPM Packages installieren
Write-Status "Installiere NPM Packages..."
try {
    Set-Location $repoPath
    npm install
    Write-Status "NPM Packages erfolgreich installiert" "Success"
}
catch {
    Write-Status "NPM Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
}

# 7. VS Code Insiders prüfen und installieren falls nötig
Write-Status "Prüfe VS Code Insiders Installation..."
if (-not (Get-Command code-insiders -ErrorAction SilentlyContinue)) {
    Write-Status "VS Code Insiders nicht gefunden, lade und installiere..." "Warning"
    try {
        $vscodeUrl = "https://update.code.visualstudio.com/latest/win32-x64-user/insider"
        $vscodeInstaller = Join-Path $env:TEMP "vscode-insiders.exe"
        
        Invoke-WebRequest $vscodeUrl -OutFile $vscodeInstaller -UseBasicParsing
        Start-Process $vscodeInstaller -ArgumentList "/verysilent", "/mergetasks=!runcode" -Wait
        Remove-Item $vscodeInstaller
        
        Write-Status "VS Code Insiders erfolgreich installiert" "Success"
    }
    catch {
        Write-Status "VS Code Insiders Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    Write-Status "VS Code Insiders bereits installiert" "Success"
}

# 8. Desktop Shortcut erstellen
Write-Status "Erstelle Desktop Shortcut für VS Code Insiders..."
try {
    $desktopPath = [Environment]::GetFolderPath("Desktop")
    $shortcutPath = Join-Path $desktopPath "VS Code Insiders - ARE.lnk"
    $targetPath = Join-Path $env:USERPROFILE "ARE"

    $possiblePaths = @(
        "$env:LOCALAPPDATA\Programs\Microsoft VS Code Insiders\Code - Insiders.exe",
        "$env:PROGRAMFILES\Microsoft VS Code Insiders\Code - Insiders.exe"
    )

    $vscodeExe = $possiblePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

    if ($vscodeExe) {
        $WScriptShell = New-Object -ComObject WScript.Shell
        $shortcut = $WScriptShell.CreateShortcut($shortcutPath)
        $shortcut.TargetPath = $vscodeExe
        # $shortcut.Arguments = "-r `"$targetPath`" `"$targetPath\.vscode\mcp.json`" -g --command workbench.action.terminal.toggleTerminal -r"
        $shortcut.WorkingDirectory = $targetPath
        $shortcut.Description = "VS Code Insiders - ARE Projekt"
        $shortcut.Save()
        Write-Status "Desktop Shortcut erfolgreich erstellt: $shortcutPath" "Success"
    }
}
catch {
    Write-Status "Fehler beim Erstellen des Desktop Shortcuts: $($_.Exception.Message)" "Error"
}

# 9. Abschluss-Hinweise
Write-Host "========================================"
Write-Host "Hinweise:"
Write-Host "- Für neue Terminal-Sessions ist Node.js über 'node' und 'npm' verfügbar"
Write-Host "- VS Code Insiders läuft als 'code-insiders'"
Write-Host "- Desktop Shortcut 'VS Code Insiders - ARE' wurde erstellt (falls VS Code Insiders gefunden wurde)"
Write-Host ("- Projekt-Verzeichnis: " + (Join-Path $env:USERPROFILE "ARE"))
Write-Host "- Copilot-Link: https://github.com/orgs/swisslife-ch/sso?return_to=%2Fcopilot"
Write-Host "========================================"

# 9. VS Code Insiders starten
Write-Status "Starte VS Code Insiders..."
try {
    Set-Location $repoPath
    code-insiders .
    Write-Status "VS Code Insiders gestartet im Repository-Verzeichnis" "Success"
}
catch {
    Write-Status "VS Code Insiders konnte nicht gestartet werden: $($_.Exception.Message)" "Warning"
}