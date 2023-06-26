import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import { ISettings, ActionType as SettingsActionType, settingsFetched } from '../reducers/settings.reducer';
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
  yield put(settingsFetched(settings));
}

export function* saveSettings() {
  const settings: ISettings = yield select((state: IGameStore) => state.settings);
  yield call([localStorage, localStorage.setItem], 'ftpe-settings', JSON.stringify(settings));
}

export function* watchFetchSettings() {
  yield takeEvery(SettingsActionType.FETCH_SETTINGS, fetchSettings);
}

export function* watchSaveSettings() {
  yield takeEvery(SettingsActionType.SAVE_SETTINGS, saveSettings);
}
