import Axios from "axios";
import { apiDomain } from "../../utils/utility";


export const updateUser = async (id, newInfo) => {
	try {
		await Axios.put(
			apiDomain + "/api/users",
			{ bio: newInfo, userId: id },
			{ withCredentials: true }
		);
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}

	return null;
};

export const updateUserTechnology = async (id, tech) => {
	const payload = { userId: id,technologies: tech  };
	try {
		await Axios.put(apiDomain + "/api/users", payload, {
			withCredentials: true,
		});
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
};

export const updateUserName = async (id, first, last) =>{
	const payload ={userId:id,firstName:first,lastName:last}
	console.log(payload)
	try {
		await Axios.put(apiDomain + "/api/users", payload, {
			withCredentials: true,
		});
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
};

export const updateProfilePicture = async (id, link)=>{
	const payload = {userId:id, link:link};
	try{
		await Axios.put(apiDomain+"/api/users",payload,{withCredentials:true})
	}catch(err){
		console.log(`Error: ${err.message}`)
	}
}


export default { updateUser, updateUserTechnology };
