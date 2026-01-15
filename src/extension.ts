import * as vscode from 'vscode';
import { DepictPreviewProvider } from './webview/previewProvider';

let previewProvider: DepictPreviewProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
  previewProvider = new DepictPreviewProvider(context);

  // Register command
  const showPreviewCommand = vscode.commands.registerCommand(
    'depict.showPreview',
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
