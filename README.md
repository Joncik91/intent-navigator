# Intent Navigator

You're in full command.

## The Problem It Solves

You've `git init`'d, wired auth, and now feel hollow. Why am I building this? The gap isn't skill — it's intent. 64% of abandoned repos fail from idea scarcity, not technical gaps. You don't need more ideas; you need to recall why you started.

## How It Works

Five keyboard shortcuts, no friction:

- **Ctrl+Shift+L**: Jumps to the latest unquoted line in your README — your raw intent, not the polished pitch. If you wrote `> "This will be huge"` but later added `Actually solving my standup note problem`, it finds the latter.

- **Ctrl+Shift+P**: Shows a non-blocking whisper: "What user pain would this solve for you?" No input field, no pressure. Just a quiet prompt to reconnect with your personal why.

- **Ctrl+Shift+A**: Archive with one tap. Choose from three reasons (wrong problem, too big, no skill fit), logged only to `.intent.log` — a local file you can delete anytime.

- **Ctrl+Shift+E**: Evolve your intent. Choose how you're pivoting (narrow focus, shift audience, new insight) and describe your insight. Sovereignty isn't about sticking to a plan — it's about commanding your own evolution.

- **Ctrl+Shift+D**: Declare your ship target. Mark when you're ready to ship with an optional commit tag.

## Why It's Local-Only

No cloud sync. No login. No telemetry. Sovereignty can't be outsourced. Your intent log stays in your workspace as `.intent.log`, plain JSONL. You own it. You can delete it. No one else sees it.

## Metrics That Matter

**Control Index** = (L+P+A+E+D actions) / total actions. We calculate it but don't show it by default. It's for you, not the platform. Run `Intent: Show Control Index` from the command palette if you want to see your sovereignty score.

### 🧭 Try It Now (60-Second Workflow)

Open an abandoned repo. Press `Ctrl+Shift+L`. If the top unquoted line in your README still gives you energy — you're on track. If not… press `Ctrl+Shift+E` and narrow it.

> *"Actually solving my standup note problem — the emails are always late and nobody reads them."*

You chose to evolve — the tool just made it frictionless.

<details>
<summary>See what gets logged to .intent.log</summary>

```json
{"ts":1734567890000,"action":"L","file":"README.md","repo":"your-repo"}
{"ts":1734567900000,"action":"E","reason":"narrow_focus","insight":"From \"comprehensive dashboard\" → \"automated standup email\"","file":"README.md","repo":"your-repo"}
```

</details>

## Installation

### From VS Code Marketplace (when published)
1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Search for "Intent Navigator"
4. Click Install

### From VSIX Package
1. Download the `.vsix` file
2. In VS Code, run: `Extensions: Install from VSIX...`
3. Select the downloaded file
4. Reload VS Code

### From Source
1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to launch in debug mode

## Philosophy

This doesn't give you ideas. It helps you stay loyal to your own. No nudges, no guilt — just a quiet lever when you need it.