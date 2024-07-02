import { Outlet } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

const ResetAuthPage = () => {
	console.log("YEEHAH");

	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
};

export default ResetAuthPage;
