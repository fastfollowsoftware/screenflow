import { AST, Place, Item, CanvasState, Position, CommentType } from '../parser/types';
import { getStyles, getScript } from './styles';

const COMMENT_ICONS: Record<CommentType, string> = {
  question: '?',
  warning: '!',
  info: 'i',
  note: '💬',
};

const CARD_WIDTH = 320;
const CARD_HEIGHT = 250; // Approximate height
const CARD_GAP = 30;
const COLUMNS = 5;
const START_X = 40;
const START_Y = 40;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getDefaultPosition(index: number): Position {
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  return {
    x: START_X + col * (CARD_WIDTH + CARD_GAP),
    y: START_Y + row * (CARD_HEIGHT + CARD_GAP),
  };
}

export function renderAST(ast: AST, canvasState?: CanvasState): string {
  const positions = canvasState?.positions || {};

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${getStyles()}</style>
    </head>
    <body>
      <div class="container">
        <main class="preview-area">
          <div class="canvas">
            <svg class="arrows-layer" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
                </marker>
              </defs>
            </svg>
            ${ast.places.map((p, i) => renderPlace(p, positions[p.name] || getDefaultPosition(i))).join('')}
          </div>
          <div class="zoom-controls">
            <button class="zoom-btn toggle-arrows active" title="Toggle Arrows">&#8594;</button>
            <span class="zoom-separator">|</span>
            <button class="zoom-btn zoom-out" title="Zoom Out">-</button>
            <span class="zoom-level">100%</span>
            <button class="zoom-btn zoom-in" title="Zoom In">+</button>
            <button class="zoom-reset" title="Reset View">Reset</button>
            <span class="zoom-separator">|</span>
            <button class="zoom-btn auto-organize" title="Auto-Organize">&#8862;</button>
          </div>
        </main>
      </div>
      <script>${getScript()}</script>
    </body>
    </html>
  `;
}

function renderPlace(place: Place, position: Position): string {
  const modalClass = place.isModal ? 'modal' : '';
  const headerComment = place.comment && place.commentType
    ? renderComment(place.comment, place.commentType)
    : '';

  return `
    <section class="place ${modalClass}"
             id="place-${slugify(place.name)}"
             data-place-name="${escapeHtml(place.name)}"
             style="left: ${position.x}px; top: ${position.y}px;">
      <header class="place-header">
        <h1>${escapeHtml(place.name)}</h1>
        ${headerComment}
      </header>
      <div class="place-content ${place.isModal ? 'modal-content' : ''}">
        ${place.items.map((item) => renderItem(item, place.name)).join('')}
      </div>
    </section>
  `;
}

function renderComment(comment: string, commentType: CommentType): string {
  const icon = COMMENT_ICONS[commentType];
  return `
    <span class="comment-icon comment-${commentType}" title="${escapeHtml(comment)}">
      <span class="comment-icon-text">${icon}</span>
      <span class="comment-popover">${escapeHtml(comment)}</span>
    </span>
  `;
}

function renderItem(item: Item, sourcePlaceName: string): string {
  let content = '';

  // Handle conditional items
  if (item.isConditional && item.conditionalText) {
    content += `<span class="conditional-badge">${escapeHtml(item.conditionalText)}</span>`;
  }

  // Render based on type
  switch (item.itemType) {
    case 'input':
      content += `
        <div class="input-preview">
          <label>${escapeHtml(item.label)}</label>
          <input type="text" placeholder="${escapeHtml(item.label)}" disabled />
        </div>
      `;
      break;

    case 'button':
      content += `
        <button class="button-preview ${item.navigation ? 'has-nav nav-source' : ''}"
                ${item.navigation ? `data-nav="${escapeHtml(item.navigation)}" data-source-place="${escapeHtml(sourcePlaceName)}"` : ''}>
          ${escapeHtml(item.label)}
        </button>
      `;
      break;

    case 'checkbox':
      content += `
        <div class="checkbox-preview">
          <input type="checkbox" disabled />
          <label>${escapeHtml(item.label)}</label>
        </div>
      `;
      break;

    case 'radio':
      content += `
        <div class="radio-preview">
          <input type="radio" disabled />
          <label>${escapeHtml(item.label)}</label>
        </div>
      `;
      break;

    case 'dropdown':
      content += `
        <div class="dropdown-preview">
          <label>${escapeHtml(item.label)}</label>
          <select disabled><option>${escapeHtml(item.label)}</option></select>
        </div>
      `;
      break;

    case 'link':
    case 'text':
    default:
      if (item.navigation) {
        content += `
          <a class="link-preview nav-source" data-nav="${escapeHtml(item.navigation)}" data-source-place="${escapeHtml(sourcePlaceName)}">
            ${escapeHtml(item.label)}
          </a>
        `;
      } else {
        content += `<span class="text-preview">${escapeHtml(item.label)}</span>`;
      }
  }

  // Render children
  const childrenHtml =
    item.children.length > 0
      ? `
    <div class="item-children">
      ${item.children.map((child) => renderItem(child, sourcePlaceName)).join('')}
    </div>
  `
      : '';

  // Add comment if present
  const commentHtml = item.comment && item.commentType
    ? renderComment(item.comment, item.commentType)
    : '';

  // Handle multiplicity - children go under first instance only
  let mainContent;
  if (item.multiplicity && item.multiplicity > 1) {
    const repeatCount = Math.min(item.multiplicity, 3);
    const firstInstance = `<div class="item-inline">${content}${commentHtml}</div>${childrenHtml}`;
    const additionalInstances = Array(repeatCount - 1).fill(`<div class="item-inline">${content}</div>`).join('');
    mainContent = `
      <div class="multiplicity-container">
        <span class="multiplicity-badge">&times;${item.multiplicity}</span>
        ${firstInstance}
        ${additionalInstances}
        ${item.multiplicity > 3 ? '<span class="multiplicity-more">...</span>' : ''}
      </div>
    `;
  } else {
    mainContent = `<div class="item-inline">${content}${commentHtml}</div>${childrenHtml}`;
  }

  return `
    <div class="item item-${item.itemType}" data-line="${item.line}">
      ${mainContent}
    </div>
  `;
}
