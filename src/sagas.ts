import {
  put, takeEvery, all, select, call,
} from 'redux-saga/effects';
import { ISettings, ActionType as SettingsActionType, settingsFetched } from './reducers/settings.reducer';
import { ActionType as BoardActionType, ITileData, setBoard } from './reducers/board.reducer';
import { setWinAction } from './reducers/game-status.reducer';
import { updateBoard } from './utils';
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

// TODO: At the moment it is not clear how to properly define type for "payload" in "action", so I used "any".
function* updateTile(action: any) {
  const board: ITileData[] = yield select((state: IGameStore) => state.board);
  const { updatedTileData } = action.payload;

  const alreadyOpenedTiles = board.filter((tileData) => tileData.isOpened && tileData.isTemporaryOpened);
  if (!alreadyOpenedTiles.length) {
    const updatedBoard = updateBoard(board, [{
      ...updatedTileData,
      isTemporaryOpened: true,
    }]);

    yield put(setBoard(updatedBoard));
    return;
  }

  if (alreadyOpenedTiles.length === 2) {
    return;
  }

  if (alreadyOpenedTiles[0].emoji === updatedTileData.emoji) {
    const updatedBoard = updateBoard(board, [
      updatedTileData,
      {
        ...alreadyOpenedTiles[0],
        isTemporaryOpened: false,
      },
    ]);

    yield put(setBoard(updatedBoard));
    const closedTile = updatedBoard.find((tile) => (!tile.isOpened || tile.isTemporaryOpened) && !tile.isEmpty);
    if (!closedTile) {
      yield put(setWinAction());
    }
    return;
  }

  let updatedBoard = updateBoard(board, [{
    ...updatedTileData,
    isTemporaryOpened: true,
  }]);
  yield put(setBoard(updatedBoard));

  yield delay(1000);

  const actualBoard: ITileData[] = yield select((state: IGameStore) => state.board);
  updatedBoard = updateBoard(actualBoard, [
    {
      ...updatedTileData,
      isOpened: false,
      isTemporaryOpened: false,
    },
    {
      ...alreadyOpenedTiles[0],
      isOpened: false,
      isTemporaryOpened: false,
    },
  ]);

  yield put(setBoard(updatedBoard));
}

function* watchUpdateTile() {
  yield takeEvery(BoardActionType.UPDATE_TILE, updateTile);
}

export default function* rootSaga() {
  yield all([
    watchSaveSettings(),
    watchFetchSettings(),
    fetchSettings(),
    watchUpdateTile(),
  ]);
}
