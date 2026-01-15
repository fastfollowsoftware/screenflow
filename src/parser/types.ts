export type ItemType =
  | 'input'
  | 'button'
  | 'checkbox'
  | 'radio'
  | 'link'
  | 'dropdown'
  | 'text';

export interface Place {
  name: string;
  items: Item[];
  line: number;
  isModal: boolean;
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
