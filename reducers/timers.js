import { fromJS } from 'immutable';
import { createReducer } from './util';
import { UPDATE_TIMER } from '../actions/timers';

const initialState = fromJS({
  timers: {},
});

const actionHandlers = {};

actionHandlers[UPDATE_TIMER] = (state, action) => {
  const { timer, data } = action;

  return state.mergeIn(['timers', timer], fromJS(data));
};

export default createReducer(initialState, actionHandlers);
