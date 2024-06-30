import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";

const PasswordSettings = () => {
	const navigate = useNavigate();

	const goResetPassword = () => {
		navigate("/reset-password");
	};

	return (
		<div className="flex justify-between items-center gap-4">
			<p className="text-2xl font-semibold">Password</p>
			<Button large mode="danger" onClick={goResetPassword}>
				Reset Password
			</Button>
		</div>
	);
};

export default PasswordSettings;
