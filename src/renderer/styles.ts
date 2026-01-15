export function getStyles(): string {
  return `
    :root {
      --bg-primary: #ffffff;
      --bg-secondary: #f5f5f5;
      --bg-sidebar: #1e1e2e;
      --text-primary: #333333;
      --text-secondary: #666666;
      --text-sidebar: #cdd6f4;
      --border-color: #e0e0e0;
      --accent: #007acc;
      --button-bg: #0066cc;
      --button-text: #ffffff;
      --input-bg: #ffffff;
      --input-border: #cccccc;
      --link-color: #0066cc;
      --conditional-bg: #fff3cd;
      --multiplicity-bg: #e8f4f8;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-secondary);
      color: var(--text-primary);
      line-height: 1.5;
    }

    .container {
      display: flex;
      height: 100vh;
    }

    /* Sidebar Navigation */
    .sidebar {
      width: 280px;
      background: var(--bg-sidebar);
      color: var(--text-sidebar);
      overflow-y: auto;
      padding: 16px;
      flex-shrink: 0;
    }

    .sidebar h2 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
      opacity: 0.7;
    }

    .place-list {
      list-style: none;
    }

    .place-nav-item {
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 13px;
      margin-bottom: 4px;
      transition: background 0.2s;
    }

    .place-nav-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .place-nav-item.active {
      background: var(--accent);
      color: white;
    }

    /* Preview Area */
    .preview-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-content: flex-start;
    }

    /* Place (Screen) */
    .place {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      width: 360px;
      max-width: 100%;
    }

    .place.hidden {
      display: none;
    }

    .place.modal {
      border: 2px dashed var(--accent);
    }

    .place.highlight {
      box-shadow: 0 0 0 3px var(--accent);
    }

    .place-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      border-radius: 8px 8px 0 0;
    }

    .place-header h1 {
      font-size: 14px;
      font-weight: 600;
    }

    .line-number {
      font-size: 11px;
      color: var(--text-secondary);
    }

    .place-content {
      padding: 16px;
    }

    .modal-content {
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(0, 122, 204, 0.03) 10px,
        rgba(0, 122, 204, 0.03) 20px
      );
    }

    /* Items */
    .item {
      margin-bottom: 12px;
    }

    .item:last-child {
      margin-bottom: 0;
    }

    .item-children {
      margin-left: 16px;
      padding-left: 16px;
      border-left: 2px solid var(--border-color);
      margin-top: 8px;
    }

    /* Input Preview */
    .input-preview {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .input-preview label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .input-preview input {
      padding: 8px 12px;
      border: 1px solid var(--input-border);
      border-radius: 4px;
      background: var(--input-bg);
      font-size: 13px;
    }

    /* Button Preview */
    .button-preview {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--button-bg);
      color: var(--button-text);
      border: none;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
    }

    .button-preview.has-nav:hover {
      opacity: 0.9;
    }

    .nav-indicator {
      font-size: 12px;
    }

    /* Checkbox/Radio Preview */
    .checkbox-preview,
    .radio-preview {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }

    /* Dropdown Preview */
    .dropdown-preview {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .dropdown-preview label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .dropdown-preview select {
      padding: 8px 12px;
      border: 1px solid var(--input-border);
      border-radius: 4px;
      background: var(--input-bg);
      font-size: 13px;
    }

    /* Link Preview */
    .link-preview {
      color: var(--link-color);
      text-decoration: none;
      cursor: pointer;
      font-size: 13px;
    }

    .link-preview:hover {
      text-decoration: underline;
    }

    /* Text Preview */
    .text-preview {
      font-size: 13px;
      display: block;
    }

    /* Conditional Badge */
    .conditional-badge {
      display: inline-block;
      background: var(--conditional-bg);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-style: italic;
      margin-bottom: 4px;
    }

    /* Multiplicity */
    .multiplicity-container {
      background: var(--multiplicity-bg);
      padding: 8px;
      border-radius: 4px;
      position: relative;
    }

    .multiplicity-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--accent);
      color: white;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 10px;
    }

    .multiplicity-more {
      display: block;
      text-align: center;
      color: var(--text-secondary);
      font-size: 12px;
    }
  `;
}

export function getScript(): string {
  return `
    const vscode = acquireVsCodeApi();

    // Handle sidebar navigation clicks
    document.querySelectorAll('.place-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const placeName = item.dataset.place;
        navigateToPlace(placeName);

        // Notify extension to scroll source to line
        vscode.postMessage({
          type: 'navigateToPlace',
          placeName: placeName
        });
      });
    });

    // Handle in-content navigation (buttons and links with data-nav)
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPlace = el.dataset.nav;
        navigateToPlace(targetPlace);

        vscode.postMessage({
          type: 'navigateToPlace',
          placeName: targetPlace
        });
      });
    });

    function navigateToPlace(placeName) {
      // Update sidebar active state
      document.querySelectorAll('.place-nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.place === placeName);
      });

      // Scroll to the place in preview
      const targetSection = document.querySelector('[data-place-name="' + placeName + '"]');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Highlight briefly
        targetSection.classList.add('highlight');
        setTimeout(() => targetSection.classList.remove('highlight'), 1000);
      }
    }

    // Handle messages from extension
    window.addEventListener('message', event => {
      const message = event.data;
      switch (message.type) {
        case 'scrollToPlace':
          navigateToPlace(message.placeName);
          break;
      }
    });
  `;
}
