import { all } from 'redux-saga/effects';

import { fetchSettings, watchFetchSettings, watchSaveSettings } from './settings';
import { watchStartTimer, watchStopTimer } from './timer';
import { watchNewGameAction } from './game-status';
import { watchOpenTileTemporary } from './board';

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
