import { put, takeEvery, all } from 'redux-saga/effects';

const delay = (ms: number) => new Promise((res) => { setTimeout(res, ms); });

export function* increaseAsync() {
  yield delay(1000);
  yield put({ type: 'increase' });
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', increaseAsync);
}

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
  ]);
}
