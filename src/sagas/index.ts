import {
  put, takeEvery, all, select, delay,
} from 'redux-saga/effects';

import {
  ITileData, closeTileOpenedTemporary, openTile, openTileTemporary,
} from '../reducers/board.reducer';
import { setWinAction } from '../reducers/game-status.reducer';
import { fetchSettings, watchFetchSettings, watchSaveSettings } from './settings';
import { watchStartTimer, watchStopTimer } from './timer';
import { watchNewGameAction } from './game-status';
import { temporaryOpenedTilesSelector, waitingForOpeningTilesSelector } from '../selectors';
import { stopTimer } from '../reducers/timer.reducer';

function* onOpenTileTemporary(action: ReturnType<typeof openTileTemporary>) {
  const temporaryOpenedTiles: ITileData[] = yield select(temporaryOpenedTilesSelector);
  if (temporaryOpenedTiles.length < 2) {
    return;
  }

  if (temporaryOpenedTiles.length > 2) {
    yield put(closeTileOpenedTemporary(action.payload.id));
    return;
  }

  if (temporaryOpenedTiles[0].emoji === temporaryOpenedTiles[1].emoji) {
    yield put(openTile(temporaryOpenedTiles[0].id));
    yield put(openTile(temporaryOpenedTiles[1].id));

    const waitingForOpeningTiles: ITileData[] = yield select(waitingForOpeningTilesSelector);
    if (!waitingForOpeningTiles.length) {
      yield put(setWinAction());
      yield put(stopTimer());
    }

    return;
  }

  yield delay(1000);

  yield put(closeTileOpenedTemporary(temporaryOpenedTiles[0].id));
  yield put(closeTileOpenedTemporary(temporaryOpenedTiles[1].id));
}

function* watchOpenTileTemporary() {
  yield takeEvery(openTileTemporary.toString(), onOpenTileTemporary);
}

export default function* rootSaga() {
  yield all([
    watchSaveSettings(),
    watchFetchSettings(),
    fetchSettings(),
    watchOpenTileTemporary(),

    watchStartTimer(),
    watchStopTimer(),

    watchNewGameAction(),
  ]);
}
