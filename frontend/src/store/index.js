import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import systemSlice from "./slices/systemSlice";
import applicationSlice from "./slices/applicationSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		system: systemSlice,
		application: applicationSlice,
	},
});

export default store;
