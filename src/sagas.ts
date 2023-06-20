import {
  put, takeEvery, all, select, call,
} from 'redux-saga/effects';
import { ISettings, ActionType as SettingsActionType, settingsFetched } from './reducers/settings.reducer';
import { ActionType as BoardActionType, ITileData, setBoard } from './reducers/board.reducer';

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
  const settings: ISettings = yield select((state: { settings: ISettings }) => state.settings);
  yield call([localStorage, localStorage.setItem], 'ftpe-settings', JSON.stringify(settings));
}

function* watchFetchSettings() {
  yield takeEvery(SettingsActionType.FETCH_SETTINGS, fetchSettings);
}

function* watchSaveSettings() {
  yield takeEvery(SettingsActionType.SAVE_SETTINGS, saveSettings);
}

// TODO: At the moment it is not clear how to properly define type for "payload" in "action", so I used "any".
function* updateTile(action: any) {
  const board: ITileData[] = yield select((state: { board: ITileData[] }) => state.board);
  const { updatedTileData } = action.payload;
  const updatedBoard = board.map((prevTileData: any) => (
    prevTileData.id === updatedTileData.id
      ? updatedTileData
      : prevTileData
  ));
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
