import { MdMailOutline } from "react-icons/md";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import AuthPanel from "../reusable/AuthPanel";

const ResetPasswordEmailPanel = () => {
	return (
		<AuthPanel width={480} minHeight={500}>
			<div className="flex flex-col justify-center items-center gap-2">
				<p className="league-spartan dark:text-white text-2xl font-semibold">
					Reset Password
				</p>
				<p className="poppins dark:text-white">
					Enter your email to reset your password
				</p>
			</div>
			<Input
				titleText="Email"
				placeholder="Email"
				icon={<MdMailOutline />}
			/>
			<Button large>Submit</Button>;
		</AuthPanel>
	);
};

export default ResetPasswordEmailPanel;
