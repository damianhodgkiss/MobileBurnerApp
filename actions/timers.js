export const REFRESH_TIMERS = 'REFRESH_TIMERS';
export const UPDATE_TIMER = 'UPDATE_TIMER';

export const refreshTimers = () => ({
  type: REFRESH_TIMERS,
});

export const updateTimer = (timer, data) => ({
  type: UPDATE_TIMER,
  timer,
  data
});