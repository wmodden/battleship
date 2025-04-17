// we can make the board dynamic, defauls to 10 if env not set on CICD (netlify)
export const BOARD_SIZE = import.meta.env.BOARD_SIZE ?? 10;

// sample JSON provided
export const INITIAL_GAME_DATA = {
  // not used on this implementation
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  },
  layout: [
    {
      ship: 'carrier',
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: 'battleship',
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: 'cruiser',
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: 'submarine',
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: 'destroyer',
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
};

export const displayMessages = {
  welcome: 'Start playing by clicking on a cell to fire!',
  shotsFired: 'Shots fired',
  resetGame: 'Reset game',
  sunkenShips: 'Sunken ships',
  miss: 'Miss!',
  hit: 'Hit!',
  sunk: (ship: string) => `You sunk the ${ship}!`,
  congratulations: (shotsFired: number) =>
    `Congratulations! You've sunk all ships in ${shotsFired + 1} shots!`,
};
