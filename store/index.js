import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import { AsyncStorage } from 'react-native';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['status']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(thunk),
));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {
  persistor,
  store,
};
