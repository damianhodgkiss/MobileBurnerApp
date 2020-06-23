import { takeLatest } from 'redux-saga/effects';
import { REFRESH_STATE, SEND_STATE } from '../actions/state';
import { mqttSend } from '../mqtt';

function *refreshState() {
  console.log('Refreshing state');
  mqttSend({ Refresh: 1 });
}

function *sendState({ key, value }) {
  console.log('SEND:', key, value);
  mqttSend({ [key]: value });
  mqttSend({ Refresh: 1 });
}

export default function *actionWatcher() {
  yield takeLatest(REFRESH_STATE, refreshState);
  yield takeLatest(SEND_STATE, sendState);
}