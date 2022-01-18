import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('folder-creator.create', (uri: vscode.Uri) => {
		vscode.window.showInformationMessage('Hai richiesto di creare una nuova folder!');
		console.log(uri.fsPath);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
