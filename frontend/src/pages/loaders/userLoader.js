import axios from "axios";

const getUserFromJwt = async () => {
	let auth = null;
	// axios.defaults.withCredentials = true;

	try {
		const response = await axios.post(
			"http://localhost:5000/api/jwtTest",
			null,
			{ withCredentials: true }
		);
		if (response) {
			auth = response.data;
			return auth;
		}
	} catch (err) {
		console.log(`Error: ${err.message}`);
		return null;
	}
	//return auth;
};

export { getUserFromJwt };
