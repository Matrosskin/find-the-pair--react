import React, { useEffect, useState } from 'react';

import './board.component.scss';
import { ISettings } from '../../reducers/settings.reducer';

const leftTime = '2:13';

type BoardProps = {
  onPauseGame: () => void,
  settings: ISettings,
  isPaused: boolean,
};

function Board({ onPauseGame, settings, isPaused }: BoardProps) {
  const [boardMap, setBoardMap] = useState<any | null>(null);

  useEffect(() => {
    const size = settings.mapSize;
    const amountOfCells = size * size;
    const isEmptyCellRequired = !!(amountOfCells % 2);
    const allCells = new Array(amountOfCells).fill(<div className="board-cell">?</div>);
    if (isEmptyCellRequired) {
      const indexOfEmptyCell = Math.trunc(amountOfCells / 2);
      allCells[indexOfEmptyCell] = <div className="board-cell" />;
    }
    const boardCells = new Array(size).fill(null).map(
      () => <div className="board-line">{allCells.splice(0, size)}</div>,
    );
    setBoardMap(boardCells);
  }, [settings]);

  return (
    // TODO: I believe it would be better to left board at background while game paused,
    // but I have not time at the moment to implement styles for such behavior.
    <div className={`game-board ${isPaused ? 'invisible' : ''}`}>
      <div className="board-header card">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <span>Time left: {leftTime}</span>
        <button type="button" className="game-btn blue-btn" onClick={onPauseGame}>Pause</button>
      </div>
      <div className="board-body card">
        {boardMap}
      </div>
    </div>
  );
}

export default Board;
