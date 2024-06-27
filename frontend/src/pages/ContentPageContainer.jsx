import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import { useEffect } from "react";

const ContentPageContainer = () => {
	const navigate = useNavigate();
	const user = useLoaderData();

	useEffect(() => {
		if (user === null) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="min-w-screen min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 gap-2 pb-4">
			<NavBar />
			<div className="container mx-auto px-4 flex flex-col gap-6">
				<Outlet />
			</div>
		</div>
	);
};

export default ContentPageContainer;
