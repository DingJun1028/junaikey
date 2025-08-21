param(
  [string]$Directory = "codelab-friendlyeats-web",
  [Parameter(Mandatory = $true)] [string]$RepoUrl,
  [string]$SourceSpec = "gh:firebase/friendlyeats-web/nextjs-start#master",
  [string]$MinFirebaseCli = "14.1.0"
)

$ErrorActionPreference = 'Stop'

function Show-Usage {
  Write-Host "Usage: .\scripts\setup-friendlyeats.ps1 -RepoUrl <repo_url> [-Directory <dir>]" -ForegroundColor Yellow
  Write-Host "Examples:" -ForegroundColor Yellow
  Write-Host "  .\scripts\setup-friendlyeats.ps1 -RepoUrl https://github.com/DingJun1028/OmniJunAikey.git" -ForegroundColor Yellow
  Write-Host "  .\scripts\setup-friendlyeats.ps1 -RepoUrl git@github.com:DingJun1028/OmniJunAikey.git -Directory my-friendlyeats" -ForegroundColor Yellow
}

if (-not $PSBoundParameters.ContainsKey('RepoUrl') -or [string]::IsNullOrWhiteSpace($RepoUrl)) {
  Show-Usage
  throw "-RepoUrl is required."
}

function Require-Cmd($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "Required command '$name' not found. Please install it first."
  }
}

Write-Host "== Preflight checks ==" -ForegroundColor Cyan
Require-Cmd git
Require-Cmd npm
Require-Cmd npx
Write-Host "OK: git/npm/npx available." -ForegroundColor Green

Write-Host "== Step 1: Create directory ==" -ForegroundColor Cyan
if (-not (Test-Path -LiteralPath $Directory)) {
  New-Item -ItemType Directory -Path $Directory | Out-Null
}
Set-Location -LiteralPath $Directory

Write-Host "== Step 2: Fetch nextjs-start via giget ==" -ForegroundColor Cyan
# Note: requires Node.js/npm available
npx giget@latest $SourceSpec . --install

Write-Host "== Step 3: Initialize git and make initial commit ==" -ForegroundColor Cyan
if (-not (Test-Path -LiteralPath ".git")) {
  git init | Out-Null
}
& git add .
try {
  & git commit -m "codelab starting point" | Out-Null
} catch {
  # Ignore if nothing to commit on re-runs
}
& git branch -M main

try {
  $null = git remote get-url origin 2>$null
  Write-Host "Origin remote exists. Updating to $RepoUrl" -ForegroundColor DarkYellow
  & git remote set-url origin $RepoUrl
} catch {
  & git remote add origin $RepoUrl
}

Write-Host "Pushing to $RepoUrl ..." -ForegroundColor Cyan
& git push -u origin main

function Convert-VersionToInt($v) {
  $parts = $v.Split('.') | ForEach-Object { [int]$_ }
  if ($parts.Count -lt 3) { $parts += @(0) * (3 - $parts.Count) }
  return [int]("{0:D1}{1:D3}{2:D3}" -f $parts[0], $parts[1], $parts[2])
}

function Ensure-FirebaseCli {
  param([string]$Min)
  $needInstall = $false
  $current = $null
  try {
    $current = (& firebase --version) 2>$null
  } catch {
    $needInstall = $true
  }

  if ($null -ne $current -and -not [string]::IsNullOrWhiteSpace($current)) {
    $curInt = Convert-VersionToInt $current
    $minInt = Convert-VersionToInt $Min
    if ($curInt -lt $minInt) {
      Write-Host "Firebase CLI ($current) < $Min. Upgrading..." -ForegroundColor DarkYellow
      $needInstall = $true
    } else {
      Write-Host "Firebase CLI version OK: $current" -ForegroundColor Green
      return
    }
  }

  if ($needInstall) {
    Write-Host "Installing/Upgrading firebase-tools@latest globally with npm..." -ForegroundColor Cyan
    try {
      npm install -g firebase-tools@latest | Out-Null
      Write-Host "Firebase CLI installed/updated." -ForegroundColor Green
    } catch {
      Write-Warning "Global install failed (permissions?). Using npx fallback in this session."
      function global:firebase { npx firebase-tools@latest @args }
    }
  }
}

Write-Host "== Step 4: Ensure Firebase CLI >= $MinFirebaseCli ==" -ForegroundColor Cyan
Ensure-FirebaseCli -Min $MinFirebaseCli

Write-Host "== Step 5: Login to Firebase (interactive) ==" -ForegroundColor Cyan
try {
  & firebase --version *> $null
  & firebase login
} catch {
  & npx firebase-tools@latest login
}

Write-Host ""; Write-Host "All done! Next steps:" -ForegroundColor Green
Write-Host "  - Your repo should now contain the nextjs-start code on 'main'."
Write-Host "  - You are logged into Firebase CLI (if you completed browser auth)."
Write-Host "  - Proceed with the codelab steps (configure Firebase project, emulators, deploy, etc.)."