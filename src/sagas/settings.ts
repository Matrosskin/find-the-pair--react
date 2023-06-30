import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import {
  ISettings,
  fetchSettings as fetchSettingsAction,
  settingsFetched as settingsFetchedAction,
  saveSettings as saveSettingsAction,
} from '../reducers/settings.reducer';
import { IGameStore } from '../store.interface';

export function* fetchSettings() {
  const settingsStr: string = yield call([localStorage, localStorage.getItem], 'ftpe-settings');
  const settings: ISettings = settingsStr
    ? JSON.parse(settingsStr)
    : {
      bonusTime: 3,
      mapSize: 4,
      durationTime: 1,
    };
  yield put(settingsFetchedAction(settings));
}

function* saveSettings() {
  const settings: ISettings = yield select((state: IGameStore) => state.settings);
  yield call([localStorage, localStorage.setItem], 'ftpe-settings', JSON.stringify(settings));
}

export function* watchFetchSettings() {
  yield takeEvery(fetchSettingsAction.toString(), fetchSettings);
}

export function* watchSaveSettings() {
  yield takeEvery(saveSettingsAction.toString(), saveSettings);
}
