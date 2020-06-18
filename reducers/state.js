import { fromJS } from 'immutable';
import { createReducer } from './util';
import { UPDATE_STATE } from '../actions/state';

const initialState = fromJS({
});

const actionHandlers = {};

actionHandlers[UPDATE_STATE] = (state, action) => {
  const { key, value } = action;

  console.log(`UPDATE: ${key} with ${value}`);
  return state.set(key, fromJS(value));
};

export default createReducer(initialState, actionHandlers);
