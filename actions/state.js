export const REFRESH_STATE = 'REFRESH_STATE';
export const UPDATE_STATE = 'UPDATE_STATE';
export const SEND_STATE = 'SEND_STATE';

export const refreshState = () => ({
  type: REFRESH_STATE,
});

export const updateState = (key, value) => ({
  type: UPDATE_STATE,
  key,
  value,
});

export const sendState = (key, value) => ({
  type: SEND_STATE,
  key,
  value,
});