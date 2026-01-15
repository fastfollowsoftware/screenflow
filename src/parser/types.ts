export type ItemType =
  | 'input'
  | 'button'
  | 'checkbox'
  | 'radio'
  | 'link'
  | 'dropdown'
  | 'text';

export type CommentType = 'question' | 'warning' | 'info' | 'note';

export interface Place {
  name: string;
  items: Item[];
  line: number;
  isModal: boolean;
  comment?: string;
  commentType?: CommentType;
}

export interface Item {
  label: string;
  itemType: ItemType;
  navigation?: string;
  multiplicity?: number;
  children: Item[];
  indent: number;
  line: number;
  isConditional: boolean;
  conditionalText?: string;
  comment?: string;
  commentType?: CommentType;
}

export interface AST {
  places: Place[];
  placeIndex: Map<string, Place>;
}

export interface Token {
  type: 'PLACE' | 'ITEM' | 'EMPTY';
  value: string;
  line: number;
  indent: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface CanvasState {
  positions: Record<string, Position>;
  zoom: number;
  pan: Position;
}
