import Axios from "axios";

export const updateUser = async (id, newInfo) => {
	try {
		await Axios.put(
			"http://localhost:5000/api/users",
			{ bio: newInfo, userId: id },
			{ withCredentials: true }
		);
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}

	return null;
};

export const updateUserTechnology = async (id, tech) => {
	const payload = { technologies: tech, userId: id };
	try {
		await Axios.put("http://localhost:5000/api/users", payload, {
			withCredentials: true,
		});
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
};

export default { updateUser, updateUserTechnology };
