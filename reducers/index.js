import { combineReducers } from 'redux';
import state from './state';
import status from './status';
import timers from './timers';

export default combineReducers({
  state,
  status,
  timers,
});