import * as vscode from 'vscode';
import { ScreenflowPreviewProvider } from './webview/previewProvider';

let previewProvider: ScreenflowPreviewProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
  previewProvider = new ScreenflowPreviewProvider(context);

  // Register command
  const showPreviewCommand = vscode.commands.registerCommand(
    'screenflow.showPreview',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        previewProvider?.show(editor.document);
      }
    }
  );

  context.subscriptions.push(showPreviewCommand);
}

export function deactivate() {
  previewProvider = undefined;
}
