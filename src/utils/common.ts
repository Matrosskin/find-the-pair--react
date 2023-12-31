import { emoji } from '../constants';
import { ITileData } from '../reducers/board.reducer';

function cutRandomItem(list: string[]): string {
  return list.splice(Math.round(Math.random() * (list.length - 1)), 1)[0];
}

export function generateMap(mapSize: number) {
  const amountOfCells = mapSize * mapSize;
  const isEmptyCellRequired = !!(amountOfCells % 2);
  const amountOfUniqueTiles = Math.trunc(amountOfCells / 2);
  const emojiCopy = [...emoji];
  const uniqueTiles = new Array(amountOfUniqueTiles)
    .fill(null).map(() => cutRandomItem(emojiCopy));
  const fullTilesSet = [
    ...uniqueTiles,
    ...uniqueTiles,
  ];

  const allCells: ITileData[] = new Array(amountOfCells).fill(null).map((_, index) => {
    const isEmpty = isEmptyCellRequired && amountOfUniqueTiles === index;
    return {
      id: index,
      emoji: isEmpty
        ? ''
        : cutRandomItem(fullTilesSet),
      isOpened: true,
      isEmpty,
    };
  });

  return allCells;
}

export function formatTime(time: number): string {
  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
}
