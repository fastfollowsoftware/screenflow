import { tokenize } from './lexer';
import { AST, Place, Item, ItemType, CommentType } from './types';

const TYPE_ANNOTATION_REGEX = /\.(input|button|checkbox|radio|link|dropdown)\b/g;
const NAVIGATION_REGEX = /\s*=>\s*(.+)$/;
const MULTIPLICITY_REGEX = /\s*\*(\d+)\s*/;
const CONDITIONAL_REGEX = /^@(\S+)\s*/;
const COMMENT_REGEX = /\s*\/\/\s*(.*)$/;

export function parse(content: string): AST {
  const tokens = tokenize(content);
  const places: Place[] = [];
  const placeIndex = new Map<string, Place>();

  let currentPlace: Place | null = null;
  let itemStack: { item: Item; indent: number }[] = [];

  for (const token of tokens) {
    if (token.type === 'PLACE') {
      // Save previous place
      if (currentPlace) {
        places.push(currentPlace);
        placeIndex.set(currentPlace.name, currentPlace);
      }

      // Extract comment from place name
      let placeName = token.value;
      let placeComment: string | undefined;
      let placeCommentType: CommentType | undefined;

      const commentMatch = placeName.match(COMMENT_REGEX);
      if (commentMatch) {
        const parsed = parseCommentType(commentMatch[1]);
        placeComment = parsed.text;
        placeCommentType = parsed.type;
        placeName = placeName.replace(COMMENT_REGEX, '').trim();
      }

      const isModal =
        placeName.toLowerCase().includes('(modal)') ||
        placeName.toLowerCase().includes(' modal');

      currentPlace = {
        name: placeName,
        items: [],
        line: token.line,
        isModal,
        comment: placeComment,
        commentType: placeCommentType,
      };
      itemStack = [];
    } else if (token.type === 'ITEM' && currentPlace) {
      const item = parseItem(token.value, token.indent, token.line);

      // Pop items from stack that are at same or deeper indent
      while (
        itemStack.length > 0 &&
        itemStack[itemStack.length - 1].indent >= token.indent
      ) {
        itemStack.pop();
      }

      if (itemStack.length === 0) {
        currentPlace.items.push(item);
      } else {
        itemStack[itemStack.length - 1].item.children.push(item);
      }

      itemStack.push({ item, indent: token.indent });
    }
  }

  // Don't forget the last place
  if (currentPlace) {
    places.push(currentPlace);
    placeIndex.set(currentPlace.name, currentPlace);
  }

  return { places, placeIndex };
}

function parseCommentType(commentText: string): { type: CommentType; text: string } {
  const trimmed = commentText.trim();
  if (trimmed.startsWith('?')) {
    return { type: 'question', text: trimmed.slice(1).trim() };
  } else if (trimmed.startsWith('!')) {
    return { type: 'warning', text: trimmed.slice(1).trim() };
  } else if (trimmed.startsWith('i ') || trimmed === 'i') {
    return { type: 'info', text: trimmed.slice(1).trim() };
  }
  return { type: 'note', text: trimmed };
}

function parseItem(text: string, indent: number, line: number): Item {
  let label = text;
  let itemType: ItemType = 'text';
  let navigation: string | undefined;
  let multiplicity: number | undefined;
  let isConditional = false;
  let conditionalText: string | undefined;
  let comment: string | undefined;
  let commentType: CommentType | undefined;

  // Extract comment first (before other parsing)
  const commentMatch = label.match(COMMENT_REGEX);
  if (commentMatch) {
    const parsed = parseCommentType(commentMatch[1]);
    comment = parsed.text;
    commentType = parsed.type;
    label = label.replace(COMMENT_REGEX, '');
  }

  // Check for conditional @show, @edit, etc.
  const conditionalMatch = label.match(CONDITIONAL_REGEX);
  if (conditionalMatch) {
    isConditional = true;
    conditionalText = conditionalMatch[1];
    label = label.replace(CONDITIONAL_REGEX, '');
  }

  // Extract navigation target
  const navMatch = label.match(NAVIGATION_REGEX);
  if (navMatch) {
    navigation = navMatch[1].trim();
    label = label.replace(NAVIGATION_REGEX, '');
  }

  // Extract multiplicity
  const multMatch = label.match(MULTIPLICITY_REGEX);
  if (multMatch) {
    multiplicity = parseInt(multMatch[1], 10);
    label = label.replace(MULTIPLICITY_REGEX, '');
  }

  // Extract type annotation
  const typeMatch = label.match(TYPE_ANNOTATION_REGEX);
  if (typeMatch) {
    itemType = typeMatch[0].slice(1) as ItemType;
    label = label.replace(TYPE_ANNOTATION_REGEX, '').trim();
  }

  // Check for checkbox syntax: [] or [ ]
  if (label.startsWith('[]') || label.startsWith('[ ]')) {
    itemType = 'checkbox';
    label = label.replace(/^\[\s*\]\s*/, '');
  }

  // Check for radio syntax: () or ( )
  if (label.startsWith('()') || label.startsWith('( )')) {
    itemType = 'radio';
    label = label.replace(/^\(\s*\)\s*/, '');
  }

  return {
    label: label.trim(),
    itemType,
    navigation,
    multiplicity,
    children: [],
    indent,
    line,
    isConditional,
    conditionalText,
    comment,
    commentType,
  };
}
