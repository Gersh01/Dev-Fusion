import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
  },
  reducers: {
    setUser: (state) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
