import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './board-header.component.scss';
import { formatTime } from '../../utils/common';
import { setPaused } from '../../reducers/game-status.reducer';
import { gameStatusSelector, leftTimeSelector } from '../../selectors';

function BoardHeader() {
  const leftTime = useSelector(leftTimeSelector);
  const { isGameStarted } = useSelector(gameStatusSelector);
  const dispatch = useDispatch();

  const onPauseClick = useCallback(() => { dispatch(setPaused()); }, []);

  return (
    <div className="board-header card">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <span>Time left: {formatTime(leftTime)}</span>
      { isGameStarted
        && <button type="button" className="game-btn blue-btn" onClick={onPauseClick}>Pause</button> }
    </div>
  );
}

export default BoardHeader;
