import axios from "axios";
import { apiDomain } from "../../utils/utility";

const getProjects = async (queryConfig) => {
	console.log("Debug: FETCHING PROJECTS");

	const response = await axios.post(
		apiDomain + "/api/discover",

		queryConfig,
		{ withCredentials: true }
	);

	return response.data;
};

const getProjectById = async (projectId) => {
	console.log("Debug: Fetching project with ID: " + projectId);

	const response = await axios.get(
		`${apiDomain}/api/project/${projectId}`,
		{},
		{ withCredentials: true }
	);

	return response.data;
};

const getProfileProjects = async (queryConfig)=>{
	const response = await axios.post(
		apiDomain + "/api/owned-joined", 
		queryConfig, {withCredentials:true}
	)

	return response.data;
}


export { getProjects, getProjectById, getProfileProjects };
