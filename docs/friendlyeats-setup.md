# FriendlyEats Next.js Starter — One-click Bootstrap

This guide adds two scripts to quickly pull the starter from Firebase's FriendlyEats repo (nextjs-start), initialize Git, push to your own GitHub repo, and set up the Firebase CLI.

## Prerequisites
- Git installed
- Node.js and npm installed
- For Windows PowerShell: you may need to allow script execution:
  - Run PowerShell as Administrator
  - Execute: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Create your new GitHub repository
1. Visit https://github.com/new and create an empty repository
2. Copy the repo URL (HTTPS or SSH)
   - Example (provided by user):
     - HTTPS: `https://github.com/DingJun1028/OmniJunAikey.git`

## macOS/Linux/WSL (Bash)
```bash
chmod +x scripts/setup-friendlyeats.sh
./scripts/setup-friendlyeats.sh -r https://github.com/DingJun1028/OmniJunAikey.git
# Optional custom directory name
# ./scripts/setup-friendlyeats.sh -d my-friendlyeats -r https://github.com/DingJun1028/OmniJunAikey.git
```

## Windows (PowerShell)
```powershell
# From the repo root
powershell -ExecutionPolicy Bypass -File .\scripts\setup-friendlyeats.ps1 -RepoUrl "https://github.com/DingJun1028/OmniJunAikey.git"
# Optional custom directory
# powershell -ExecutionPolicy Bypass -File .\scripts\setup-friendlyeats.ps1 -RepoUrl "https://github.com/DingJun1028/OmniJunAikey.git" -DirName "my-friendlyeats"
```

## What the scripts do
1. Create and enter the working directory (default: `codelab-friendlyeats-web`)
2. Fetch only `nextjs-start` via `giget` and install dependencies
3. Initialize Git, set the `main` branch, and push to your new GitHub repo
4. Ensure Firebase CLI is v14.1.0+ (install or upgrade if needed)
5. Trigger `firebase login` (interactive)

If global install of Firebase CLI fails (permissions), the scripts fall back to using `npx firebase-tools@latest` for login and subsequent commands.

## Next steps
- Continue the codelab: initialize/configure your Firebase project, run emulators, and/or deploy
- If you encounter login issues, re-run:
  - `firebase login` (if globally installed), or
  - `npx firebase-tools@latest login`