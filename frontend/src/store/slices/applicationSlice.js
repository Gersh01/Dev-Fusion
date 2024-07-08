import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
	name: "application",
	initialState: {
		applicationsList: [],
		role: "",
		memberRole: "",
		showModal:false,
		showDeleteModal:false,
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
		},
		showApplicationModal:(state,action)=>{
			state.showModal = action.payload
		},
		showDeleteModal:(state,action)=>{
			state.showDeleteModal = action.payload
		}
	},
});

export const { updateRole,updateMemberRole,showApplicationModal,showDeleteModal } = applicationSlice.actions;
export default applicationSlice.reducer;
