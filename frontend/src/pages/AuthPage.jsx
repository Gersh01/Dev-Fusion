import { useLocation } from "react-router-dom";
import AuthHeader from "../components/login-signup/AuthHeader";
import { Fragment } from "react";
import LoginFields from "../components/login-signup/LoginFields";
import LoginButtons from "../components/login-signup/LoginButtons";
import SignUpFields from "../components/login-signup/SignUpFields";
import SignUpButtons from "../components/login-signup/SignUpButtons";

const AuthPage = () => {
	const location = useLocation();

	// * Content changes from login or signup based on pathname (URL)
	const content =
		location.pathname === "/login" ? (
			<Fragment>
				<AuthHeader title="Login" />
				<LoginFields />
				<LoginButtons />
			</Fragment>
		) : (
			<Fragment>
				<AuthHeader title="Sign Up" />
				<SignUpFields />
				<SignUpButtons />
			</Fragment>
		);

	return (
		<div
			className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 
			dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 flex justify-center items-center gap-2.5"
		>
			<div className="w-[480px] min-h-[800px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
				{content}
			</div>
		</div>
	);
};

export default AuthPage;
