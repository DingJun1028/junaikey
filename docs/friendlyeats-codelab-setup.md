# FriendlyEats Web (Next.js) — One-command Bootstrap

This repository includes helper scripts to bootstrap the Firebase FriendlyEats codelab starter (nextjs-start), initialize Git, push to your GitHub repo, and get the Firebase CLI ready (>= 14.1.0), then login.

Reference: The upstream starter lives under `nextjs-start` (see [firebase/friendlyeats-web PR #242](https://github.com/firebase/friendlyeats-web/pull/242)).

## Prerequisites
- Git
- Node.js (with npm)
- Internet access to run `npx`

## macOS/Linux (Bash)

```bash
chmod +x scripts/setup-friendlyeats.sh
./scripts/setup-friendlyeats.sh -r https://github.com/yourname/friendlyeats-nextjs.git
```

Example with custom directory:

```bash
./scripts/setup-friendlyeats.sh -d my-friendlyeats -r https://github.com/yourname/friendlyeats-nextjs.git
```

Notes:
- The script uses `npx giget@latest gh:firebase/friendlyeats-web/nextjs-start#master . --install`.
- If the `master` branch does not exist upstream, change the internal `SOURCE_SPEC` to use `#main`.
- If global install of Firebase CLI fails (permissions), re-run with `sudo`, use a Node version manager, or rely on `npx firebase-tools@latest`.

## Windows (PowerShell 7+)

```powershell
pwsh -File .\scripts\setup-friendlyeats.ps1 -RepoUrl "https://github.com/yourname/friendlyeats-nextjs.git"
```

Example with custom directory:

```powershell
pwsh -File .\scripts\setup-friendlyeats.ps1 -RepoUrl "https://github.com/yourname/friendlyeats-nextjs.git" -DirName "my-friendlyeats"
```

Example using your new repo:

```powershell
pwsh -File .\scripts\setup-friendlyeats.ps1 -RepoUrl "https://github.com/DingJun1028/OmniJunAikey.git"
```

What the scripts do:
1. Create a working directory (default: `codelab-friendlyeats-web`) and enter it.
2. Fetch `nextjs-start` via `giget` and install dependencies.
3. Initialize Git, commit, switch to `main`, set `origin`, and push to your repo.
4. Ensure Firebase CLI is installed and >= 14.1.0 (upgrade if needed).
5. Run `firebase login` (interactive, opens your browser).

After this, continue with your codelab: configure your Firebase project, setup emulators/hosting, deploy, etc.