import axios from "axios";

const getProjects = async () => {
	let auth = null;

	try {
		const response = await axios.post(
			"http://localhost:5000/api/discover",
			{
				searchBy: "title",
				sortBy: "relevance",
				query: "",
				count: 12,
				initial: true,
				projectId: "000000000000000000000000",
			},
			{ withCredentials: true }
		);
		if (response) {
			auth = response.data;
			return auth;
		}
	} catch (err) {
		console.log(
			`An error occurred while fetching all projects: ${err.message}`
		);
		return null;
	}
	return auth;
};

export { getProjects };
