import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser: (_, action) => {
			return action.payload;
		},
		updateBio:(state, action)=>{
			state.bio=action.payload
		},
		updateTechnologies:(state, action)=>{
			state.technologies = action.payload

	},
	},
});

export const { setUser, updateBio,updateTechnologies } = userSlice.actions;

export default userSlice.reducer;
