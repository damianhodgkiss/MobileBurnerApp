import { all } from 'redux-saga/effects';
import state from './state';
import timers from './timers';

export default function* rootSaga() {
  yield all([
    state(),
    timers(),
  ]);
}