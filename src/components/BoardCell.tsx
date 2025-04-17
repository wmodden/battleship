import clsx from 'clsx';
import { BoardCellState } from '../lib/types';

type Props = {
  column: number;
  row: number;
  value: BoardCellState;
  handleFire: (row: number, column: number) => void;
};

// Individual cell on the board
export function BoardCell({ column, row, value, handleFire }: Props) {
  return (
    <button
      onClick={() => handleFire(row, column)}
      className={clsx('size-9 ring ring-inset ring-gray-500', {
        'bg-teal-500 cursor-not-allowed': value === 'miss',
        'bg-red-500 cursor-not-allowed': value === 'hit',
        'bg-white hover:bg-gray-200 cursor-pointer': value === 'unknown',
      })}
    />
  );
}
