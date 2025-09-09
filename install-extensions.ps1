# Extension Installation Script
# Installiert alle benötigten VS Code Extensions für ARE

Write-Host "Installing VS Code Extensions..." -ForegroundColor Cyan

# Finde code-insiders executable
$codeInsiders = $null
$possiblePaths = @(
    "code-insiders",
    "${env:LOCALAPPDATA}\Programs\Microsoft VS Code Insiders\bin\code-insiders.cmd",
    "${env:PROGRAMFILES}\Microsoft VS Code Insiders\bin\code-insiders.cmd"
)

foreach ($path in $possiblePaths) {
    try {
        $null = Get-Command $path -ErrorAction Stop
        $codeInsiders = $path
        Write-Host "Found code-insiders at: $path" -ForegroundColor Green
        break
    }
    catch {
        # Continue to next path
    }
}

if (-not $codeInsiders) {
    Write-Host "✗ code-insiders not found in PATH or standard locations" -ForegroundColor Red
    exit 1
}

$extensions = @(
    'adamerose.markdown-wysiwyg',
    'ms-azuretools.vscode-azure-mcp-server',
    'ms-vscode.azurecli',
    'ms-azuretools.azure-dev',
    'ms-azuretools.vscode-azureresourcegroups',
    'ms-azuretools.vscode-azure-github-copilot'
)

foreach ($ext in $extensions) {
    Write-Host "Installing $ext..." -ForegroundColor Yellow
    try {
        $result = & $codeInsiders --install-extension $ext --force 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ $ext installed successfully" -ForegroundColor Green
        }
        else {
            Write-Host "✗ Failed to install $ext - Exit code: $LASTEXITCODE" -ForegroundColor Red
            Write-Host "Output: $result" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "✗ Exception installing $ext : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Extension installation completed!" -ForegroundColor Green