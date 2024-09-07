import * as vscode from 'vscode';
import playSound from 'play-sound';

const player = playSound();

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "symphocode" is now active!');

  vscode.workspace.onDidChangeTextDocument((evt) => {
    console.log(evt);

    player.play(`${context.extensionPath}/src/audio/sample.mp3`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  });

  const disposable = vscode.commands.registerCommand('symphocode.start', () => {
    vscode.window.showInformationMessage('SymphoCode is running!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
