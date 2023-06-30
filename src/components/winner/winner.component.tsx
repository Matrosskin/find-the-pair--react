import React from 'react';

import { useDispatch } from 'react-redux';

import { setIdle } from '../../reducers/game-status.reducer';

function Winner() {
  const dispatch = useDispatch();

  return (
    <div className="win-card">
      <div>🥳</div>
      <button type="button" className="game-btn blue-btn" onClick={() => dispatch(setIdle())}>
        Start new game
      </button>
    </div>
  );
}

export default Winner;
