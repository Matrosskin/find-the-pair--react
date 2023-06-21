import React from 'react';

import { useDispatch } from 'react-redux';

import { setIdleAction } from '../../reducers/game-status.reducer';

function Winner() {
  const dispatch = useDispatch();

  return (
    <div className="win-card">
      <div>🥳</div>
      <button type="button" className="game-btn blue-btn" onClick={() => dispatch(setIdleAction())}>
        Start new game
      </button>
    </div>
  );
}

export default Winner;
