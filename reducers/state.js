import { fromJS } from 'immutable';
import { createReducer } from './util';
import { UPDATE_STATE } from '../actions/state';

const initialState = fromJS({
  FanMin: 1600,
  FanMax: 4000,
  inputVoltage: 12,
  LowVoltCutout: 0,
  PumpMin: 2,
  PumpMax: 4,
  SysDate: '12 May 2020',
  SysGlowTime: 438483,
  SysRunTime: 794285,
  SysUpTime: 395821,
  SysVer: '3.2.1',
  TempMode: 0,
  WebDate: '12 May 2020',
  WebVer: '3.2.1',
});

const actionHandlers = {};

actionHandlers[UPDATE_STATE] = (state, action) => {
  const { key, value } = action;

  console.log(`UPDATE: ${key} with ${value}`);
  return state.set(key, fromJS(value));
};

export default createReducer(initialState, actionHandlers);
