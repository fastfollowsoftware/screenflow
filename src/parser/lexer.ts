import { Token } from './types';

export function tokenize(content: string): Token[] {
  const lines = content.split('\n');
  const tokens: Token[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    if (trimmed === '') {
      tokens.push({ type: 'EMPTY', value: '', line: i, indent: 0 });
      continue;
    }

    // Calculate indentation (count leading spaces)
    const indent = line.length - line.trimStart().length;
    const text = trimmed.trim();

    if (indent === 0 && text) {
      // Top-level = Place (screen)
      tokens.push({ type: 'PLACE', value: text, line: i, indent: 0 });
    } else {
      tokens.push({ type: 'ITEM', value: text, line: i, indent });
    }
  }

  return tokens;
}
