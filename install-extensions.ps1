# Extension Installation Script
# Installiert alle benötigten VS Code Extensions für ARE

Write-Host "Installing VS Code Extensions..."

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
        Write-Host "Found code-insiders at: $path"
        break
    }
    catch {
        # Continue to next path
    }
}

if (-not $codeInsiders) {
    Write-Host "X code-insiders not found in PATH or standard locations"
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
    Write-Host "Installing $ext..."
    try {
        $result = & $codeInsiders --install-extension $ext --force 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "OK $ext installed successfully"
        }
        else {
            Write-Host "FAIL $ext - Exit code: $LASTEXITCODE"
            Write-Host "Output: $result"
        }
    }
    catch {
        Write-Host "ERROR $ext : $($_.Exception.Message)"
    }
}

Write-Host "Extension installation completed!"