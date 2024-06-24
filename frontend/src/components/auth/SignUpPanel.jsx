import AuthHeader from "../reusable/AuthHeader";
import Input from "../reusable/Input";
import { MdAccountCircle, MdLockOpen, MdEmail } from "react-icons/md";
import Button from "../reusable/Button";
import AuthPanel from "../reusable/AuthPanel";

const SignUpPanel = () => {
	const goToLogin = () => {
		window.location.href = "/login";
	};

	return (
		<AuthPanel width={480} minHeight={750}>
			<AuthHeader title="Sign Up" />
			<div className="flex flex-col gap-2">
				<div className="grid grid-cols-2 gap-2 min-w-0">
					<Input titleText="First Name" placeholder="First Name" />
					<Input titleText="Last Name" placeholder="Last Name" />
				</div>
				<Input
					titleText="Username"
					placeholder="Username"
					icon={<MdAccountCircle />}
				/>
				<Input
					titleText="Email"
					placeholder="Email"
					icon={<MdEmail />}
				/>
				<Input
					titleText="Password"
					placeholder="Password"
					icon={<MdLockOpen />}
					password
				/>
			</div>
			<div className="flex flex-col gap-3">
				<Button large>Sign Up</Button>
				<hr></hr>
				<button
					className="text-black dark:text-white text-sm font-medium poppins"
					onClick={goToLogin}
				>
					Login instead
				</button>
			</div>
		</AuthPanel>
	);
};

export default SignUpPanel;
