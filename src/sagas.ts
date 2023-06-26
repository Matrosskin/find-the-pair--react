import {
  put, takeEvery, all, select, call,
} from 'redux-saga/effects';
import { ISettings, ActionType as SettingsActionType, settingsFetched } from './reducers/settings.reducer';
import {
  ITileData, closeTileOpenedTemporary, openTile, openTileTemporary,
} from './reducers/board.reducer';
import { setWinAction } from './reducers/game-status.reducer';
import type { IGameStore } from './store';

function* fetchSettings() {
  const settingsStr: string = yield call([localStorage, localStorage.getItem], 'ftpe-settings');
  const settings: ISettings = settingsStr
    ? JSON.parse(settingsStr)
    : {
      bonusTime: 3,
      mapSize: 4,
      durationTime: 1,
    };
  yield put(settingsFetched(settings));
}

function* saveSettings() {
  const settings: ISettings = yield select((state: IGameStore) => state.settings);
  yield call([localStorage, localStorage.setItem], 'ftpe-settings', JSON.stringify(settings));
}

function* watchFetchSettings() {
  yield takeEvery(SettingsActionType.FETCH_SETTINGS, fetchSettings);
}

function* watchSaveSettings() {
  yield takeEvery(SettingsActionType.SAVE_SETTINGS, saveSettings);
}

const delay = (ms: number) => new Promise((res) => { setTimeout(res, ms); });

const temporaryOpenedTilesSelector: (state: IGameStore) => ITileData[] = (state: IGameStore) => (
  state.board.filter((tileData) => tileData.isTemporaryOpened));

const waitingForOpeningTilesSelector: (state: IGameStore) => ITileData[] = (state: IGameStore) => (
  state.board.filter((tileData) => !tileData.isOpened && !tileData.isEmpty));

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
  ]);
}
