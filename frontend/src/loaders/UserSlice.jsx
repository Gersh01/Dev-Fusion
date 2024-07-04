import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    value: "Example@email.com",
  },
  reducers: {
    addingUser: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});
console.log(UserSlice);
export const { addingUser } = UserSlice.actions;

export default UserSlice.reducer;
