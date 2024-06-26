import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/NavBar";

const ContentPage = () => {
	return (
		<div className="min-w-screen min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 gap-2 h-[2000px]">
			<NavBar />
			<div className="container mx-auto px-4 flex flex-col gap-8">
				<Outlet />
			</div>
		</div>
	);
};

export default ContentPage;
