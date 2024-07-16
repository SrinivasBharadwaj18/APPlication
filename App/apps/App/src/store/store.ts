import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/token/tokenSlice'
import { combineReducers } from "@reduxjs/toolkit";
import snackReducer from '../features/token/snackSlice'
import restReducer from '../features/token/roleSlice'
import logReducer from '../features/token/logSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
}


const rootReducer = combineReducers({
    snack: snackReducer,
    user: userReducer,
    rest: restReducer,
    log: logReducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  });

  export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch