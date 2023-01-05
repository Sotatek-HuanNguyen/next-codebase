import { combineReducers } from 'redux';

import app from './app/appSlice';

// import counters from '../pages/counter/counterSlice';
// red

const rootReducer = combineReducers({
  app,
  // counters,
});

export default rootReducer;
