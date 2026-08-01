import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";

import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";

import mmkvStorage from "../utils/mmkvStorage";

const persistConfig = {

  key: "root",

  storage: mmkvStorage,

  whitelist: ["auth"],

};

const rootReducer = combineReducers({

  auth: authReducer,

  [baseApi.reducerPath]: baseApi.reducer,

});

const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer
  );

export const store =
  configureStore({

    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>

      getDefaultMiddleware({

        serializableCheck: false,

      }).concat(baseApi.middleware),

  });

export const persistor =
  persistStore(store);