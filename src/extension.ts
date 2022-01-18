import * as vscode from 'vscode';
import createComponentFolder from './create_new_component';

async function getUserInput(myplaceholder: string): Promise<String> {
    const userInputWindow = await vscode.window.showInputBox({ placeHolder: myplaceholder, prompt: 'Here is the prompt' });
	if(!userInputWindow || userInputWindow === ""){
		throw new Error("Nome Componente non inserito");
	} else {
		return userInputWindow;
	}
}

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('folder-creator.create', async (uri: vscode.Uri) => {
		vscode.window.showInformationMessage('Hai richiesto di creare una nuova folder!');
		const componentName = await getUserInput("Nome componente:");
		createComponentFolder(componentName, uri.fsPath);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
