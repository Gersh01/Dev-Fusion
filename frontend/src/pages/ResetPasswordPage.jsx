// import ResetPasswordFields from "./ResetPasswordFields";
// import ResetPasswordButton from "./ResetPasswordButton";
import AuthPanel from "../components/reusable/AuthPanel";
import Input from "../components/reusable/Input";
import { MdLockOpen } from "react-icons/md";

const ResetPasswordPage = () => {
	const goLogin = () => {
		window.location.href = "/login";
	};

	return (
		// <div className="w-[450px] h-[500px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
		<AuthPanel width={480} minHeight={500}>
			<p className="text-center text-2xl font-semibold league-spartan dark:text-white">
				Reset Password
			</p>
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
			<div className="self-stretch h-[78px] flex-col justify-center items-center gap-2.5 flex">
				<button
					className="self-stretch p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 
	  			dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 rounded-[5px] justify-center items-center gap-2.5 inline-flex"
				>
					<div
						className="text-white text-xl font-semibold league-spartan"
						onClick={goLogin}
					>
						Reset Password
					</div>
				</button>
			</div>
		</AuthPanel>
	);
};

export default ResetPasswordPage;
