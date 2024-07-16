import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import Input from "../components/reusable/Input";
import { MdLockOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import Button from "../components/reusable/Button";
import Axios from "axios";
import { apiDomain } from "../utils/utility";
import { validResetPassword } from "../utils/validations";

const ResetPasswordPage = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState({});
	const [send, setSend] = useState(true);
	const [passwordField, setPasswordField] = useState(false);
	const [feedback, setFeedback] = useState("");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const showPasswordField = () => {
		setPasswordField(true);
	};
	const hidePasswordField = () => {
		setPasswordField(false);
	};

	const message = () => {
		if (feedback === "success") {
			return (
				<p className="text-center leauge-spartan text-lg font-semibold">
					The password has been successfully changed
				</p>
			);
		} else if (feedback === "error") {
			return (
				<p className="text-center crimson-pro text-lg text-red-500">
					There was an error with resetting your password
				</p>
			);
		}
	};

	const resetPassword = async () => {
		const passwords = { password: password, confirm: confirmPassword };

		const validationErrors = validResetPassword(passwords);

		setErrors(validationErrors);
		let hasValidationErrors = false;

		for (const errorType in validationErrors) {
			if (validationErrors[errorType].length !== 0) {
				hasValidationErrors = true;
				break;
			}
		}

		if (hasValidationErrors === false && send) {
			const payload = { newPassword: password };
			try {
				await Axios.post(
					apiDomain + "/api/forgot_password/reset",
					payload,
					{
						withCredentials: true,
					}
				);
				if (payload) {
					setFeedback("success");
					setSend(false);
					setTimeout(() => {
						setSend(true);
						setFeedback("");
					}, 100000);
				}
			} catch (err) {
				console.log(`Error: ${err.message}`);
				setFeedback("error");
			}
		}
	};

	return (
		// <div className="w-[450px] h-[500px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
		<AuthPanel width={480} minHeight={600} passwordFieldHeight={800}>
			<p className="text-center text-2xl font-semibold league-spartan dark:text-white">
				Reset Password
			</p>
			<div className="flex flex-col gap-1">
				<div className="flex flex-col gap-2">
					<Input
						titleText="Password"
						placeholder="Password"
						icon={<MdLockOpen />}
						password
						onChange={(e) => setPassword(e.target.value)}
						onFocus={() => {
							[
								showPasswordField(),
								setErrors({ ...errors, password: [] }),
							];
						}}
						onBlur={hidePasswordField}
						errors={errors.password}
					/>
					<Input
						titleText="Confirm Password"
						placeholder="Confirm Password"
						icon={<MdLockOpen />}
						password
						onChange={(e) => setConfirmPassword(e.target.value)}
						onFocus={() => {
							[
								showPasswordField(),
								setErrors({ ...errors, confirmPassword: [] }),
							];
						}}
						onBlur={hidePasswordField}
						errors={errors.confirmPassword}
					/>
				</div>
				<div>
					{message()}
					<div className=" h-[120px] flex flex-col grow dark:text-white text-sm">
						{passwordField && (
							<PasswordChecklist
								className="poppins"
								rules={[
									"capital",
									"specialChar",
									"minLength",
									"number",
									"match",
									"maxLength",
								]}
								maxLength={24}
								minLength={8}
								valueAgain={confirmPassword}
								value={password}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Button onClick={resetPassword} large>
					Reset Password
				</Button>
				<hr></hr>
				<button
					className="text-black dark:text-white text-sm font-medium poppins"
					onClick={() => navigate("/")}
				>
					Go back
				</button>
			</div>
		</AuthPanel>
	);
};

export default ResetPasswordPage;
