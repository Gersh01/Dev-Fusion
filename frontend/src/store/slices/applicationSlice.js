import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
	name: "application",
	initialState: {
		applicationsList: [],
		role: "",
		memberRole: "",
	},
	reducers: {
		updateRole: (state, action) => {
			state.role = action.payload;
		},
		updateApplications:(state, action)=>{
			return{...state, applicationsList:action[payload]}
		},
		updateMemberRole:(state,action)=>{
			state.memberRole = action.payload;
		}
	},
});

export const { updateRole,updateMemberRole } = applicationSlice.actions;
export default applicationSlice.reducer;
