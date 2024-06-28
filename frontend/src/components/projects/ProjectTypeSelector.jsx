import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const ProjectTypeSelector = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const unselectedColorStyle = twMerge(
		classNames("bg-gray-200 text-black dark:bg-gray-700 dark:text-white")
	);

	const selectedColorStyle = twMerge(
		classNames(
			"bg-gray-500 text-white dark:bg-gray-900 dark:border dark:border-white"
		)
	);

	return (
		<div className="h-12 flex poppins font-semibold text-lg shadow-sm">
			<button
				className={`grow basis-0 rounded-l-xl ${
					location.pathname === "/my-projects"
						? selectedColorStyle
						: unselectedColorStyle
				}`}
				onClick={() => {
					navigate("/my-projects");
				}}
			>
				My Projects
			</button>
			<button
				className={`grow basis-0 rounded-r-xl ${
					location.pathname === "/joined-projects"
						? selectedColorStyle
						: unselectedColorStyle
				}`}
				onClick={() => {
					navigate("/joined-projects");
				}}
			>
				Joined Projects
			</button>
		</div>
	);
};

export default ProjectTypeSelector;
