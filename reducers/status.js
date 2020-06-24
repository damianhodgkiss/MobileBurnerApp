import { fromJS } from 'immutable';
import { createReducer } from './util';
import { UPDATE_STATUS } from '../actions/status';

const initialState = fromJS({
  status: 'offline',
});

const actionHandlers = {};

actionHandlers[UPDATE_STATUS] = (state, action) => state.set('status', action.status);

export default createReducer(initialState, actionHandlers);
