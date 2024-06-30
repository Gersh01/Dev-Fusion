import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { getUserFromJwt } from "./loaders/userLoader";
import { useEffect } from "react";

const ContentPageContainer = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		getUserFromJwt().then((user) => {
			dispatch(setUser(user));
		});
	});

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
