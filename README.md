# Linux Command Explorer · Cloud Edition

A fully **static** interactive UI for exploring Linux commands and cloud computing components.
All entries store **detailed descriptions only** — no executable code.

## Features
- 🔍 Live search across names, descriptions and flags
- 🏷️ Category filters (Files, Network, Processes, Cloud, …)
- ✨ Animated cards and modal details
- ☁️ Cloud section: Virtual Machine, Hypervisor, Load Balancer, Message Broker, Object Storage, Virtual Network, Container Orchestrator
- 📱 Fully responsive
- 🚀 Zero build step — pure HTML/CSS/JS

## Deploy on GitHub Pages

1. Create a repo and push these files to `main`.
2. Go to **Settings → Pages → Source** and select **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` publishes the site.
4. Site goes live at `https://<username>.github.io/<repo>/`.

## Customize
- Add commands in `js/commands.js`
- Add cloud components in `js/cloud.js`
- Restyle via CSS variables in `css/style.css`

## Keyboard
- `/` — focus search
- `Esc` — close modal