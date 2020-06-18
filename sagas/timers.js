import { takeLatest } from 'redux-saga/effects';
import { REFRESH_TIMERS } from '../actions/timers';
import { mqttSend } from '../mqtt';

function *refreshTimers() {
  console.log('Refreshing timers');
  for (let timer = 1; timer <= 14; timer++) {
    mqttSend({ TQuery: timer });
  }
}

export default function *actionWatcher() {
  yield takeLatest(REFRESH_TIMERS, refreshTimers);
}