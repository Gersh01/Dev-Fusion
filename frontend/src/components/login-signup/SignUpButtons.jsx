import Button from "../reusable/Button";

const SignUpButtons = () => {
	const goToLogin = () => {
		window.location.href = "/login";
	};
	return (
		<div className="flex flex-col gap-3">
			<Button large>Sign In</Button>
			<hr></hr>
			<button
				className="text-black dark:text-white text-sm font-medium poppins"
				onClick={goToLogin}
			>
				Sign up instead
			</button>
		</div>
	);
};

export default SignUpButtons;
