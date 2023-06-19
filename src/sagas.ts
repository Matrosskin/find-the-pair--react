import {
  put, takeEvery, all, select, call,
} from 'redux-saga/effects';
import { ISettings, ActionType as SettingsActionType, settingsFetched } from './reducers/settings.reducer';

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

export default function* rootSaga() {
  yield all([
    watchSaveSettings(),
    watchFetchSettings(),
    fetchSettings(),
  ]);
}
