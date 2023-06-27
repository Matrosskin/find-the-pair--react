import React from 'react';
import { useSelector } from 'react-redux';

import './board.component.scss';
import GameOver from '../game-over/game-over.component';
import Winner from '../winner/winner.component';
import BoardHeader from '../board-header/board-header.component';
import BoardMap from '../board-map/board-map.component';
import { gameStatusSelector } from '../../selectors';

function Board() {
  const {
    isGamePaused,
    isGameStarted,
    isGameWin,
    isGameLoss,
  } = useSelector(gameStatusSelector);

  return (
    // TODO: I believe it would be better to left board at background while game paused,
    // but I have not time at the moment to implement styles for such behavior.
    <div className={`game-board ${isGamePaused ? 'invisible' : ''}`}>
      <BoardHeader />

      { isGameStarted && <BoardMap /> }
      { isGameWin && <Winner /> }
      { isGameLoss && <GameOver /> }
    </div>
  );
}

export default Board;
