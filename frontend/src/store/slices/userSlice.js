import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import useJWT from "../../../hooks/authHooks";

const userSlice = createSlice({
	name: "user",
	initialState: useJWT(),
	reducers: {
		
	},
});

// export const { setUser } = userSlice.actions;
export default userSlice.reducer;
