# Extension Installation Script
# Installiert alle benötigten VS Code Extensions für ARE

Write-Host "Installing VS Code Extensions..." -ForegroundColor Cyan

$extensions = @(
    'adamerose.markdown-wysiwyg',
    'ms-azuretools.vscode-azure-mcp-server',
    'ms-azuretools.vscode-azurecli',
    'ms-azuretools.azure-dev',
    'ms-azuretools.vscode-azureresourcegroups',
    'ms-azuretools.vscode-azure-github-copilot'
)

foreach ($ext in $extensions) {
    Write-Host "Installing $ext..." -ForegroundColor Yellow
    try {
        & code-insiders --install-extension $ext --force
        Write-Host "✓ $ext installed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to install $ext" -ForegroundColor Red
    }
}

Write-Host "Extension installation completed!" -ForegroundColor Green