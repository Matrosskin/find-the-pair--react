import React from 'react';
import { useDispatch } from 'react-redux';

import { setIdleAction } from '../../reducers/game-status.reducer';

function GameOver() {
  const dispatch = useDispatch();

  return (
    <div className="loss-card">
      <div>☠️</div>
      <button type="button" className="game-btn blue-btn" onClick={() => dispatch(setIdleAction())}>
        Try again
      </button>
    </div>
  );
}

export default GameOver;
