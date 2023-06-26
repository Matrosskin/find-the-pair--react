import { createAction } from 'redux-actions';

import { handleActions } from '../utils/redux-actions';

enum ActionType {
  SET_TIMER = 'SET_TIMER',
  TICK_TIMER = 'TICK_TIMER',

  // Actions for saga.
  START_TIMER = 'START_TIMER',
  STOP_TIMER = 'STOP_TIMER',
  PAUSE_TIMER = 'PAUSE_TIMER',
}

export const setTimer = createAction(ActionType.SET_TIMER, (leftTime: number) => ({ leftTime }));
export const tickTimer = createAction(ActionType.TICK_TIMER, () => ({ step: -1 }));

// Actions for saga.
export const startTimer = createAction(ActionType.START_TIMER);
export const stopTimer = createAction(ActionType.STOP_TIMER);
export const pauseTimer = createAction(ActionType.PAUSE_TIMER);

const handlers = [
  [
    setTimer,
    (state: IGameTimer, { payload: { leftTime } }: ReturnType<typeof setTimer>) => ({ ...state, leftTime }),
  ],
  [
    tickTimer,
    (state: IGameTimer, { payload: { step } }: ReturnType<typeof tickTimer>) => (
      { ...state, leftTime: state.leftTime + step }
    ),
  ],
];

export const timerReducer = handleActions<IGameTimer>(handlers, { leftTime: 100 });

export interface IGameTimer {
  leftTime: number
}
