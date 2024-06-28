import { createSlice } from "@reduxjs/toolkit";
import { getUserFromJwt } from "../../pages/loaders/userLoader";

const userSlice = createSlice({
	name: "user",
	initialState: getUserFromJwt(),
	reducers: {},
});

export default userSlice.reducer;
