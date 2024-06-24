import { MdLockOpen } from "react-icons/md";
import Input from "../reusable/Input";

const ResetPasswordFields = () => {
	return (
		<div className="flex flex-col gap-2">
			<Input
				titleText="Password"
				placeholder="Password"
				icon={<MdLockOpen />}
				password
			/>
			<Input
				titleText="Confirm Password"
				placeholder="Confirm Password"
				icon={<MdLockOpen />}
				password
			/>
		</div>
	);
};

export default ResetPasswordFields;
