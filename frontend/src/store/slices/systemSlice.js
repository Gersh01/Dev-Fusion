import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

let initialDisplayMode;

// * Use system display settings if cookie is not set
if (!cookies.get("display-mode")) {
	if (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		initialDisplayMode = "dark";
	} else {
		initialDisplayMode = "light";
	}
} else {
	initialDisplayMode = cookies.get("display-mode");
}

const systemSlice = createSlice({
	name: "system",
	initialState: {
		displayMode: initialDisplayMode,
		email: "example@email.com",
	},
	reducers: {
		setDisplayMode: (state, action) => {
			state.displayMode = action.payload;
		},
		setVerificationEmail: (state, action) => {
			state.email = action.payload;
		},
	},
});

export const { setDisplayMode, setVerificationEmail } = systemSlice.actions;
export default systemSlice.reducer;
