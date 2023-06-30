import React from 'react';
import { useDispatch } from 'react-redux';

import { setIdle } from '../../reducers/game-status.reducer';

function GameOver() {
  const dispatch = useDispatch();

  return (
    <div className="loss-card">
      <div>☠️</div>
      <button type="button" className="game-btn blue-btn" onClick={() => dispatch(setIdle())}>
        Try again
      </button>
    </div>
  );
}

export default GameOver;
