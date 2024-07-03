import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../components/auth/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
