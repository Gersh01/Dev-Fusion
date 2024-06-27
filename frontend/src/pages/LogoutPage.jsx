import Axios from "axios";
import Button from "../components/reusable/Button";
import AuthPanel from "../components/reusable/AuthPanel";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
	const navigate = useNavigate();
	function doLogout() {
		try {
			const response = Axios.post("http://localhost:5000/api/logout");
			if (response) {
				console.log("Logged Out");
			}
			navigate("/");
		} catch (err) {
			console.log(err.message);
		}
	}

	return (
		<AuthPanel width={480} minHeight={500}>
			<div className="flex flex-col justify-center items-center gap-2">
				<p className="league-spartan dark:text-white text-2xl font-semibold">
					Reset Password
				</p>
				<Button large onClick={doLogout}>
					Logout
				</Button>
			</div>
		</AuthPanel>
	);
};

export default LogoutPage;
