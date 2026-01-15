import * as vscode from 'vscode';
import { parse } from '../parser/parser';
import { renderAST } from '../renderer/htmlRenderer';
import { AST, CanvasState } from '../parser/types';

const CANVAS_STATE_KEY = 'screenflow.canvasState';

interface CanvasStateMessage {
  type: 'updatePosition' | 'updateCanvasState' | 'navigateToPlace' | 'batchUpdatePositions';
  placeName?: string;
  x?: number;
  y?: number;
  zoom?: number;
  panX?: number;
  panY?: number;
  positions?: Array<{ placeName: string; x: number; y: number }>;
}

export class ScreenflowPreviewProvider {
  private panel: vscode.WebviewPanel | undefined;
  private disposables: vscode.Disposable[] = [];
  private document: vscode.TextDocument | undefined;
  private ast: AST | undefined;
  private canvasState: CanvasState;
  private context: vscode.ExtensionContext;
  private ignoreNextSelectionChange = false;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.canvasState = {
      positions: {},
      zoom: 1,
      pan: { x: 0, y: 0 },
    };
  }

  public show(document: vscode.TextDocument) {
    this.document = document;
    this.loadCanvasState();

    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'screenflowPreview',
        'Screenflow Preview',
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

  private getStateKey(): string {
    return this.document ? `${CANVAS_STATE_KEY}.${this.document.fileName}` : CANVAS_STATE_KEY;
  }

  private loadCanvasState() {
    const saved = this.context.workspaceState.get<CanvasState>(this.getStateKey());
    if (saved) {
      this.canvasState = saved;
    } else {
      this.canvasState = {
        positions: {},
        zoom: 1,
        pan: { x: 0, y: 0 },
      };
    }
  }

  private saveCanvasState() {
    this.context.workspaceState.update(this.getStateKey(), this.canvasState);
  }

  private handleMessage(message: CanvasStateMessage) {
    switch (message.type) {
      case 'navigateToPlace':
        if (message.placeName) {
          this.ignoreNextSelectionChange = true;
          this.navigateToPlaceInSource(message.placeName);
        }
        break;

      case 'updatePosition':
        if (message.placeName && message.x !== undefined && message.y !== undefined) {
          this.canvasState.positions[message.placeName] = {
            x: message.x,
            y: message.y,
          };
          this.saveCanvasState();
        }
        break;

      case 'updateCanvasState':
        if (message.zoom !== undefined) {
          this.canvasState.zoom = message.zoom;
        }
        if (message.panX !== undefined && message.panY !== undefined) {
          this.canvasState.pan = { x: message.panX, y: message.panY };
        }
        this.saveCanvasState();
        break;

      case 'batchUpdatePositions':
        if (message.positions && Array.isArray(message.positions)) {
          for (const pos of message.positions) {
            this.canvasState.positions[pos.placeName] = { x: pos.x, y: pos.y };
          }
          this.saveCanvasState();
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

    // Navigate to screen based on cursor position
    const selectionDisposable = vscode.window.onDidChangeTextEditorSelection((e) => {
      if (e.textEditor.document === this.document) {
        if (this.ignoreNextSelectionChange) {
          this.ignoreNextSelectionChange = false;
          return;
        }
        this.navigateToPlaceAtCursor(e.textEditor.selection.active.line);
      }
    });

    this.disposables.push(changeDisposable, selectionDisposable);
  }

  private navigateToPlaceAtCursor(cursorLine: number) {
    if (!this.ast || !this.panel) return;

    // Find the place that contains this line
    let currentPlace: string | undefined;

    for (const place of this.ast.places) {
      if (place.line <= cursorLine) {
        currentPlace = place.name;
      } else {
        break;
      }
    }

    if (currentPlace) {
      this.panel.webview.postMessage({
        type: 'scrollToPlace',
        placeName: currentPlace,
      });
    }
  }

  private update() {
    if (!this.panel || !this.document) return;

    const content = this.document.getText();
    this.ast = parse(content);
    this.panel.webview.html = renderAST(this.ast, this.canvasState);
  }

  private dispose() {
    this.panel?.dispose();
    this.panel = undefined;
    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];
  }
}
