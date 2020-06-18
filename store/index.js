import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(thunk),
));

sagaMiddleware.run(rootSaga);