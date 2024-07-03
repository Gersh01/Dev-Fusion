import UserStorage from "../storage/UserStorage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  UserStorage,
};

const persistedReducer = persistReducer(persistConfig);

export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);
