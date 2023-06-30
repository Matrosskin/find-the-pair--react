import {
  call, put, select, take, takeEvery,
} from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';

import type { IGameStore } from '../store.interface';
import {
  startTimer, stopTimer, tickTimer,
} from '../reducers/timer.reducer';
import { GameStatus, setLoss } from '../reducers/game-status.reducer';
import { waitingForOpeningTilesSelector } from '../selectors';
import { ITileData } from '../reducers/board.reducer';

function countdown() {
  return eventChannel((emitter) => {
    const intervalId = window.setInterval(() => {
      emitter('null');
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(intervalId);
    };
  });
}

let chan: EventChannel<null> | undefined;

// eslint-disable-next-line require-yield
function* onStopTimer() {
  if (!chan) return;

  chan.close();
  chan = undefined;
}

function* onStartTimer(): unknown {
  yield onStopTimer();
  chan = yield call(countdown);

  while (true) {
    if (!chan) return;

    yield take(chan);
    const isPaused = yield select((state: IGameStore) => state.status.gameStatus === GameStatus.PAUSED);
    // eslint-disable-next-line no-continue
    if (isPaused) continue;

    yield put(tickTimer());
    const isTimeAvailable: boolean = yield select((state: IGameStore) => !!state.timer.leftTime);
    // eslint-disable-next-line no-continue
    if (isTimeAvailable) continue;

    const waitingForOpeningTiles: ITileData[] = yield select(waitingForOpeningTilesSelector);
    if (waitingForOpeningTiles.length) {
      yield put(setLoss());
      yield onStopTimer();
      return;
    }

    throw new Error('Unexpected state, user should never have such one.');
  }
}

export function* watchStartTimer() {
  yield takeEvery(startTimer, onStartTimer);
}

export function* watchStopTimer() {
  yield takeEvery(stopTimer, onStopTimer);
}
