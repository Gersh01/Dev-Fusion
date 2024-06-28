import { createSlice } from "@reduxjs/toolkit";


const systemSlice = createSlice({
	name: "system",
	initialState: {
		displayMode: "dark",
		email:"example@email.com"
	},
	reducers: {
		setDisplayMode: (state, action) => {
			state.displayMode = action.payload;
		},
		setVerificationEmail:(state,action) =>{
			state.email = action.payload
		}
	},
});

export const { setDisplayMode, setVerificationEmail } = systemSlice.actions;
export default systemSlice.reducer;
