# Ensures Azure authentication, then launches the Azure DevOps MCP server.
# Usage: pwsh -NoProfile -ExecutionPolicy Bypass -File ./start-ado-mcp.ps1 <org>

param(
  [Parameter(Mandatory = $true)]
  [string]$Org
)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true

function Test-AzureLogin {
  try {
    $hasAzModule = Get-Command -Name Connect-AzAccount -ErrorAction SilentlyContinue
    if ($hasAzModule) {
      $ctx = $null
      try { $ctx = Get-AzContext -ErrorAction SilentlyContinue } catch { }
      if (-not $ctx) {
        Write-Host "[start-ado-mcp] No Az context found. Launching Connect-AzAccount..." -ForegroundColor Yellow
        Connect-AzAccount | Out-Null
      }
      return
    }
  } catch { }

  # Fallback to Azure CLI
  $hasAzCli = Get-Command -Name az -ErrorAction SilentlyContinue
  if ($hasAzCli) {
    $signedIn = $false
    try {
      $null = az account show --only-show-errors 2>$null
      if ($LASTEXITCODE -eq 0) { $signedIn = $true }
    } catch { $signedIn = $false }

    if (-not $signedIn) {
      Write-Host "[start-ado-mcp] No Azure CLI session. Launching 'az login'..." -ForegroundColor Yellow
      az login --only-show-errors | Out-Null
    }
    return
  }

  Write-Warning "[start-ado-mcp] Neither Az PowerShell nor Azure CLI found. Skipping interactive login."
}

Test-AzureLogin

# Ensure azure-identity auth for the MCP server
$env:AZURE_DEVOPS_AUTH_METHOD = 'azure-identity'

# Start the MCP server (stdin/stdout)
Write-Host "[start-ado-mcp] Starting ADO MCP server for org '$Org'..." -ForegroundColor Cyan
& npx -y @azure-devops/mcp $Org
