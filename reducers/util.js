export const createReducer = (initialState, actionHandlers, opts = {}) => (s, action) => { // eslint-disable-line import/prefer-default-export, max-len
  const { beforeUpdate, afterUpdate } = opts;
  let state = s;

  if (state === undefined) state = initialState;

  const reduceFn = actionHandlers[action.type];
  if (!reduceFn) return state;

  if (beforeUpdate && typeof beforeUpdate === 'function') state = beforeUpdate(state, action);
  state = reduceFn(state, action);
  if (afterUpdate && typeof afterUpdate === 'function') state = afterUpdate(state, action);

  return state;
};