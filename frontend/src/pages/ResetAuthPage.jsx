import { Outlet } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

const ResetAuthPage = () => {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
};

export default ResetAuthPage;
