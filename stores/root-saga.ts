import { all } from 'redux-saga/effects';
import appSaga from './app/appSaga';

export default function* rootSaga() {
  yield all([appSaga()]);
}
