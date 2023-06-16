import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import counterReducer from './reducers/counter-reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  counterReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
