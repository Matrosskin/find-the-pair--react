import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import Settings from './components/settings/settings.component';
import Board from './components/board/board.component';
import { GameStatus, newGameAction, setStartedAction } from './reducers/game-status.reducer';
import { IGameStore } from './store.interface';

function App() {
  const {
    isGamePaused,
    isGameIdle,
    isGameStarted,
    isGameWin,
    isGameLoss,
  } = useSelector(
    (state: IGameStore) => ({
      isGamePaused: state.status.gameStatus === GameStatus.PAUSED,
      isGameStarted: state.status.gameStatus === GameStatus.STARTED,
      isGameIdle: state.status.gameStatus === GameStatus.IDLE,
      isGameWin: state.status.gameStatus === GameStatus.WIN,
      isGameLoss: state.status.gameStatus === GameStatus.LOSS,
    }),
  );
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
