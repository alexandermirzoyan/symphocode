import * as vscode from 'vscode';
import playSound from 'play-sound';

const player = playSound();
const soundFileNameSet1 = ['A-1.m4a', 'B-1.m4a', 'C-1.m4a', 'D-1.m4a', 'E-1.m4a', 'F-1.m4a', 'G-1.m4a', 'C-01.m4a'];
const soundFileNameSet2 = ['A-2.m4a', 'B-2.m4a', 'C-2.m4a', 'D-2.m4a', 'E-2.m4a', 'F-2.m4a', 'G-2.m4a', 'A-02.m4a'];
// const soundFileNameSet = [...soundFileNameSet1, ...soundFileNameSet2];
const soundFileNameSet = ['piano_note_1_freq_261.wav', 'piano_note_2_freq_329.wav', 'piano_note_3_freq_392.wav'];

const randomizeArray = (input: string[]) => {
  const randomIndex = Math.floor(Math.random() * input.length);
  return input[randomIndex];
};

const playAllSoundsInAQueue = (fileNames: string[], dirPath: string) => {
  if (!fileNames.length) {
    return;
  }

  const soundFileName = fileNames.shift();
  player.play(`${dirPath}/${soundFileName}`, (err: any) => {
    if (err) {
      return err;
    }

    console.log('sound played');
    playAllSoundsInAQueue(fileNames, dirPath);
  });
};

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "symphocode" is now active!');

  const queue: string[] = [];
  let timeBetweenKeyChanges = 0;

  vscode.workspace.onDidChangeTextDocument((evt) => {
    const changedChar = evt.contentChanges[0]?.text || '';

    if (!changedChar) {
      return;
    }

    let isIntervalShortBetweenKeyChanges = false;
    const currentTimeWhileKeyPress = Date.now();
    const KEY_PRESS_OFFSET_MS = 150;
    const isNextKeyPressedTooFast = currentTimeWhileKeyPress < timeBetweenKeyChanges + KEY_PRESS_OFFSET_MS;
    console.log('changedChar :: ', changedChar);

    // TODO - Avoid if block here. Can be used while declaration
    if (timeBetweenKeyChanges && isNextKeyPressedTooFast) {
      isIntervalShortBetweenKeyChanges = true;
    }

    timeBetweenKeyChanges = currentTimeWhileKeyPress;

    if (isIntervalShortBetweenKeyChanges) {
      console.log('Too short interval');
      return;
    }

    const soundFileName = randomizeArray(soundFileNameSet);
    queue.unshift(soundFileName);
    playAllSoundsInAQueue(queue, `${context.extensionPath}/src/audio`);
  });

  const disposable = vscode.commands.registerCommand('symphocode.start', () => {
    vscode.window.showInformationMessage('SymphoCode is running!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
