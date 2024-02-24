import { configureStore, combineReducers } from '@reduxjs/toolkit';


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { favoritesReducer } from './favoritesSlice';
import { carsReducer } from './carsSlice';
import { filtersReducer } from './filtersSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'], 
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cars: carsReducer,
  filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


