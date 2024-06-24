import AuthHeader from "../reusable/AuthHeader";
import { MdAccountCircle, MdLockOpen } from "react-icons/md";
import { useState } from "react";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import AuthPanel from "../reusable/AuthPanel";

const LoginPanel = () => {
	// * Keeps track of remember me
	const [rememberMe, setRememberMe] = useState(false);

	const goToRegister = () => {
		window.location.href = "/signup";
	};

	return (
		// <div className="w-[480px] min-h-[750px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
		<AuthPanel width={480} minHeight={750}>
			<AuthHeader title="Login" />
			<div className="flex flex-col gap-2">
				<Input
					titleText="First Name"
					icon={<MdAccountCircle />}
					placeholder="First Name"
				/>
				<Input
					titleText="Password"
					placeholder="Password"
					icon={<MdLockOpen />}
					password
				/>
				<div className="flex justify-between">
					<div className="flex gap-1 items-center poppins">
						<input
							className="h-4 aspect-square"
							type="checkbox"
							onChange={(event) => {
								setRememberMe(event.target.checked);
							}}
						/>
						<p className="text-black dark:text-white">
							Remember Me
						</p>
					</div>
					<button className="text-black dark:text-white poppins">
						Forgot Password
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Button large>Login</Button>
				<hr></hr>
				<button
					className="text-black dark:text-white text-sm font-medium poppins"
					onClick={goToRegister}
				>
					Sign up instead
				</button>
			</div>
		</AuthPanel>
	);
};

export default LoginPanel;
