import axios from "axios";

const getProjects = async (queryConfig) => {
	console.log("Debug: FETCHING PROJECTS");

	const response = await axios.post(
		"http://localhost:5000/api/discover",

		queryConfig,
		{ withCredentials: true }
	);

	return response.data;
};

const getProjectById = async (projectId) => {
	console.log("Debug: Fetching project with ID: " + projectId);

	const response = await axios.get(
		`http://localhost:5000/api/project/${projectId}`,
		{},
		{ withCredentials: true }
	);

	return response.data;
};

export { getProjects, getProjectById };
