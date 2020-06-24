import { fromJS } from 'immutable';
import { createReducer } from './util';
import { UPDATE_STATE } from '../actions/state';
import { mqttReconnect } from '../mqtt';

const initialState = fromJS({
  DateTime: '',
  CyclicTemp: 0,
  CyclicOn: 0,
  CyclicOff: 0,
  FanMin: 1600,
  FanMax: 4500,
  FanRPM: 0,
  GlowVoltage: 0,
  GlowCurrent: 0,
  inputVoltage: 12,
  LowVoltCutout: 0,
  PumpActual: 0,
  PumpMin: 2,
  PumpMax: 5,
  PumpPrime: 0,
  RunState: 0,
  RunString: "Stopped/Standby",
  SysDate: '',
  SysGlowTime: 0,
  SysRunTime: 0,
  SysUpTime: 0,
  SysVer: '',
  TempBody: 0,
  TempCurrent: 0,
  TempDesired: 20,
  TempMax: 35,
  TempMin: 8,
  TempMode: 0,
  ThermostatMethod: 0,
  ThermostatWindow: 0,
  WebDate: '',
  WebVer: '',
});

const actionHandlers = {};

actionHandlers[UPDATE_STATE] = (state, action) => {
  const { key, value } = action;

  const ret = state.set(key, fromJS(value));

  console.log(`UPDATE: ${key} with ${value}`);

  if (key.indexOf('MQTTClient') === 0) {
    mqttReconnect(state);
  }

  return ret;
};

export default createReducer(initialState, actionHandlers);
