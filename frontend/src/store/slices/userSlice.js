import { createSlice } from "@reduxjs/toolkit";
import { getUserFromJwt } from "../../pages/loaders/userLoader";

const userSlice = createSlice({
	name: "user",
	initialState: {
		value: {
			"id": "667147c37d5f8d94a8a374c1",
			"firstName": "Golden",
			"lastName": "Lin",
			"email": "goldenlin0909@gmail.com",
			"username": "GoldenL",
			"bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia vel atque aspernatur saepe praesentium minus, a distinctio dolor voluptates delectus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia vel atque aspernatur saepe praesentium minus, a distinctio dolor voluptates delectus?",
			"technologies": [
				"VsCode"
			],
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdvbGRlbkwiLCJpYXQiOjE3MTk1MzUxNzYsImV4cCI6MTcxOTYyMTU3Nn0.7VqAw3LATVGPKqLDjfQtXYBgIL33reqCLiVOXYeLBBc",
			"error": ""
		},
	},
	reducers: {
		addUser:(state,action)=>{
			state.value = action.payload;
		}
	},
});
export const {addUser} = userSlice.actions

export default userSlice.reducer;
