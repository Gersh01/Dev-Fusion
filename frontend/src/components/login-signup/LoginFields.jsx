import Input from "../reusable/Input";
import { MdAccountCircle, MdLockOpen } from "react-icons/md";
import { useState } from "react";

const LoginFields = () => {
	// * Keeps track of remember me
	const [rememberMe, setRememberMe] = useState(false);

	return (
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
					<p className="text-black dark:text-white">Remember Me</p>
				</div>
				<button className="text-black dark:text-white poppins">
					Forgot Password
				</button>
			</div>
		</div>
	);
};

export default LoginFields;
