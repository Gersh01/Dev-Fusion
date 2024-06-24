import ResetPasswordFields from "../components/reset-password/ResetPasswordFields";
import ResetPasswordButton from "../components/reset-password/ResetPasswordButton";

const ResetPasswordPage = () => {
	return (
		<div
			className="w-screen h-screen p-3 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br 
			dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex"
		>
			<div className="w-[450px] h-[500px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
				<p className="text-center text-2xl font-semibold league-spartan dark:text-white">
					Reset Password
				</p>
				<ResetPasswordFields />
				<ResetPasswordButton />
			</div>
		</div>
	);
};

export default ResetPasswordPage;
