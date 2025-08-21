# FriendlyEats Web Codelab Bootstrap (Automated)

This repo includes two helper scripts to automate the Firebase FriendlyEats codelab bootstrap: fetching only `nextjs-start`, initializing Git, pushing to your GitHub, ensuring Firebase CLI ≥ 14.1.0, and logging in.

## Prerequisites
- Git
- Node.js (includes npm and npx)
- A new empty GitHub repository URL, for example:
  - HTTPS: https://github.com/DingJun1028/OmniJunAikey.git
  - SSH: git@github.com:DingJun1028/OmniJunAikey.git

## Windows (PowerShell)
1. Open PowerShell in this repository root
2. Run:
   ```powershell
   .\scripts\setup-friendlyeats.ps1 -RepoUrl https://github.com/DingJun1028/OmniJunAikey.git
   ```
   Optional: choose a different target directory name:
   ```powershell
   .\scripts\setup-friendlyeats.ps1 -RepoUrl git@github.com:DingJun1028/OmniJunAikey.git -Directory my-friendlyeats
   ```

## macOS/Linux (Bash)
1. Make the script executable:
   ```bash
   chmod +x scripts/setup-friendlyeats.sh
   ```
2. Run:
   ```bash
   ./scripts/setup-friendlyeats.sh -r https://github.com/DingJun1028/OmniJunAikey.git
   ```
   Optional: choose a different directory:
   ```bash
   ./scripts/setup-friendlyeats.sh -d my-friendlyeats -r git@github.com:DingJun1028/OmniJunAikey.git
   ```

## What the scripts do
- Create and enter a directory (default: `codelab-friendlyeats-web`)
- Use `npx giget@latest` to fetch `gh:firebase/friendlyeats-web/nextjs-start#master` and install dependencies
- Initialize git, commit, set `main`, add remote, and push
- Ensure Firebase CLI ≥ 14.1.0
  - Attempt global install/upgrade via `npm install -g firebase-tools@latest`
  - If that fails due to permissions, use `npx firebase-tools@latest` fallback
- Trigger `firebase login` (interactive, opens your browser)

## Tips and Troubleshooting
- If global npm installs fail on Windows (no admin rights), the script falls back to `npx` for Firebase CLI. You can also open a new PowerShell (Run as Administrator) and retry the global install.
- If giget branch changes from `master` to `main` for the upstream repo, edit the script `SourceSpec`/`SOURCE_SPEC` to `...#main`.
- If you see `nothing to commit, working tree clean` that's fine on re-runs.
- To use SSH instead of HTTPS for GitHub, pass an SSH URL as `-RepoUrl`/`-r`.

## Next steps
- Continue the codelab to set up your Firebase project, emulators, and deploy.
- Run `firebase --version` to verify the CLI.
- If running via `npx` fallback, prefix commands with `npx firebase-tools@latest`.