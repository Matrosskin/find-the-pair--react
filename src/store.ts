import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

import { settingsReducer } from './reducers/settings.reducer';
import { boardReducer } from './reducers/board.reducer';
import { statusReducer } from './reducers/game-status.reducer';
import rootSaga from './sagas';
import { timerReducer } from './reducers/timer.reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    settings: settingsReducer,
    board: boardReducer,
    status: statusReducer,
    timer: timerReducer,
  }),
  composeWithDevToolsDevelopmentOnly(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
