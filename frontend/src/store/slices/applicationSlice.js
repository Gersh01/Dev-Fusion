import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
	name: "application",
	initialState: {
		role: "",
	},
	reducers: {
		updateRole: (state, action) => {
			state.role = action.payload;
		},
	},
});

export const { updateRole } = applicationSlice.actions;
export default applicationSlice.reducer;
