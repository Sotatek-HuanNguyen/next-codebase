import { combineReducers } from 'redux';

import app from './app/app.slice';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;
