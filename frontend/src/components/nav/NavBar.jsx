import NavButton from "./NavButton";
import {
	MdOutlineImageSearch,
	MdOutlineFolder,
	MdAdd,
	MdPersonOutline,
	MdOutlineSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();

	const navs = [
		{
			title: "Discover",
			icon: <MdOutlineImageSearch />,
			destination: "/discover",
		},
		{
			title: "Projects",
			icon: <MdOutlineFolder />,
			destination: "/my-projects",
		},
		{ title: "Create", icon: <MdAdd />, destination: "/create" },
		{
			title: "Profile",
			icon: <MdPersonOutline />,
			destination: "/my-profile",
		},
		{
			title: "Settings",
			icon: <MdOutlineSettings />,
			destination: "/user-settings",
		},
	];

	const navButtons = navs.map((nav) => {
		return (
			<NavButton
				key={nav.title}
				text={nav.title}
				icon={nav.icon}
				onClick={() => navigate(nav.destination)}
			/>
		);
	});

	return (
		<div className="sticky top-0 w-full h-14 bg-gray-200 dark:bg-gray-800 z-30">
			<div className="w-full h-full sm:w-[500px] mx-auto flex justify-evenly">
				{navButtons}
			</div>
		</div>
	);
};

export default NavBar;
