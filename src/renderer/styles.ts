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
      overflow: hidden;
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

    /* Preview Area (Viewport) */
    .preview-area {
      flex: 1;
      overflow: hidden;
      position: relative;
      background: #e8e8e8;
      background-image:
        linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px);
      background-size: 20px 20px;
    }

    .preview-area.panning {
      cursor: grabbing;
    }

    .preview-area.space-held {
      cursor: grab;
    }

    /* Canvas (transformable container) */
    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      min-width: 5000px;
      min-height: 5000px;
    }

    /* Zoom Controls */
    .zoom-controls {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-primary);
      padding: 8px 12px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 100;
    }

    .zoom-btn {
      width: 28px;
      height: 28px;
      border: 1px solid var(--border-color);
      background: var(--bg-primary);
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .zoom-btn:hover {
      background: var(--bg-secondary);
    }

    .zoom-level {
      font-size: 12px;
      min-width: 45px;
      text-align: center;
      color: var(--text-secondary);
    }

    .zoom-reset {
      font-size: 11px;
      padding: 4px 8px;
      border: 1px solid var(--border-color);
      background: var(--bg-primary);
      border-radius: 4px;
      cursor: pointer;
    }

    .zoom-reset:hover {
      background: var(--bg-secondary);
    }

    .zoom-separator {
      color: var(--border-color);
      font-size: 14px;
    }

    .toggle-arrows {
      font-size: 14px;
    }

    .toggle-arrows.active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }

    .auto-organize {
      font-size: 14px;
    }

    .auto-organize:active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }

    /* Arrows Layer */
    .arrows-layer {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
      overflow: visible;
    }

    .arrows-layer.hidden {
      display: none;
    }

    .arrow-path {
      fill: none;
      stroke: rgba(100, 100, 100, 0.5);
      stroke-width: 2;
      marker-end: url(#arrowhead);
    }

    /* Place (Screen) */
    .place {
      position: absolute;
      background: var(--bg-primary);
      border: 2px solid var(--border-color);
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      width: 320px;
      max-width: 100%;
      transition: box-shadow 0.2s;
    }

    .place.dragging {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      z-index: 1000;
    }

    .place.modal {
      border: 3px dashed var(--accent);
    }

    .place.highlight {
      box-shadow: 0 0 0 4px var(--accent);
    }

    .place-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: #2d2d2d;
      color: white;
      border-radius: 4px 4px 0 0;
      cursor: grab;
      user-select: none;
    }

    .place-header:active {
      cursor: grabbing;
    }

    .place-header h1 {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }

    .line-number {
      font-size: 12px;
      color: rgba(255,255,255,0.6);
    }

    .place-content {
      padding: 10px 12px;
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
      margin-bottom: 6px;
    }

    .item:last-child {
      margin-bottom: 0;
    }

    .item-children {
      margin-left: 10px;
      padding-left: 10px;
      border-left: 2px solid var(--border-color);
      margin-top: 4px;
    }

    /* Input Preview */
    .input-preview {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .input-preview label {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .input-preview input {
      padding: 4px 8px;
      border: 1px solid var(--input-border);
      border-radius: 3px;
      background: var(--input-bg);
      font-size: 14px;
    }

    /* Button Preview */
    .button-preview {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: var(--button-bg);
      color: var(--button-text);
      border: none;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    .button-preview.has-nav:hover {
      opacity: 0.9;
    }

    /* Checkbox/Radio Preview */
    .checkbox-preview,
    .radio-preview {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
    }

    /* Dropdown Preview */
    .dropdown-preview {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .dropdown-preview label {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .dropdown-preview select {
      padding: 4px 8px;
      border: 1px solid var(--input-border);
      border-radius: 3px;
      background: var(--input-bg);
      font-size: 14px;
    }

    /* Link Preview */
    .link-preview {
      color: var(--link-color);
      text-decoration: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }

    .link-preview:hover {
      text-decoration: underline;
    }

    /* Text Preview */
    .text-preview {
      font-size: 14px;
      display: block;
    }

    /* Conditional Badge */
    .conditional-badge {
      display: inline-block;
      background: var(--conditional-bg);
      padding: 1px 6px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    /* Multiplicity */
    .multiplicity-container {
      background: var(--multiplicity-bg);
      padding: 6px;
      border-radius: 3px;
      position: relative;
    }

    .multiplicity-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      background: var(--accent);
      color: white;
      font-size: 11px;
      font-weight: 600;
      padding: 1px 5px;
      border-radius: 8px;
    }

    .multiplicity-more {
      display: block;
      text-align: center;
      color: var(--text-secondary);
      font-size: 13px;
    }

    /* Item inline wrapper for content + comment */
    .item-inline {
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }

    /* Comment Icons */
    .comment-icon {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      cursor: help;
      font-size: 10px;
      font-weight: 700;
      vertical-align: middle;
    }

    .comment-icon-text {
      line-height: 1;
    }

    .comment-question {
      background: #e3f2fd;
      color: #1565c0;
      border: 1px solid #90caf9;
    }

    .comment-warning {
      background: #fff3e0;
      color: #e65100;
      border: 1px solid #ffcc80;
    }

    .comment-info {
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #a5d6a7;
    }

    .comment-note {
      background: #f3e5f5;
      color: #7b1fa2;
      border: 1px solid #ce93d8;
      font-size: 10px;
    }

    /* Comment Popover */
    .comment-popover {
      display: none;
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      white-space: nowrap;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .comment-popover::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: #333;
    }

    .comment-icon:hover .comment-popover {
      display: block;
      white-space: normal;
    }
  `;
}

export function getScript(): string {
  return `
    const vscode = acquireVsCodeApi();

    // Canvas state
    let zoom = 1;
    let panX = 0;
    let panY = 0;
    let isPanning = false;
    let isDraggingCard = false;
    let spaceHeld = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let panStartX = 0;
    let panStartY = 0;
    let draggedCard = null;
    let cardStartX = 0;
    let cardStartY = 0;
    let cardDragDistance = 0;

    const MIN_ZOOM = 0.25;
    const MAX_ZOOM = 2;

    const previewArea = document.querySelector('.preview-area');
    const canvas = document.querySelector('.canvas');
    const zoomLevelDisplay = document.querySelector('.zoom-level');

    // Apply initial transform
    function updateTransform() {
      canvas.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoom + ')';
      zoomLevelDisplay.textContent = Math.round(zoom * 100) + '%';
    }

    // Mouse wheel: Figma-style controls
    // - Scroll = pan vertically
    // - Shift + Scroll = pan horizontally
    // - Cmd/Ctrl + Scroll = zoom
    previewArea.addEventListener('wheel', (e) => {
      e.preventDefault();

      if (e.metaKey || e.ctrlKey) {
        // Zoom (Cmd/Ctrl + scroll)
        const rect = previewArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Point in canvas space before zoom
        const canvasX = (mouseX - panX) / zoom;
        const canvasY = (mouseY - panY) / zoom;

        // Calculate new zoom
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * delta));

        // Adjust pan to keep mouse point stationary
        panX = mouseX - canvasX * newZoom;
        panY = mouseY - canvasY * newZoom;
        zoom = newZoom;
      } else if (e.shiftKey) {
        // Pan horizontally (Shift + scroll)
        panX -= e.deltaY;
      } else {
        // Pan vertically (regular scroll)
        panY -= e.deltaY;
        panX -= e.deltaX; // Also handle horizontal scroll (trackpad)
      }

      updateTransform();
      saveCanvasState();
    }, { passive: false });

    // Zoom buttons
    document.querySelector('.zoom-in').addEventListener('click', () => {
      zoom = Math.min(MAX_ZOOM, zoom * 1.2);
      updateTransform();
      saveCanvasState();
    });

    document.querySelector('.zoom-out').addEventListener('click', () => {
      zoom = Math.max(MIN_ZOOM, zoom / 1.2);
      updateTransform();
      saveCanvasState();
    });

    document.querySelector('.zoom-reset').addEventListener('click', () => {
      zoom = 1;
      panX = 0;
      panY = 0;
      updateTransform();
      saveCanvasState();
    });

    // Keyboard zoom
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !spaceHeld) {
        spaceHeld = true;
        previewArea.classList.add('space-held');
      }

      if ((e.metaKey || e.ctrlKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        zoom = Math.min(MAX_ZOOM, zoom * 1.2);
        updateTransform();
        saveCanvasState();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === '-') {
        e.preventDefault();
        zoom = Math.max(MIN_ZOOM, zoom / 1.2);
        updateTransform();
        saveCanvasState();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        zoom = 1;
        panX = 0;
        panY = 0;
        updateTransform();
        saveCanvasState();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        spaceHeld = false;
        previewArea.classList.remove('space-held');
      }
    });

    // Pan with mouse drag on canvas
    previewArea.addEventListener('mousedown', (e) => {
      // Check if clicking on empty area or holding space
      if (e.target === previewArea || e.target === canvas || spaceHeld) {
        isPanning = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        panStartX = panX;
        panStartY = panY;
        previewArea.classList.add('panning');
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isPanning) {
        panX = panStartX + (e.clientX - dragStartX);
        panY = panStartY + (e.clientY - dragStartY);
        updateTransform();
      }

      if (isDraggingCard && draggedCard) {
        const dx = (e.clientX - dragStartX) / zoom;
        const dy = (e.clientY - dragStartY) / zoom;
        cardDragDistance = Math.sqrt(dx * dx + dy * dy);
        draggedCard.style.left = (cardStartX + dx) + 'px';
        draggedCard.style.top = (cardStartY + dy) + 'px';

        // Redraw arrows in real-time while dragging
        if (typeof drawArrows === 'function') {
          drawArrows();
        }
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (isPanning) {
        isPanning = false;
        previewArea.classList.remove('panning');
        saveCanvasState();
      }

      if (isDraggingCard && draggedCard) {
        isDraggingCard = false;
        draggedCard.classList.remove('dragging');

        // Save position
        const placeName = draggedCard.dataset.placeName;
        const x = parseInt(draggedCard.style.left) || 0;
        const y = parseInt(draggedCard.style.top) || 0;

        vscode.postMessage({
          type: 'updatePosition',
          placeName: placeName,
          x: x,
          y: y
        });

        draggedCard = null;
      }
    });

    // Card dragging and click to navigate
    document.querySelectorAll('.place-header').forEach(header => {
      header.addEventListener('mousedown', (e) => {
        if (spaceHeld) return; // Don't drag cards while space is held

        e.stopPropagation();
        isDraggingCard = true;
        cardDragDistance = 0;
        draggedCard = header.closest('.place');
        draggedCard.classList.add('dragging');

        dragStartX = e.clientX;
        dragStartY = e.clientY;
        cardStartX = parseInt(draggedCard.style.left) || 0;
        cardStartY = parseInt(draggedCard.style.top) || 0;
      });

      // Click on header to navigate to source (only if not dragging)
      header.addEventListener('click', (e) => {
        if (cardDragDistance < 5) {
          const place = header.closest('.place');
          const placeName = place.dataset.placeName;
          if (placeName) {
            vscode.postMessage({
              type: 'navigateToPlace',
              placeName: placeName
            });
          }
        }
      });
    });

    // Save canvas state
    function saveCanvasState() {
      vscode.postMessage({
        type: 'updateCanvasState',
        zoom: zoom,
        panX: panX,
        panY: panY
      });
    }

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
      // Find the target card and pan to it
      const targetCard = document.querySelector('[data-place-name="' + placeName + '"]');
      if (targetCard) {
        const cardX = parseInt(targetCard.style.left) || 0;
        const cardY = parseInt(targetCard.style.top) || 0;

        // Center the card in the viewport
        const rect = previewArea.getBoundingClientRect();
        panX = rect.width / 2 - (cardX + 180) * zoom;
        panY = rect.height / 2 - (cardY + 100) * zoom;

        updateTransform();

        // Highlight briefly
        targetCard.classList.add('highlight');
        setTimeout(() => targetCard.classList.remove('highlight'), 1000);
      }
    }

    // Handle messages from extension
    window.addEventListener('message', event => {
      const message = event.data;
      switch (message.type) {
        case 'scrollToPlace':
          navigateToPlace(message.placeName);
          break;
        case 'setCanvasState':
          zoom = message.zoom || 1;
          panX = message.panX || 0;
          panY = message.panY || 0;
          updateTransform();
          break;
      }
    });

    // Initial transform
    updateTransform();

    // ========== ARROWS ==========
    const arrowsSvg = document.querySelector('.arrows-layer');
    let arrowsVisible = true;

    // Toggle arrows visibility
    const toggleArrowsBtn = document.querySelector('.toggle-arrows');
    toggleArrowsBtn.addEventListener('click', () => {
      arrowsVisible = !arrowsVisible;
      toggleArrowsBtn.classList.toggle('active', arrowsVisible);
      arrowsSvg.classList.toggle('hidden', !arrowsVisible);
    });

    // Draw all arrows
    function drawArrows() {
      // Clear existing arrows (keep defs)
      const defs = arrowsSvg.querySelector('defs');
      arrowsSvg.innerHTML = '';
      arrowsSvg.appendChild(defs);

      // Calculate required SVG size based on all cards
      let maxX = 0;
      let maxY = 0;
      document.querySelectorAll('.place').forEach(card => {
        const x = (parseInt(card.style.left) || 0) + card.offsetWidth + 200;
        const y = (parseInt(card.style.top) || 0) + card.offsetHeight + 200;
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });

      // Set SVG size with padding for bezier curves
      const svgWidth = Math.max(maxX, 2000);
      const svgHeight = Math.max(maxY, 2000);
      arrowsSvg.setAttribute('width', svgWidth);
      arrowsSvg.setAttribute('height', svgHeight);
      arrowsSvg.style.width = svgWidth + 'px';
      arrowsSvg.style.height = svgHeight + 'px';

      // Find all navigation sources
      const navSources = document.querySelectorAll('.nav-source[data-nav]');

      navSources.forEach(source => {
        const targetPlaceName = source.dataset.nav;
        const targetCard = document.querySelector('[data-place-name="' + targetPlaceName + '"]');

        if (!targetCard) return; // Target doesn't exist

        // Get source element position (relative to canvas)
        const sourceRect = source.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        // Get source element center
        const sourceCenterX = (sourceRect.left + sourceRect.width / 2 - canvasRect.left) / zoom;
        const sourceCenterY = (sourceRect.top + sourceRect.height / 2 - canvasRect.top) / zoom;

        // Get target card position and dimensions
        const targetX = parseInt(targetCard.style.left) || 0;
        const targetY = parseInt(targetCard.style.top) || 0;
        const targetWidth = targetCard.offsetWidth;
        const targetHeader = targetCard.querySelector('.place-header');
        const headerHeight = targetHeader ? targetHeader.offsetHeight : 40;
        const targetCenterX = targetX + targetWidth / 2;
        const targetHeaderCenterY = targetY + headerHeight / 2;

        // Determine which side to start/end based on relative positions
        let sourceX, sourceY, targetPointX, targetPointY;

        // Check if target is more to the right or left of source
        const isTargetRight = targetCenterX > sourceCenterX;
        const isTargetBelow = targetHeaderCenterY > sourceCenterY;

        // Calculate horizontal and vertical distances
        const horizontalDist = Math.abs(targetCenterX - sourceCenterX);
        const verticalDist = Math.abs(targetHeaderCenterY - sourceCenterY);

        // If target is primarily horizontal (more horizontal than vertical difference)
        if (horizontalDist > verticalDist * 0.5) {
          if (isTargetRight) {
            // Target is to the right: start from right edge, end at left edge of header
            sourceX = (sourceRect.right - canvasRect.left) / zoom;
            sourceY = sourceCenterY;
            targetPointX = targetX;
            targetPointY = targetHeaderCenterY;
          } else {
            // Target is to the left: start from left edge, end at right edge of header
            sourceX = (sourceRect.left - canvasRect.left) / zoom;
            sourceY = sourceCenterY;
            targetPointX = targetX + targetWidth;
            targetPointY = targetHeaderCenterY;
          }
        } else {
          // Target is primarily vertical
          if (isTargetBelow) {
            // Target is below: start from bottom edge, end at top of header
            sourceX = sourceCenterX;
            sourceY = (sourceRect.bottom - canvasRect.top) / zoom;
            targetPointX = targetCenterX;
            targetPointY = targetY;
          } else {
            // Target is above: start from top edge, end at bottom of header
            sourceX = sourceCenterX;
            sourceY = (sourceRect.top - canvasRect.top) / zoom;
            targetPointX = targetCenterX;
            targetPointY = targetY + headerHeight;
          }
        }

        // Calculate bezier control points for a smooth curve
        const dx = targetPointX - sourceX;
        const dy = targetPointY - sourceY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const controlOffset = Math.min(distance * 0.4, 150);

        let cp1x, cp1y, cp2x, cp2y;

        if (horizontalDist > verticalDist * 0.5) {
          // Horizontal curve
          cp1x = sourceX + (isTargetRight ? controlOffset : -controlOffset);
          cp1y = sourceY;
          cp2x = targetPointX + (isTargetRight ? -controlOffset : controlOffset);
          cp2y = targetPointY;
        } else {
          // Vertical curve
          cp1x = sourceX;
          cp1y = sourceY + (isTargetBelow ? controlOffset : -controlOffset);
          cp2x = targetPointX;
          cp2y = targetPointY + (isTargetBelow ? -controlOffset : controlOffset);
        }

        // Create SVG path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'arrow-path');
        path.setAttribute('d',
          'M ' + sourceX + ' ' + sourceY +
          ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + targetPointX + ' ' + targetPointY
        );

        arrowsSvg.appendChild(path);
      });
    }

    // Redraw arrows after card drag
    const originalMouseUp = document.onmouseup;
    document.addEventListener('mouseup', (e) => {
      // Redraw arrows after any drag operation
      setTimeout(drawArrows, 10);
    });

    // Initial arrow draw
    setTimeout(drawArrows, 100);

    // ========== AUTO-ORGANIZE ==========
    const CARD_WIDTH = 320;
    const CARD_HEIGHT = 250;
    const CARD_GAP = 30;
    const GROUP_GAP = 80;
    const CARDS_PER_ROW = 4;
    const START_X = 40;
    const START_Y = 40;

    document.querySelector('.auto-organize').addEventListener('click', autoOrganize);

    function autoOrganize() {
      const places = Array.from(document.querySelectorAll('.place'));
      if (places.length === 0) return;

      // 1. Build navigation graph
      const navGraph = buildNavigationGraph();

      // 2. Find connected clusters via navigation
      const clusters = findConnectedClusters(places, navGraph);

      // 3. For orphan screens (cluster size 1), group by shared words
      const orphans = [];
      const navClusters = [];
      clusters.forEach(cluster => {
        if (cluster.length === 1) {
          orphans.push(cluster[0]);
        } else {
          navClusters.push(cluster);
        }
      });

      const wordGroups = groupBySharedWords(orphans);

      // 4. Combine navigation clusters + word groups
      const allGroups = [...navClusters, ...wordGroups];

      // 5. Calculate positions for each group
      const positions = layoutGroups(allGroups);

      // 6. Animate cards to new positions
      animateToPositions(places, positions);

      // 7. Send batch update to extension
      const positionUpdates = [];
      for (const [placeName, pos] of Object.entries(positions)) {
        positionUpdates.push({ placeName, x: pos.x, y: pos.y });
      }
      vscode.postMessage({ type: 'batchUpdatePositions', positions: positionUpdates });

      // 8. Fit to view after animation
      setTimeout(() => {
        fitToView(positions);
        drawArrows();
      }, 350);
    }

    function buildNavigationGraph() {
      // Map: placeName -> Set of target place names
      const graph = {};
      // Also build reverse graph for bidirectional clustering
      const reverseGraph = {};

      document.querySelectorAll('[data-nav]').forEach(el => {
        const source = el.dataset.sourcePlace;
        const target = el.dataset.nav;
        if (!source || !target) return;

        if (!graph[source]) graph[source] = new Set();
        graph[source].add(target);

        if (!reverseGraph[target]) reverseGraph[target] = new Set();
        reverseGraph[target].add(source);
      });

      return { graph, reverseGraph };
    }

    function findConnectedClusters(places, navGraphs) {
      const { graph, reverseGraph } = navGraphs;
      const visited = new Set();
      const clusters = [];

      // Create a place name to element map
      const placeMap = {};
      places.forEach(place => {
        placeMap[place.dataset.placeName] = place;
      });

      function dfs(placeName, cluster) {
        if (visited.has(placeName) || !placeMap[placeName]) return;
        visited.add(placeName);
        cluster.push(placeMap[placeName]);

        // Follow outgoing navigation
        if (graph[placeName]) {
          graph[placeName].forEach(target => dfs(target, cluster));
        }

        // Follow incoming navigation
        if (reverseGraph[placeName]) {
          reverseGraph[placeName].forEach(source => dfs(source, cluster));
        }
      }

      places.forEach(place => {
        const placeName = place.dataset.placeName;
        if (!visited.has(placeName)) {
          const cluster = [];
          dfs(placeName, cluster);
          if (cluster.length > 0) {
            clusters.push(cluster);
          }
        }
      });

      return clusters;
    }

    function tokenizeName(name) {
      // Split on spaces, dashes, underscores, and camelCase boundaries
      return name
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]/g, ' ')
        .toLowerCase()
        .split(/\\s+/)
        .filter(w => w.length > 2 && !['the', 'modal', 'for', 'and', 'with'].includes(w));
    }

    function groupBySharedWords(screens) {
      if (screens.length === 0) return [];

      const groups = [];
      const used = new Set();

      for (const screen of screens) {
        const placeName = screen.dataset.placeName;
        if (used.has(placeName)) continue;

        const tokens = tokenizeName(placeName);
        const group = [screen];
        used.add(placeName);

        for (const other of screens) {
          const otherName = other.dataset.placeName;
          if (used.has(otherName)) continue;

          const otherTokens = tokenizeName(otherName);
          const shared = tokens.filter(t => otherTokens.includes(t));

          // Group if they share at least 1 significant word
          if (shared.length >= 1) {
            group.push(other);
            used.add(otherName);
          }
        }

        groups.push(group);
      }

      return groups;
    }

    function layoutGroups(groups) {
      const positions = {};
      let currentY = START_Y;

      groups.forEach(group => {
        // Sort group by name for consistent ordering
        group.sort((a, b) => a.dataset.placeName.localeCompare(b.dataset.placeName));

        // Layout group in rows, measuring actual heights
        let col = 0;
        let rowStartY = currentY;
        let maxHeightInRow = 0;

        group.forEach(place => {
          const x = START_X + col * (CARD_WIDTH + CARD_GAP);
          const y = rowStartY;

          positions[place.dataset.placeName] = { x, y };

          // Track max height in this row
          const actualHeight = place.offsetHeight || CARD_HEIGHT;
          maxHeightInRow = Math.max(maxHeightInRow, actualHeight);

          col++;
          if (col >= CARDS_PER_ROW) {
            // Move to next row
            col = 0;
            rowStartY += maxHeightInRow + CARD_GAP;
            maxHeightInRow = 0;
          }
        });

        // Add final row height if there are remaining cards
        if (col > 0) {
          currentY = rowStartY + maxHeightInRow + GROUP_GAP;
        } else {
          currentY = rowStartY + GROUP_GAP;
        }
      });

      return positions;
    }

    function animateToPositions(places, positions) {
      // Add transition to cards
      places.forEach(card => {
        card.style.transition = 'left 0.3s ease, top 0.3s ease';
      });

      // Move cards to new positions
      places.forEach(card => {
        const placeName = card.dataset.placeName;
        const pos = positions[placeName];
        if (pos) {
          card.style.left = pos.x + 'px';
          card.style.top = pos.y + 'px';
        }
      });

      // Remove transition after animation completes
      setTimeout(() => {
        places.forEach(card => {
          card.style.transition = '';
        });
      }, 350);
    }

    function fitToView(positions) {
      // Calculate bounding box of all cards using actual dimensions
      let minX = Infinity, minY = Infinity;
      let maxX = -Infinity, maxY = -Infinity;

      for (const [placeName, pos] of Object.entries(positions)) {
        const card = document.querySelector('[data-place-name="' + placeName + '"]');
        const cardWidth = card ? card.offsetWidth : CARD_WIDTH;
        const cardHeight = card ? card.offsetHeight : CARD_HEIGHT;

        minX = Math.min(minX, pos.x);
        minY = Math.min(minY, pos.y);
        maxX = Math.max(maxX, pos.x + cardWidth);
        maxY = Math.max(maxY, pos.y + cardHeight);
      }

      const contentWidth = maxX - minX;
      const contentHeight = maxY - minY;

      const rect = previewArea.getBoundingClientRect();
      const viewWidth = rect.width;
      const viewHeight = rect.height;
      const padding = 50;

      // Calculate zoom to fit all cards
      const scaleX = (viewWidth - padding * 2) / contentWidth;
      const scaleY = (viewHeight - padding * 2) / contentHeight;
      zoom = Math.min(scaleX, scaleY, 1); // Don't zoom in past 100%
      zoom = Math.max(zoom, MIN_ZOOM); // Don't go below min zoom

      // Center the content
      panX = (viewWidth - contentWidth * zoom) / 2 - minX * zoom;
      panY = padding - minY * zoom;

      updateTransform();
      saveCanvasState();
    }
  `;
}
