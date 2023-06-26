import {
  delay, put, select, takeEvery,
} from 'redux-saga/effects';

import { setTimer, startTimer, stopTimer } from '../reducers/timer.reducer';
import { newGameAction, setStartedAction } from '../reducers/game-status.reducer';
import { IGameStore } from '../store.interface';
import {
  ITileData, setBoard, openAllTiles, closeAllTiles,
} from '../reducers/board.reducer';
import { generateMap } from '../utils/common';

// eslint-disable-next-line require-yield
function* onNewGame() {
  yield put(stopTimer());
  yield put(setStartedAction());

  const newGameTime: number = yield select((state: IGameStore) => state.settings.durationTime * 60);
  yield put(setTimer(newGameTime));

  const mapSize: number = yield select((state: IGameStore) => state.settings.mapSize);
  const allCells: ITileData[] = generateMap(mapSize);
  yield put(setBoard(allCells));

  yield put(openAllTiles());
  const bonusTime: number = yield select((state: IGameStore) => state.settings.bonusTime);
  yield delay(bonusTime * 1000);
  yield put(closeAllTiles());

  yield put(startTimer());
}

// eslint-disable-next-line import/prefer-default-export
export function* watchNewGameAction() {
  yield takeEvery(newGameAction, onNewGame);
}
