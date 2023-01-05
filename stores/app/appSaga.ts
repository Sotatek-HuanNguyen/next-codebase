// import { call } from 'redux-saga/effects';
// import { demoEffect } from './appApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';

import { appActions } from './appSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
  try {
    // Call api
    // yield call(demoEffect, action.payload);
    // Dispatch action success]
    yield put(appActions.incrementSuccess(action.payload));
  } catch (error) {
    yield put(appActions.incrementFailed());
  }
}

export default function* appSaga() {
  yield takeEvery(appActions.increment.type, handleIncrementSaga);
}
