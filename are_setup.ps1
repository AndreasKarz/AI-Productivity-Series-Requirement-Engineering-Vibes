# =========================================================================
# Entwicklungsumgebung Setup Script
# Installiert: Git, Az Module, VS Code Insiders, Node.js
# Autor: Andreas Karz
# =========================================================================

param(
    [string]$NodeVersion = "v22.18.0"
)

function Write-Status {
    param([string]$Message, [string]$Status = "Info")
    switch ($Status) {
        "Success" { Write-Host "[OK] $Message" -ForegroundColor Green }
        "Warning" { Write-Host "[!] $Message" -ForegroundColor Yellow }
        "Error" { Write-Host "[X] $Message" -ForegroundColor Red }
        default { Write-Host "-> $Message" -ForegroundColor Cyan }
    }
}

Clear-Host
Write-Host "========================================" -ForegroundColor Blue
Write-Host "  Entwicklungsumgebung Setup" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

# 1. Git Installation prüfen und (portabel) installieren
Write-Status "Prüfe Git Installation..."
$gitBasePath = Join-Path $env:USERPROFILE "Apps\Git\PortableGit"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Status "Git nicht gefunden, lade und installiere PortableGit..." "Warning"
    try {
        $downloadUrl = "https://github.com/git-for-windows/git/releases/latest/download/PortableGit-2.47.1-64-bit.zip"
        $appsDir = Join-Path $env:USERPROFILE 'Apps\Git'
        $zipFile = "$env:TEMP\git-portable.zip"
        
        New-Item -ItemType Directory -Path $appsDir -Force | Out-Null
        Invoke-WebRequest $downloadUrl -OutFile $zipFile -UseBasicParsing
        Expand-Archive $zipFile $appsDir -Force
        Remove-Item $zipFile
        
        Write-Status "Git erfolgreich installiert" "Success"

        Write-Status "Prüfe und aktualisiere PATH Variable..."
        $currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
        if ($currentUserPath -notlike "*$gitBasePath*") {
            $newPath = "$currentUserPath;$gitBasePath\bin;$gitBasePath\cmd"
            [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
            $env:Path = "$env:Path;$gitBasePath\bin;$gitBasePath\cmd"
            Write-Status "PATH erfolgreich aktualisiert: $gitBasePath\bin;$gitBasePath\cmd" "Success"
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
    $gitVersion = git --version
    Write-Status "Git bereits installiert: $gitVersion" "Success"
}

# 2. Repository klonen
$repoPath = Join-Path $env:USERPROFILE 'ARE'
if (-not (Test-Path $repoPath)) {
    Write-Status "Repository nicht gefunden, klone in $repoPath..." "Warning"
    git -c http.sslVerify=false clone https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes.git (Join-Path $env:USERPROFILE 'ARE')
    Write-Status "Repository erfolgreich geklont" "Success"
}
else {
    Write-Status "Repository bereits vorhanden: $repoPath" "Success"
}


# 3. Azure CLI auf Benutzerebene installieren
Write-Status "Prüfe Azure CLI Installation..."
$azDest = Join-Path $env:USERPROFILE 'Tools\azure-cli'
if (-not (Test-Path "$azDest\bin\az.cmd")) {
    Write-Status "Azure CLI nicht gefunden, installiere auf Benutzerebene..." "Warning"
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
        if (-not ($old -split ';' | ForEach-Object { $_.TrimEnd('\') }) -contains "$azDest\bin") {
            [Environment]::SetEnvironmentVariable('Path', "$old;$azDest\bin", 'User')
        }

        # Fuer die aktuelle Session sofort nutzbar machen
        $env:Path += ";$azDest\bin"

        # REQUESTS_CA_BUNDLE setzen
        $caCertPath = Join-Path $azDest 'Lib\site-packages\certifi\cacert.pem'
        if (Test-Path $caCertPath) {
            [Environment]::SetEnvironmentVariable('REQUESTS_CA_BUNDLE', $caCertPath, 'User')
            $env:REQUESTS_CA_BUNDLE = $caCertPath
        }

        Write-Status "Azure CLI erfolgreich installiert" "Success"
        
        # Funktionstest
        & "$azDest\bin\az.cmd" --version
    }
    catch {
        Write-Status "Azure CLI Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    Write-Status "Azure CLI bereits installiert" "Success"
}

# Azure PowerShell Modul
Write-Status "Prüfe Azure PowerShell Modul..."
try {
    $azModule = Get-Module -ListAvailable -Name Az -ErrorAction SilentlyContinue
    if (-not $azModule) {
        Write-Status "Az PowerShell Modul nicht gefunden, installiere..." "Warning"
        Install-Module Az -Scope CurrentUser -Force -AllowClobber -Repository PSGallery
        Write-Status "Az PowerShell Modul erfolgreich installiert" "Success"
    }
    else {
        Write-Status "Az PowerShell Modul bereits installiert (Version: $($azModule[0].Version))" "Success"
    }
}
catch {
    Write-Status "Az PowerShell Modul Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
}

# 4. Visual Studio Code Insiders
Write-Status "Prüfe VS Code Insiders..."
$vsCodePath = Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code Insiders'
$vsCodeExists = (Test-Path $vsCodePath) -or (Get-Command code-insiders -ErrorAction SilentlyContinue)

if (-not $vsCodeExists) {
    Write-Status "VS Code Insiders nicht gefunden, installiere..." "Warning"
    try {
        winget install Microsoft.VisualStudioCode.Insiders --scope user --silent
        Write-Status "VS Code Insiders erfolgreich installiert" "Success"
    }
    catch {
        Write-Status "VS Code Insiders Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    Write-Status "VS Code Insiders bereits installiert" "Success"
}

# 5. Node.js Installation
$nodeBasePath = Join-Path $env:USERPROFILE "Apps\Node\node-$NodeVersion-win-x64"
Write-Status "Prüfe Node.js Installation..."
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Status "Node.js nicht gefunden, lade und installiere..." "Warning"
    try {
        $downloadUrl = "https://nodejs.org/dist/$NodeVersion/node-$NodeVersion-win-x64.zip"
        $appsDir = Join-Path $env:USERPROFILE 'Apps\Node'
        $zipFile = "$env:TEMP\node-latest.zip"
        
        New-Item -ItemType Directory -Path $appsDir -Force | Out-Null
        Invoke-WebRequest $downloadUrl -OutFile $zipFile -UseBasicParsing
        Expand-Archive $zipFile $appsDir -Force
        Remove-Item $zipFile
        
        Write-Status "Node.js erfolgreich installiert" "Success"

        Write-Status "Prüfe und aktualisiere PATH Variable..."
        $currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
        if ($currentUserPath -notlike "*$nodeBasePath*") {
            $newPath = "$currentUserPath;$nodeBasePath"
            [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
            $env:Path = "$env:Path;$nodeBasePath"
            Write-Status "PATH erfolgreich aktualisiert: $nodeBasePath" "Success"
        }
        else {
            Write-Status "Node.js Pfad bereits im USER PATH vorhanden" "Success"
        }
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
    }
    catch {
        Write-Status "Node.js Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
}
else {
    Write-Status "Node.js bereits vorhanden: $nodeBasePath" "Success"
}

# 6. Azure Login (optional, kann übersprungen werden)
Write-Status "Starte Azure Login (kann mit Ctrl+C übersprungen werden)..."
try {
    az login --allow-no-subscriptions
    Write-Status "Azure Login erfolgreich" "Success"
}
catch {
    Write-Status "Azure Login übersprungen oder fehlgeschlagen" "Warning"
}

# 7. Desktop Shortcut für VS Code Insiders erstellen
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
        $shortcut.Arguments = "-r `"$targetPath`" `"$targetPath\.vscode\mcp.json`" -g --command workbench.action.terminal.toggleTerminal -r"
        $shortcut.WorkingDirectory = $targetPath
        $shortcut.Description = "VS Code Insiders - ARE Projekt"
        $shortcut.Save()
        Write-Status "Desktop Shortcut erfolgreich erstellt: $shortcutPath" "Success"
    }
}
catch {
    Write-Status "Fehler beim Erstellen des Desktop Shortcuts: $($_.Exception.Message)" "Error"
}

# 8. Abschluss-Hinweise
Write-Host "========================================" -ForegroundColor Blue
Write-Host "Hinweise:" -ForegroundColor Yellow
Write-Host "- Für neue Terminal-Sessions ist Node.js über 'node' und 'npm' verfügbar" -ForegroundColor Gray
Write-Host "- VS Code Insiders läuft als 'code-insiders'" -ForegroundColor Gray
Write-Host "- Desktop Shortcut 'VS Code Insiders - ARE' wurde erstellt (falls VS Code Insiders gefunden wurde)" -ForegroundColor Gray
Write-Host ("- Projekt-Verzeichnis: " + (Join-Path $env:USERPROFILE "ARE")) -ForegroundColor Gray
Write-Host "- Copilot-Link: https://github.com/orgs/swisslife-ch/sso?return_to=%2Fcopilot" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Blue

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
