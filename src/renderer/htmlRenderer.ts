import { AST, Place, Item } from '../parser/types';
import { getStyles, getScript } from './styles';

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

export function renderAST(ast: AST): string {
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
        <nav class="sidebar">
          <h2>Screens (${ast.places.length})</h2>
          <ul class="place-list">
            ${ast.places
              .map(
                (p) => `
              <li class="place-nav-item" data-place="${escapeHtml(p.name)}">
                ${p.isModal ? '&#128466;' : '&#128196;'} ${escapeHtml(p.name)}
              </li>
            `
              )
              .join('')}
          </ul>
        </nav>
        <main class="preview-area">
          ${ast.places.map((p) => renderPlace(p)).join('')}
        </main>
      </div>
      <script>${getScript()}</script>
    </body>
    </html>
  `;
}

function renderPlace(place: Place): string {
  const modalClass = place.isModal ? 'modal' : '';

  return `
    <section class="place ${modalClass}"
             id="place-${slugify(place.name)}"
             data-place-name="${escapeHtml(place.name)}">
      <header class="place-header">
        <h1>${escapeHtml(place.name)}</h1>
        <span class="line-number">Line ${place.line + 1}</span>
      </header>
      <div class="place-content ${place.isModal ? 'modal-content' : ''}">
        ${place.items.map((item) => renderItem(item)).join('')}
      </div>
    </section>
  `;
}

function renderItem(item: Item): string {
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
        <button class="button-preview ${item.navigation ? 'has-nav' : ''}"
                ${item.navigation ? `data-nav="${escapeHtml(item.navigation)}"` : ''}>
          ${escapeHtml(item.label)}
          ${item.navigation ? `<span class="nav-indicator">&#8594;</span>` : ''}
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
          <a class="link-preview" data-nav="${escapeHtml(item.navigation)}">
            ${escapeHtml(item.label)} &#8594;
          </a>
        `;
      } else {
        content += `<span class="text-preview">${escapeHtml(item.label)}</span>`;
      }
  }

  // Handle multiplicity
  let multipliedContent = content;
  if (item.multiplicity && item.multiplicity > 1) {
    const repeatCount = Math.min(item.multiplicity, 3);
    multipliedContent = `
      <div class="multiplicity-container">
        <span class="multiplicity-badge">&times;${item.multiplicity}</span>
        ${Array(repeatCount).fill(content).join('')}
        ${item.multiplicity > 3 ? '<span class="multiplicity-more">...</span>' : ''}
      </div>
    `;
  }

  // Render children
  const childrenHtml =
    item.children.length > 0
      ? `
    <div class="item-children">
      ${item.children.map((child) => renderItem(child)).join('')}
    </div>
  `
      : '';

  return `
    <div class="item item-${item.itemType}" data-line="${item.line}">
      ${multipliedContent}
      ${childrenHtml}
    </div>
  `;
}
