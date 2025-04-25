// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import thunk, {ThunkDispatch, ThunkMiddleware} from 'redux-thunk';
// import {rootReducer} from './reducers';
// import {AppState} from './types';
// import {AnyAction} from 'redux';

// const allReducers = combineReducers({
//   rootReducer,
// });

// export const store = createStore(
//   allReducers,
//   applyMiddleware(thunk as unknown as ThunkMiddleware<AppState, AnyAction>),
// );

import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../store/reducers';

export const store = configureStore({
  reducer: rootReducer,
});

// Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
