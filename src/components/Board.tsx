import { useState } from 'react';
import { displayMessages, INITIAL_GAME_DATA } from '../lib/constants';
import { Ship, Position } from '../lib/types';
import { generateBoard } from '../lib/utils';
import { BoardCell } from './BoardCell';

export function Board() {
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(displayMessages.welcome);
  const [shotsFired, setShotsFired] = useState(0);
  const [board, setBoard] = useState(() => generateBoard());
  const [sunkenShips, setSunkShips] = useState<string[]>(() => []);
  const [ships, setShips] = useState<Ship[]>(
    INITIAL_GAME_DATA.layout.map((shipData) => ({
      ship: shipData.ship,
      positions: shipData.positions as Position[],
      hits: [] as Position[],
    }))
  );

  function handleFire(row: number, column: number) {
    // if game is over or cell has been clicked return
    if (gameOver || board[row][column] !== 'unknown') {
      return;
    }

    // A shot has been fire, increment
    setShotsFired((prev) => prev + 1);

    // Check if the shot is a hit, returns -1 if NOT a hit
    const hitShipIndex = ships.findIndex((ship) =>
      ship.positions.some(
        ([shipRow, shipCol]) => shipRow === row && shipCol === column
      )
    );

    // MISS, try again
    if (hitShipIndex === -1) {
      const newBoard = [...board];
      newBoard[row][column] = 'miss';
      setBoard(newBoard);
      setMessage(displayMessages.miss);
    } else {
      // HIT, byebye
      const newShips = [...ships];
      const hitShip = newShips[hitShipIndex];
      hitShip.hits = [...hitShip.hits, [row, column]];
      setShips(newShips);

      // Update board
      const newBoard = [...board];
      newBoard[row][column] = 'hit';
      setBoard(newBoard);

      if (hitShip.hits.length === hitShip.positions.length) {
        setSunkShips((prev) => [...prev, hitShip.ship]);
        setMessage(displayMessages.sunk(hitShip.ship));

        // Check if all ships are sunk
        if (
          newShips.every((ship) => ship.hits.length === ship.positions.length)
        ) {
          setGameOver(true);
          setMessage(displayMessages.congratulations(shotsFired));
        }
      } else {
        setMessage(displayMessages.hit);
      }
    }
  }

  function handleReset() {
    // Reset the board to all "unknown" cells
    setBoard(generateBoard());

    // Reset ships to their initial state with empty hits arrays
    setShips(
      INITIAL_GAME_DATA.layout.map((shipData) => ({
        ship: shipData.ship,
        positions: shipData.positions as Position[],
        hits: [] as Position[],
      }))
    );

    // Reset game state
    setGameOver(false);
    setMessage(displayMessages.welcome);
    setShotsFired(0);
    setSunkShips([]);
  }

  return (
    <div>
      <p className='text-white font-bold mb-6 text-center'>{message}</p>
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className='flex'>
            {row.map((boardCellState, columnIndex) => (
              <BoardCell
                key={columnIndex}
                column={columnIndex}
                handleFire={handleFire}
                row={rowIndex}
                value={boardCellState}
              />
            ))}
          </div>
        );
      })}
      <div className='flex items-center mt-6 justify-between'>
        <p className='text-white'>
          {displayMessages.shotsFired}: {shotsFired}
        </p>
        <button
          onClick={handleReset}
          className='text-white p-2 bg-teal-500 rounded cursor-pointer'
        >
          {displayMessages.resetGame}
        </button>
      </div>
      <div className='text-white'>
        <p>
          {displayMessages.sunkenShips}: {sunkenShips.length}/{ships.length}
        </p>
        {sunkenShips.length ? (
          <ul className='h-24'>
            {sunkenShips.map((sunkenShip) => (
              <li className='pl-px'>{sunkenShip}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
