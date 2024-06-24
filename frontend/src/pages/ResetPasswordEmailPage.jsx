import ResetPasswordEmailFields from "../components/reset-password-email/ResetPasswordEmailFields";
import { ResetPasswordEmailButton } from "../components/reset-password-email/ResetPasswordEmailButton";

const ResetPasswordEmailPage = () => {
	return (
		<div
			className="w-screen h-screen p-3 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br 
			dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex"
		>
			<div className="w-[480px] h-[500px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
				<div className="flex flex-col justify-center items-center gap-2">
					<p className="league-spartan dark:text-white text-2xl font-semibold">
						Reset Password
					</p>
					<p className="poppins dark:text-white">
						Enter your email to reset your password
					</p>
				</div>
				<ResetPasswordEmailFields />
				<ResetPasswordEmailButton />
			</div>
		</div>
	);
};

export default ResetPasswordEmailPage;
