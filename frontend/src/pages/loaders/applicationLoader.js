import axios from "axios";
import { apiDomain } from "../../utils/utility";

const getApplications = async (projectId) => {
	try {
		const response = await axios.get(
			`${apiDomain}/api/inbox/${projectId}`,
			{
				withCredentials: true,
			}
		);
		if (response) {
			return response.data;
		}
		console.log(response.data);
	} catch (err) {
		console.log(err.response);
		console.log(`Error: ${err.message}`);
	}
	return null;
};

const applicationApply = async (payload) => {
	await axios.post("http://localhost:5000/api/inbox/apply", payload, {
		withCredentials: true,
	});
};

const applicationAccept = async (application) => {
	try {
		await axios.post(apiDomain + "/api/inbox/accept_member", application, {
			withCredentials: true,
		});
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
};

const applicationDeny = async (application) => {
	try {
		await axios.post(apiDomain + "/api/inbox/reject_member", application, {
			withCredentials: true,
		});
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
};

export {
	getApplications,
	applicationApply,
	applicationDeny,
	applicationAccept,
};
