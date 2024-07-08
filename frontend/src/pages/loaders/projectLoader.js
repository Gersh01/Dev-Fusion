import axios from "axios";
import { apiDomain } from "../../utils/utility";

const getProjects = async (queryConfig) => {
	const response = await axios.post(
		apiDomain + "/api/discover",
		queryConfig,
		{ withCredentials: true }
	);

	return response.data;
};

const getOwnedProjects = async (queryConfig) => {
	const response = await axios.post(
		apiDomain + "/api/owned-projects",
		queryConfig,
		{ withCredentials: true }
	);

	return response.data;
};

const getJoinedProjects = async (queryConfig) => {
	const response = await axios.post(
		apiDomain + "/api/joined-projects",
		queryConfig,
		{ withCredentials: true }
	);

	return response.data;
};

const getProjectById = async (projectId) => {
	const response = await axios.get(
		`${apiDomain}/api/project/${projectId}`,
		{},
		{ withCredentials: true }
	);

	return response.data;
};

const getProfileProjects = async (queryConfig) => {
	const response = await axios.post(
		apiDomain + "/api/owned-joined",
		queryConfig,
		{ withCredentials: true }
	);
	console.log(response.data);
	return response.data;
};

const updateTeamMembers = async(payload)=>{
	try{
		const response = await axios.put(apiDomain+"/api/project/team_members", payload,{withCredentials:true})
		if(response){
			return response
		}
	}catch(err){
		console.log(`Error: ${err.message}`)
	}
}


const userLeavingProject = async(payload)=>{
	try{
		const response = await axios.post(apiDomain+"/api/leave/project",payload,{withCredentials:true})
		if(response){
			console.log(response)
			console.log("User has left the project")
		}
	} catch(err){
		console.log(`Error: ${err.message}`)
	}
}



export {
	getProjects,
	getProjectById,
	getOwnedProjects,
	getJoinedProjects,
	getProfileProjects,
	updateTeamMembers,
	userLeavingProject,
};
