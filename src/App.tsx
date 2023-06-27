import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import Settings from './components/settings/settings.component';
import Board from './components/board/board.component';
import { newGameAction, setStartedAction } from './reducers/game-status.reducer';
import { gameStatusSelector } from './selectors';

function App() {
  const {
    isGamePaused,
    isGameIdle,
    isGameStarted,
    isGameWin,
    isGameLoss,
  } = useSelector(gameStatusSelector);
  const dispatch = useDispatch();

  const onStartGame = () => {
    dispatch(newGameAction());
  };

  const onResumeGame = () => {
    dispatch(setStartedAction());
  };

  return (
    <div className="ftpr-app">
      { (isGamePaused || isGameStarted || isGameWin || isGameLoss)
        && (
          <Board />
        )}
      { (isGamePaused || isGameIdle)
        && (
          <Settings
            isGamePaused={isGamePaused}
            onStartGame={onStartGame}
            onResumeGame={onResumeGame}
          />
        )}
    </div>
  );
}

export default App;
