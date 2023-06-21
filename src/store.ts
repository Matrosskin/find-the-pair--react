import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import settingsReducer, { ISettings } from './reducers/settings.reducer';
import boardReducer, { ITileData } from './reducers/board.reducer';
import statusReducer, { IStatus } from './reducers/game-status.reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    settings: settingsReducer,
    board: boardReducer,
    status: statusReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

export interface IGameStore {
  settings: ISettings;
  board: ITileData[];
  status: IStatus;
}

sagaMiddleware.run(rootSaga);

export default store;
