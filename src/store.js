import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/showReducer';
import { loadState, saveState } from './sessionStorage';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
