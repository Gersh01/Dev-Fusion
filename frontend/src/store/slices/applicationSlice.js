import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
	name: "application",
	initialState: {
		applicationsList: [],
		role: "",
	},
	reducers: {
		updateRole: (state, action) => {
			state.role = action.payload;
		},
		updateApplications:(state, action)=>{
			return{...state, applicationsList:action[payload]}
		}
	},
});

export const { updateRole } = applicationSlice.actions;
export default applicationSlice.reducer;
