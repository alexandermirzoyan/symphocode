import * as vscode from 'vscode';
import playSound from 'play-sound';

const player = playSound();
const soundFileNameSet1 = ['A-1.m4a', 'B-1.m4a', 'C-1.m4a', 'D-1.m4a', 'E-1.m4a', 'F-1.m4a', 'G-1.m4a', 'C-01.m4a'];
const soundFileNameSet2 = ['A-2.m4a', 'B-2.m4a', 'C-2.m4a', 'D-2.m4a', 'E-2.m4a', 'F-2.m4a', 'G-2.m4a', 'A-02.m4a'];
const soundFileNameSet = [...soundFileNameSet1, ...soundFileNameSet2];

const randomizeArray = (input: string[]) => {
  const randomIndex = Math.floor(Math.random() * input.length);
  return input[randomIndex];
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "symphocode" is now active!');

  vscode.workspace.onDidChangeTextDocument((evt) => {
    const changedChar = evt.contentChanges[0]?.text || '';
    console.log('changedChar :: ', changedChar);

    if (!changedChar) {
      return;
    }

    let soundFileName = null;

    if (changedChar.includes('\n')) {
      soundFileName = 'Enter.m4a';
    }

    if (changedChar === ' ') {
      soundFileName = 'Space.m4a';
    }

    if (!soundFileName) {
      soundFileName = randomizeArray(soundFileNameSet);
    }

    console.log('soundFileName :: ', soundFileName);

    player.play(`${context.extensionPath}/src/audio/${soundFileName}`, (err: any) => {
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
