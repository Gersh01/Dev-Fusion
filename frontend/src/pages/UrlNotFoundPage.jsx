import AuthPanel from "../components/reusable/AuthPanel";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UrlNotFound = () => {
	const validUser = useSelector((state) => state.user.id);
	const navigate = useNavigate();

	const redirectBack = () => {
		if (validUser) {
			navigate(-1);
		} else {
			navigate("/");
		}
	};

	return (
		<AuthPanel width={480} minHeight={600}>
			<div className="flex flex-col gap-10 text-black text-2xl dark:text-white text-center">
				<p className="text-3xl font-semibold league-spartan">
					404 URL Extension not found
				</p>
				<p className="league-spartan">- The Dev Fusion Team</p>
			</div>
			<button
				className="font-semibold justify-center text-xl league-spartan"
				onClick={redirectBack}
			>
				Click here to be redirected back
			</button>
		</AuthPanel>
	);
};

export default UrlNotFound;
