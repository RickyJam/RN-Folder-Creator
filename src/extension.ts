import * as vscode from 'vscode';
import createComponentFolder from './create_new_component';

async function getUserInput(myplaceholder: string): Promise<String> {
    const userInputWindow = await vscode.window.showInputBox({ placeHolder: myplaceholder, prompt: 'Here is the prompt' });
	if(!userInputWindow || userInputWindow === ""){
		vscode.window.showInformationMessage('Nome Componente non inserito!');
		throw new Error("");
	} else {
		return userInputWindow;
	}
}

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('folder-creator.create', (uri: vscode.Uri) => {
		getUserInput("Nome componente:").then((componentName) => {
			createComponentFolder(componentName, uri.fsPath);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
