import NavButton from "./NavButton";
import {
	MdOutlineImageSearch,
	MdOutlineFolder,
	MdAdd,
	MdPersonOutline,
} from "react-icons/md";

const NavBar = () => {
	return (
		<div className="sticky top-0 w-full h-14 bg-gray-200 dark:bg-gray-800 z-30">
			<div className="w-80 h-full sm:w-[500px] mx-auto flex justify-evenly">
				<NavButton text="Discover" icon={<MdOutlineImageSearch />} />
				<NavButton text="Projects" icon={<MdOutlineFolder />} />
				<NavButton text="Create" icon={<MdAdd />} />
				<NavButton text="Profile" icon={<MdPersonOutline />} />
			</div>
		</div>
	);
};

export default NavBar;
