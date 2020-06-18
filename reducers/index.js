import { combineReducers } from 'redux';
import state from './state';
import timers from './timers';

export default combineReducers({
  state,
  timers,
});