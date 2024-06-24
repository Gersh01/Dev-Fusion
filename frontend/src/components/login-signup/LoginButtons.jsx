import Button from "../reusable/Button";

const LoginButtons = () => {
	const goToRegister = () => {
		window.location.href = "/signup";
	};

	return (
		<div className="flex flex-col gap-3">
			<Button large>Sign In</Button>
			<hr></hr>
			<button
				className="text-black dark:text-white text-sm font-medium poppins"
				onClick={goToRegister}
			>
				Sign up instead
			</button>
		</div>
	);
};

export default LoginButtons;
