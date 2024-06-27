import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser: (state, action) => {
			state.value = [...state.value, action.payload];
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
