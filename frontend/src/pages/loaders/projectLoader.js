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

export { getProjects };
