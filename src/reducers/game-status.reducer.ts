import {
  combineActions, createAction, handleActions,
} from 'redux-actions';

enum ActionType {
  SET_STARTED = 'SET_STARTED',
  SET_PAUSED = 'SET_PAUSED',
  SET_WIN = 'SET_WIN',
  SET_LOSS = 'SET_LOSS',
  SET_IDLE = 'SET_IDLE',
  NEW_GAME = 'NEW_GAME',
}

export enum GameStatus {
  IDLE,
  STARTED,
  PAUSED,
  WIN,
  LOSS,
}

export const setStarted = createAction(ActionType.SET_STARTED, () => ({ gameStatus: GameStatus.STARTED }));
export const setPaused = createAction(ActionType.SET_PAUSED, () => ({ gameStatus: GameStatus.PAUSED }));
export const setWin = createAction(ActionType.SET_WIN, () => ({ gameStatus: GameStatus.WIN }));
export const setLoss = createAction(ActionType.SET_LOSS, () => ({ gameStatus: GameStatus.LOSS }));
export const setIdle = createAction(ActionType.SET_IDLE, () => ({ gameStatus: GameStatus.IDLE }));

export const newGame = createAction(ActionType.NEW_GAME);

export const statusReducer = handleActions(
  {
    [combineActions(
      setStarted,
      setPaused,
      setWin,
      setLoss,
      setIdle,
    ) as unknown as string]: (
      state,
      { payload: { gameStatus } },
    ) => ({ ...state, gameStatus }),
  },
  {
    gameStatus: GameStatus.IDLE,
  },
);

export interface IStatus {
  gameStatus: GameStatus;
}
