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
		}
	},
});

export const { setUser, updateBio } = userSlice.actions;

export default userSlice.reducer;
