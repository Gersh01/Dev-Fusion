import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser: (_, action) => {
			return action.payload;
		},
		updateBio: (state, action) => {
			// state.bio = action.payload;
			return { ...state, bio: action.payload };
		},
		updateTechnologies: (state, action) => {
			return { ...state, technologies: action.payload };
		},
		updateUsersFirstName:(state,action)=>{
			return{...state, firstName:action.payload}
		},
		updateUsersLastName:(state,action)=>{
			return{...state, lastName:action.payload}
		},
		updateProfilePicture:(state,action)=>{
			return{...state, link:action.payload}
		}
	},
});

export const { setUser, updateBio, updateTechnologies, updateUsersFirstName, updateUsersLastName, updateProfilePicture } = userSlice.actions;

export default userSlice.reducer;
