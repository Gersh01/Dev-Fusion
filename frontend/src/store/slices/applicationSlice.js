import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
	name: "application",
	initialState: {
		applicationsList: [],
		role: "",
		memberRole: "",
		showModal:false,
		showDeleteModal:false,
		showLeaveModal:false,
		showRemoveModal:false,
		// removeUser:"",
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
		},
		showLeaveModal:(state,action)=>{
			state.showLeaveModal = action.payload
		},
		showRemoveModal: (state,action)=>{
			state.showRemoveModal = action.payload
		},
		updateRemoveUser:(state,action)=>{
			state.removeUser = action.payload;
		}
	},
});

export const { updateRole,updateMemberRole,showApplicationModal,showDeleteModal, showLeaveModal,showRemoveModal,updateRemoveUser } = applicationSlice.actions;
export default applicationSlice.reducer;
