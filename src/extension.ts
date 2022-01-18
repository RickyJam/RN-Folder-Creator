import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('folder-creator.create', () => {
		vscode.window.showInformationMessage('Hai richiesto di creare una nuova folder!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
