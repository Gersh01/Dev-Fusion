import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../loaders/UserSlice";
import storage from "redux-persist/lib/storage";

const defualt configureStore = {
 reducer:{
  user:userReducer
 }
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
