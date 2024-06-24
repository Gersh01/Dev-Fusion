import Input from "../reusable/Input";
import { MdAccountCircle, MdLockOpen, MdEmail } from "react-icons/md";

const SignUpFields = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2">
				<Input titleText="First Name" placeholder="First Name" />
				<Input titleText="Last Name" placeholder="Last Name" />
			</div>
			<Input
				titleText="Username"
				placeholder="Username"
				icon={<MdAccountCircle />}
			/>
			<Input titleText="Email" placeholder="Email" icon={<MdEmail />} />
			<Input
				titleText="Password"
				placeholder="Password"
				icon={<MdLockOpen />}
				password
			/>
		</div>
	);
};

export default SignUpFields;
