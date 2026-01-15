import * as vscode from 'vscode';
import { parse } from '../parser/parser';
import { renderAST } from '../renderer/htmlRenderer';
import { AST } from '../parser/types';

export class DepictPreviewProvider {
  private panel: vscode.WebviewPanel | undefined;
  private disposables: vscode.Disposable[] = [];
  private document: vscode.TextDocument | undefined;
  private ast: AST | undefined;

  public show(document: vscode.TextDocument) {
    this.document = document;

    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'depictPreview',
        'Depict Preview',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

      // Handle messages from webview
      this.panel.webview.onDidReceiveMessage(
        this.handleMessage.bind(this),
        null,
        this.disposables
      );
    }

    this.update();
    this.setupDocumentListeners();
  }

  private handleMessage(message: { type: string; placeName?: string }) {
    switch (message.type) {
      case 'navigateToPlace':
        if (message.placeName) {
          this.navigateToPlaceInSource(message.placeName);
        }
        break;
    }
  }

  private navigateToPlaceInSource(placeName: string) {
    if (!this.ast || !this.document) return;

    const place = this.ast.placeIndex.get(placeName);
    if (place) {
      const position = new vscode.Position(place.line, 0);
      const editor = vscode.window.visibleTextEditors.find(
        (e) => e.document === this.document
      );

      if (editor) {
        editor.selection = new vscode.Selection(position, position);
        editor.revealRange(
          new vscode.Range(position, position),
          vscode.TextEditorRevealType.InCenter
        );
      }
    }
  }

  private setupDocumentListeners() {
    // Clear previous listeners
    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];

    // Re-add panel dispose handler
    if (this.panel) {
      this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
      this.panel.webview.onDidReceiveMessage(
        this.handleMessage.bind(this),
        null,
        this.disposables
      );
    }

    // Update on document change (live preview)
    const changeDisposable = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document === this.document) {
        this.update();
      }
    });

    this.disposables.push(changeDisposable);
  }

  private update() {
    if (!this.panel || !this.document) return;

    const content = this.document.getText();
    this.ast = parse(content);
    this.panel.webview.html = renderAST(this.ast);
  }

  private dispose() {
    this.panel?.dispose();
    this.panel = undefined;
    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];
  }
}
