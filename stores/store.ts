import { Action, configureStore, ThunkAction, Store } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { mainConfig } from '../configs/main-config';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';

export interface SagaStore extends Store {
  sagaTask: Task;
  reduxPersistData: Persistor;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'rememberData'],
};

export const enableReduxPersist = mainConfig.reduxPersistConfigs.enabled && mainConfig.isClientSide;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createReduxStore = (): SagaStore => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
    devTools: mainConfig.isDevEnv,
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  (store as SagaStore).reduxPersistData = enableReduxPersist
    ? persistStore(store)
    : persistStore(store);

  return store as SagaStore;
};

export type ReduxStore = ReturnType<typeof createReduxStore>;
export type ReduxDispatch = <TReturnType>(action: Action) => TReturnType;
export type ReduxState = ReturnType<ReduxStore['getState']>;
export type ReduxThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>;

export const reduxWrapper = createWrapper<ReduxStore>(createReduxStore, {
  debug: mainConfig.isDevEnv,
});
