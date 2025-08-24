Param(
  [Parameter(Mandatory = $true)] [string] $RepoUrl,
  [string] $DirName = "codelab-friendlyeats-web",
  [string] $SourceSpec = "gh:firebase/friendlyeats-web/nextjs-start#master",
  [string] $MinFirebaseCli = "14.1.0"
)

$ErrorActionPreference = 'Stop'

function Need-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    Write-Error "Required command '$Name' not found. Please install it first."
  }
}

function Write-Section {
  param([string]$Msg)
  Write-Host "== $Msg ==" -ForegroundColor Cyan
}

function Convert-VersionToInt {
  param([string]$Ver)
  $parts = $Ver.Split('.') | ForEach-Object { [int]$_ }
  if ($parts.Length -lt 3) { throw "Invalid version: $Ver" }
  return ($parts[0] * 1000000) + ($parts[1] * 1000) + $parts[2]
}

function Ensure-FirebaseCLI {
  param([string]$MinVer)

  $needInstall = $false
  $firebaseCmd = Get-Command firebase -ErrorAction SilentlyContinue
  if ($firebaseCmd) {
    try {
      $v = (firebase --version).Trim()
    } catch { $v = '' }
    if ([string]::IsNullOrWhiteSpace($v)) { $needInstall = $true }
    else {
      $vInt = Convert-VersionToInt $v
      $minInt = Convert-VersionToInt $MinVer
      if ($vInt -lt $minInt) {
        Write-Host "Firebase CLI ($v) < $MinVer. Upgrading..." -ForegroundColor Yellow
        $needInstall = $true
      } else {
        Write-Host "Firebase CLI version OK: $v" -ForegroundColor Green
        return $true
      }
    }
  } else { $needInstall = $true }

  if ($needInstall) {
    Write-Host "Installing/Upgrading firebase-tools@latest globally with npm..." -ForegroundColor Cyan
    try {
      npm install -g firebase-tools@latest | Out-Null
      Write-Host "Firebase CLI installed/updated." -ForegroundColor Green
    } catch {
      Write-Warning "Global install failed (permissions?)."
      Write-Host "You can either:" -ForegroundColor Yellow
      Write-Host "  - Run PowerShell as Administrator and retry" -ForegroundColor Yellow
      Write-Host "  - Use nvs/nvm-windows to manage Node without admin" -ForegroundColor Yellow
      Write-Host "  - Or run via npx: npx firebase-tools@latest <command>" -ForegroundColor Yellow
      # npx fallback: we won't alias in PowerShell; callers can use 'npx firebase-tools@latest'
      return $false
    }
  }
  return $true
}

Write-Section "Preflight checks"
Need-Command git
Need-Command npm
Need-Command npx

Write-Section "Create directory"
New-Item -ItemType Directory -Force -Path $DirName | Out-Null
Set-Location $DirName

Write-Section "Fetch nextjs-start via giget"
npx giget@latest "$SourceSpec" . --install

Write-Section "Initialize git and push initial commit"
if (-not (Test-Path .git)) { git init }
git add .
try { git commit -m "codelab starting point" } catch { }
try { git branch -M main } catch { }

$hasOrigin = $false
try { git remote get-url origin | Out-Null; $hasOrigin = $true } catch { $hasOrigin = $false }
if ($hasOrigin) {
  Write-Host "Origin remote already exists. Updating it to $RepoUrl" -ForegroundColor Yellow
  git remote set-url origin $RepoUrl
} else {
  git remote add origin $RepoUrl
}

git push -u origin main

Write-Section "Ensure Firebase CLI >= $MinFirebaseCli"
$hasGlobalFirebase = Ensure-FirebaseCLI -MinVer $MinFirebaseCli

Write-Section "Login to Firebase (interactive)"
try {
  if ($hasGlobalFirebase) { firebase login } else { npx firebase-tools@latest login }
} catch {
  Write-Warning "firebase login failed or was cancelled. You can run it later: 'firebase login' or 'npx firebase-tools@latest login'"
}

Write-Host "`nAll done! Next steps:" -ForegroundColor Green
Write-Host "  - Your repo should now contain the nextjs-start code on 'main'."
Write-Host "  - You are logged into Firebase CLI (if you completed browser auth)."
Write-Host "  - Proceed with the codelab steps (configure Firebase project, emulators, deploy, etc.)."