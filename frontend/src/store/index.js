import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import systemSlice from "./slices/systemSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		system: systemSlice,
	},
});

export default store;
