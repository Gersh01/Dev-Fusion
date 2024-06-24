import { Outlet } from "react-router-dom";

const AuthPage = () => {
	return (
		<div
			className="min-w-screen min-h-screen p-1 bg-gradient-to-br from-orange-300 to-orange-500 
			dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 flex justify-center items-center gap-2.5"
		>
			<Outlet />
		</div>
	);
};

export default AuthPage;
