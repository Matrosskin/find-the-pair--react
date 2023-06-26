import {
  combineActions, createAction, createActions, handleActions,
} from 'redux-actions';

enum ActionType {
  SET_STARTED_ACTION = 'SET_STARTED_ACTION',
  SET_PAUSED_ACTION = 'SET_PAUSED_ACTION',
  SET_WIN_ACTION = 'SET_WIN_ACTION',
  SET_LOSS_ACTION = 'SET_LOSS_ACTION',
  SET_IDLE_ACTION = 'SET_IDLE_ACTION',
  NEW_GAME_ACTION = 'NEW_GAME_ACTION',
}

export enum GameStatus {
  IDLE,
  STARTED,
  PAUSED,
  WIN,
  LOSS,
}

const {
  setStartedAction,
  setPausedAction,
  setWinAction,
  setLossAction,
  setIdleAction,
} = createActions({
  [ActionType.SET_STARTED_ACTION]: () => ({ gameStatus: GameStatus.STARTED }),
  [ActionType.SET_PAUSED_ACTION]: () => ({ gameStatus: GameStatus.PAUSED }),
  [ActionType.SET_WIN_ACTION]: () => ({ gameStatus: GameStatus.WIN }),
  [ActionType.SET_LOSS_ACTION]: () => ({ gameStatus: GameStatus.LOSS }),
  [ActionType.SET_IDLE_ACTION]: () => ({ gameStatus: GameStatus.IDLE }),
});

const newGameAction = createAction(ActionType.NEW_GAME_ACTION);

export const statusReducer = handleActions(
  {
    [combineActions(
      setStartedAction,
      setPausedAction,
      setWinAction,
      setLossAction,
      setIdleAction,
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

export {
  ActionType,
  setStartedAction,
  setPausedAction,
  setWinAction,
  setLossAction,
  setIdleAction,
  newGameAction,
};
