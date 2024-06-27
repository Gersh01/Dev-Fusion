import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
	name: "system",
	initialState: {
		displayMode: "light",
	},
	reducers: {
		setDisplayMode: (state, action) => {
			state.displayMode = action.payload;
		},
	},
});

export const { setDisplayMode } = systemSlice.actions;
export default systemSlice.reducer;
