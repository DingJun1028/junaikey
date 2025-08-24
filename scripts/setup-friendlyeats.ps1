#!/usr/bin/env pwsh
param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl,
  [string]$DirName = "codelab-friendlyeats-web",
  [string]$MinFirebaseCli = "14.1.0"
)

$ErrorActionPreference = "Stop"

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    Write-Error "Required command '$Name' not found. Please install it first."
  }
}

Write-Host "== Preflight checks =="
Require-Command git
Require-Command npm
Require-Command npx
Write-Host "OK: git/npm/npx available."

Write-Host "== Step 1: Create directory =="
New-Item -ItemType Directory -Path $DirName -Force | Out-Null
Set-Location $DirName

Write-Host "== Step 2: Fetch nextjs-start via giget =="
# If branch errors occur, try switching '#master' to '#main' in the source spec
$SourceSpec = "gh:firebase/friendlyeats-web/nextjs-start#master"
npx giget@latest $SourceSpec . --install

Write-Host "== Step 3: Initialize git and make initial commit =="
if (-not (Test-Path .git)) {
  git init | Out-Null
}

git add .
try {
  git commit -m "codelab starting point" | Out-Null
} catch {
  # likely nothing to commit on re-runs
}

git branch -M main

try {
  git remote get-url origin | Out-Null
  Write-Host "Origin remote already exists. Updating it to $RepoUrl"
  git remote set-url origin $RepoUrl | Out-Null
} catch {
  git remote add origin $RepoUrl | Out-Null
}

Write-Host "Pushing to $RepoUrl ..."
git push -u origin main

function Convert-VersionToInt {
  param([string]$v)
  $parts = $v.Split('.')
  if ($parts.Count -lt 3) { throw "Invalid version string: $v" }
  return [int]("{0:D1}{1:D3}{2:D3}" -f [int]$parts[0], [int]$parts[1], [int]$parts[2])
}

Write-Host "== Step 4: Ensure Firebase CLI >= $MinFirebaseCli =="
$needInstall = $false

$firebasePath = Get-Command firebase -ErrorAction SilentlyContinue | Select-Object -First 1
if ($firebasePath) {
  try {
    $v = (firebase --version) 2>$null
    if (-not $v) { $needInstall = $true }
    else {
      if ((Convert-VersionToInt $v) -lt (Convert-VersionToInt $MinFirebaseCli)) {
        Write-Host "Firebase CLI ($v) < $MinFirebaseCli. Upgrading..."
        $needInstall = $true
      } else {
        Write-Host "Firebase CLI version OK: $v"
      }
    }
  } catch {
    $needInstall = $true
  }
} else {
  $needInstall = $true
}

if ($needInstall) {
  Write-Host "Installing/Upgrading firebase-tools@latest globally with npm..."
  try {
    npm install -g firebase-tools@latest
  } catch {
    Write-Warning "Global install failed (permissions?). Alternatives:" 
    Write-Host "  - Run PowerShell as Administrator and retry"
    Write-Host "  - Use a Node version manager (nvm-windows)"
    Write-Host "  - Or run via npx: npx firebase-tools@latest <command>"
  }
}

Write-Host "== Step 5: Login to Firebase (interactive) =="
try {
  if (Get-Command firebase -ErrorAction SilentlyContinue) {
    firebase login
  } else {
    npx firebase-tools@latest login
  }
} catch {
  Write-Warning "Login step failed or aborted. You can run 'firebase login' later."
}

Write-Host ""
Write-Host "All done! Next steps:"
Write-Host "  - Your repo should now contain the nextjs-start code on 'main'."
Write-Host "  - You are logged into Firebase CLI (if you completed browser auth)."
Write-Host "  - Proceed with the codelab steps (configure Firebase project, emulators, deploy, etc.)."