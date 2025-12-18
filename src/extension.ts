import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Intent log file name
const INTENT_LOG_FILE = '.intent.log';

// Interface for intent log entries
interface IntentLogEntry {
    ts: number;
    action: string;
    file?: string;
    line?: number;
    reason?: string;
    repo?: string;
    commit?: string;
    insight?: string;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Intent Navigator is now active!');

    // Register commands
    let latestIntentLineDisposable = vscode.commands.registerCommand('intentNavigator.latestIntentLine', latestIntentLine);
    let peekIntentDisposable = vscode.commands.registerCommand('intentNavigator.peekIntent', peekIntent);
    let archiveWithReasonDisposable = vscode.commands.registerCommand('intentNavigator.archiveWithReason', archiveWithReason);
    let evolveIntentDisposable = vscode.commands.registerCommand('intentNavigator.evolveIntent', evolveIntent);
    let declareIntentDisposable = vscode.commands.registerCommand('intentNavigator.declareIntent', declareIntent);
    let showControlIndexDisposable = vscode.commands.registerCommand('intentNavigator.showControlIndex', showControlIndex);

    // Add to context subscriptions
    context.subscriptions.push(latestIntentLineDisposable);
    context.subscriptions.push(peekIntentDisposable);
    context.subscriptions.push(archiveWithReasonDisposable);
    context.subscriptions.push(evolveIntentDisposable);
    context.subscriptions.push(declareIntentDisposable);
    context.subscriptions.push(showControlIndexDisposable);

    // Show welcome message on first activation
    vscode.window.showInformationMessage('Intent Navigator activated! Press Ctrl+Shift+L to recall your intent.');
}

export function deactivate() {}

// Feature 1: Latest Intent Line (Ctrl+Shift+L)
async function latestIntentLine() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('This command works best with Markdown files (README.md).');
    }

    // Log the action
    logIntentAction('L', document.fileName);

    // Find the latest unquoted line (not starting with >)
    const text = document.getText();
    const lines = text.split('\n');
    
    // Find the last non-empty line that doesn't start with >
    let targetLine = 0;
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line && !line.startsWith('>')) {
            targetLine = i;
            break;
        }
    }

    // If no unquoted lines found, use the first non-empty line
    if (targetLine === 0) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                targetLine = i;
                break;
            }
        }
    }

    // Reveal the line in the editor
    const position = new vscode.Position(targetLine, 0);
    editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
    editor.selection = new vscode.Selection(position, position);

    // Show a subtle notification
    vscode.window.setStatusBarMessage('🧭 Latest intent line revealed', 2000);
}

// Feature 2: Peek Intent (Ctrl+Shift+P)
async function peekIntent() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('This command works best with Markdown files (README.md).');
    }

    // Log the action
    logIntentAction('P', document.fileName);

    // Show the non-blocking message
    const message = '🧭 What user pain would this solve for **you**?';
    vscode.window.showInformationMessage(message, { modal: false });
}

// Feature 3: Archive with Reason (Ctrl+Shift+A)
async function archiveWithReason() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('This command works best with Markdown files (README.md).');
    }

    // Show quick pick menu for archive reasons
    const reasons = [
        { label: '❌ Wrong problem', description: 'This doesn\'t solve a real pain point', reason: 'wrong_problem' },
        { label: '⚙️ Too big', description: 'This project is too complex for now', reason: 'too_big' },
        { label: '🧩 No skill fit', description: 'I don\'t have the right skills for this', reason: 'no_skill_fit' }
    ];

    const selected = await vscode.window.showQuickPick(reasons, {
        placeHolder: 'Why are you archiving this intent?'
    });

    if (selected) {
        // Log the action with reason
        logIntentAction('A', document.fileName, selected.reason);
        
        // Show confirmation
        vscode.window.showInformationMessage(`Intent archived: ${selected.label}`);
    }
}

// Feature 4: Evolve Intent (Ctrl+Shift+E)
async function evolveIntent() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('This command works best with Markdown files (README.md).');
    }

    // Show quick pick menu for evolve options
    const options = [
        { label: '🎯 Narrow focus', description: 'From "[current scope]" → "[smaller scope]"', reason: 'narrow_focus' },
        { label: '🔄 Shift audience', description: 'For "[current user]" → "[new user]"', reason: 'shift_audience' },
        { label: '💡 New insight', description: 'Realized: it\'s not about X — it\'s about Y.', reason: 'new_insight' }
    ];

    const selected = await vscode.window.showQuickPick(options, {
        placeHolder: 'How are you evolving this intent?'
    });

    if (selected) {
        // Prompt for editable insight
        const insight = await vscode.window.showInputBox({
            prompt: 'Describe your insight',
            placeHolder: selected.description,
            value: selected.description
        });

        if (insight !== undefined) { // Allow empty string
            // Log the action with reason and insight
            logIntentAction('E', document.fileName, selected.reason, undefined, insight);
            
            // Show confirmation
            vscode.window.showInformationMessage(`Intent evolved: ${selected.label}`);
        }
    }
}

// Feature 5: Declare Intent (Ctrl+Shift+D)
async function declareIntent() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found.');
        return;
    }

    const document = editor.document;
    if (document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('This command works best with Markdown files (README.md).');
    }

    // Prompt for optional commit tag
    const commit = await vscode.window.showInputBox({
        prompt: 'Optional commit tag (e.g., v1-minimal)',
        placeHolder: 'v1-minimal'
    });

    if (commit !== undefined) { // Allow empty string
        // Log the action with commit
        logIntentAction('D', document.fileName, undefined, commit);
        
        // Show confirmation
        vscode.window.showInformationMessage(`Intent declared: 🚀 "I'm shipping this."`);
    }
}

// Show Control Index
async function showControlIndex() {
    try {
        const logFilePath = path.join(vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '', INTENT_LOG_FILE);
        
        if (!fs.existsSync(logFilePath)) {
            vscode.window.showInformationMessage('Control Index: 0% (no intent actions logged yet)');
            return;
        }

        const logContent = fs.readFileSync(logFilePath, 'utf-8');
        const logLines = logContent.trim().split('\n');
        const intentActions = logLines.filter(line => {
            try {
                const entry = JSON.parse(line);
                return ['L', 'P', 'A', 'E', 'D'].includes(entry.action);
            } catch {
                return false;
            }
        }).length;

        // For demo purposes, we'll use a fixed total actions value
        // In a real implementation, you'd track total keyboard actions
        const totalActions = 100; // Placeholder
        const controlIndex = (intentActions / totalActions) * 100;

        vscode.window.showInformationMessage(`Control Index: ${controlIndex.toFixed(1)}% (${intentActions} intent actions)`);
        
    } catch (error) {
        vscode.window.showErrorMessage('Could not calculate Control Index');
        console.error('Error calculating Control Index:', error);
    }
}

// Log intent actions to .intent.log file
function logIntentAction(action: string, file?: string, reason?: string, commit?: string, insight?: string) {
    try {
        if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
            return;
        }

        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const logFilePath = path.join(workspacePath, INTENT_LOG_FILE);

        const entry: IntentLogEntry = {
            ts: Date.now(),
            action: action,
            file: file
        };

        if (reason) {
            entry.reason = reason;
        }

        if (commit) {
            entry.commit = commit;
        }

        if (insight) {
            entry.insight = insight;
        }

        // Extract repo name from workspace path
        const repoName = path.basename(workspacePath);
        if (repoName) {
            entry.repo = repoName;
        }

        const logEntry = JSON.stringify(entry);
        
        // Append to log file
        fs.appendFileSync(logFilePath, logEntry + '\n', 'utf-8');

    } catch (error) {
        console.error('Error logging intent action:', error);
    }
}