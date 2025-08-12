# =========================================================================
# Entwicklungsumgebung Setup Script
# Installiert: Git, Az Module, VS Code Insiders, Node.js
# Autor: Andreas Karz
# =========================================================================

param(
    [string]$NodeVersion = "v22.18.0"
)

# Hilfsfunktion für farbige Ausgaben
function Write-Status {
    param([string]$Message, [string]$Status = "Info")
    switch ($Status) {
        "Success" { Write-Host "✓ $Message" -ForegroundColor Green }
        "Warning" { Write-Host "⚠ $Message" -ForegroundColor Yellow }
        "Error"   { Write-Host "✗ $Message" -ForegroundColor Red }
        default   { Write-Host "→ $Message" -ForegroundColor Cyan }
    }
}

Write-Host "========================================" -ForegroundColor Blue
Write-Host "  Entwicklungsumgebung Setup" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue

# 1. Git Installation prüfen und installieren
Write-Status "Prüfe Git Installation..."
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Status "Git nicht gefunden, installiere über winget..." "Warning"
    try {
        winget install --id Git.Git -e --source winget --scope user --silent
        Write-Status "Git erfolgreich installiert" "Success"
    } catch {
        Write-Status "Git Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
        exit 1
    }
} else {
    $gitVersion = git --version
    Write-Status "Git bereits installiert: $gitVersion" "Success"
}

# 2. Repository klonen
$repoPath = Join-Path $env:USERPROFILE 'ARE'
Write-Status "Prüfe Repository..."
if (-not (Test-Path $repoPath)) {
    Write-Status "Repository nicht gefunden, lade herunter..." "Warning"
    try {
        Set-Location $env:USERPROFILE
        git clone https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes.git
        Write-Status "Repository erfolgreich geklont" "Success"
    } catch {
        Write-Status "Repository konnte nicht geklont werden: $($_.Exception.Message)" "Error"
    }
} else {
    Write-Status "Repository bereits vorhanden: $repoPath" "Success"
}

# 3. Azure PowerShell Modul
Write-Status "Prüfe Azure PowerShell Modul..."
if (-not (Get-Module -ListAvailable -Name Az.Accounts)) {
    Write-Status "Az Modul nicht gefunden, installiere..." "Warning"
    try {
        Install-Module Az -Scope CurrentUser -Force -AllowClobber -Repository PSGallery
        Write-Status "Az Modul erfolgreich installiert" "Success"
    } catch {
        Write-Status "Az Modul Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
} else {
    Write-Status "Az Modul bereits installiert" "Success"
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
    } catch {
        Write-Status "VS Code Insiders Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
} else {
    Write-Status "VS Code Insiders bereits installiert" "Success"
}

# 5. Node.js Installation
$nodeBasePath = Join-Path $env:USERPROFILE "Apps\node-$NodeVersion-win-x64"
Write-Status "Prüfe Node.js Installation..."

if (-not (Test-Path $nodeBasePath)) {
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
    } catch {
        Write-Status "Node.js Installation fehlgeschlagen: $($_.Exception.Message)" "Error"
    }
} else {
    Write-Status "Node.js bereits vorhanden: $nodeBasePath" "Success"
}

# 6. npm Update
if (Test-Path $nodeBasePath) {
    $npmPath = Join-Path $nodeBasePath 'npm.cmd'
    if (Test-Path $npmPath) {
        Write-Status "Aktualisiere npm auf neueste Version..."
        try {
            & $npmPath install -g npm@latest
            Write-Status "npm erfolgreich aktualisiert" "Success"
        } catch {
            Write-Status "npm Update fehlgeschlagen: $($_.Exception.Message)" "Warning"
        }
    }
}

# 7. PATH Variable setzen
Write-Status "Prüfe und aktualisiere PATH Variable..."
$currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($currentUserPath -notlike "*$nodeBasePath*") {
    $newPath = "$currentUserPath;$nodeBasePath"
    [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
    $env:Path = "$env:Path;$nodeBasePath"
    Write-Status "PATH erfolgreich aktualisiert: $nodeBasePath" "Success"
} else {
    Write-Status "Node.js Pfad bereits im USER PATH vorhanden" "Success"
}

# 8. Azure Login (optional, kann übersprungen werden)
Write-Status "Starte Azure Login (kann mit Ctrl+C übersprungen werden)..."
try {
    az login --allow-no-subscriptions
    Write-Status "Azure Login erfolgreich" "Success"
} catch {
    Write-Status "Azure Login übersprungen oder fehlgeschlagen" "Warning"
}

# 9. VS Code Insiders starten
Write-Status "Starte VS Code Insiders..."
try {
    if ($repoPath -and (Test-Path $repoPath)) {
        Set-Location $repoPath
        code-insiders .
        Write-Status "VS Code Insiders gestartet im Repository-Verzeichnis" "Success"
    } else {
        code-insiders .
        Write-Status "VS Code Insiders gestartet" "Success"
    }
} catch {
    Write-Status "VS Code Insiders konnte nicht gestartet werden: $($_.Exception.Message)" "Warning"
}

Write-Host "`n========================================" -ForegroundColor Blue
Write-Status "Setup abgeschlossen!" "Success"
Write-Host "Hinweise:" -ForegroundColor Yellow
Write-Host "- Für neue Terminal-Sessions ist Node.js über 'node' und 'npm' verfügbar" -ForegroundColor Gray
Write-Host "- VS Code Insiders läuft als 'code-insiders'" -ForegroundColor Gray
Write-Host "- Copilot-Link: https://github.com/orgs/swisslife-ch/sso?return_to=%2Fcopilot" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Blue
