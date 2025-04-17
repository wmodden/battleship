// from the description "the computer indicates if this was a “hit” or a “miss”", we still need to add an unknown value
export type BoardCellState = 'unknown' | 'hit' | 'miss';
export type Position = [number, number];
export type Ship = {
  ship: string;
  positions: Position[];
  hits: Position[];
};
