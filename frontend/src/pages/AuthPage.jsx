import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

const AuthPage = () => {
	const user = useLoaderData();

	if (user !== null) {
		return <Navigate to="/discover" />;
	}

	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
};

export default AuthPage;
