import { Fragment } from "react";
import SearchField from "../components/reusable/SearchField";
import Divider from "../components/reusable/Divider";
import ProjectTypeSelector from "../components/projects/ProjectTypeSelector";
import OwnedProjectTile from "../components/projects/OwnedProjectTile";
import { useLocation } from "react-router-dom";
import JoinedProjectTile from "../components/projects/JoinedProjectTile";

const ProjectsPage = () => {
	const location = useLocation();

	// TODO - Mock Project (To be removed)
	const mockProject = {
		title: "Gym Fitness Tracker",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia vel atque aspernatur saepe praesentium minus, a distinctio dolor voluptates delectus?",
		technologies: [
			"React",
			"Express",
			"MongoDB",
			"NodeJs",
			"Passport",
			"NodeMailer",
			"JavaScript",
			"React Redux",
			"Flutter",
		],
		startDate: new Date("2024-6-12"),
		endDate: new Date("2024-8-11"),
	};

	// TODO - Mock Project (To be removed)
	const renderedOwnedProjectTiles = (
		<Fragment>
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
			<OwnedProjectTile project={mockProject} />
		</Fragment>
	);

	// TODO - Mock Project (To be removed)
	const renderedJoinedProjectTiles = (
		<Fragment>
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
			<JoinedProjectTile project={mockProject} />
		</Fragment>
	);

	let renderedProjectTiles;
	if (location.pathname === "/my-projects") {
		renderedProjectTiles = renderedOwnedProjectTiles;
	} else if (location.pathname === "/joined-projects") {
		renderedProjectTiles = renderedJoinedProjectTiles;
	}

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 
					text-black dark:text-white poppins text-4xl font-bold gap-x-6"
			>
				<p>Projects</p>
				<SearchField />
			</div>
			<Divider />
			<ProjectTypeSelector />
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
				{renderedProjectTiles}
			</div>
		</Fragment>
	);
};

export default ProjectsPage;
