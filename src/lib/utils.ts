import { BOARD_SIZE } from './constants';
import { BoardCellState } from './types';

export function generateBoard(): BoardCellState[][] {
  return Array(BOARD_SIZE)
    .fill(undefined)
    .map(() => Array(BOARD_SIZE).fill('unknown'));
}
