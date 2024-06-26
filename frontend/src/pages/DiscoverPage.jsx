import DiscoverProjectTile from "../components/discover/DiscoverProjectTile";
import Divider from "../components/reusable/Divider";
import SearchField from "../components/reusable/SearchField";
import { Fragment } from "react";

const DisocverPage = () => {
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
		startDate: new Date("2024-7-12"),
		endDate: new Date("2024-8-11"),
	};

	// TODO - Mock Project (To be removed)
	const renderedProjectTiles = (
		<Fragment>
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
			<DiscoverProjectTile project={mockProject} />
		</Fragment>
	);

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 
					text-black dark:text-white poppins text-4xl font-bold gap-x-6"
			>
				<p>Discover</p>
				<SearchField />
			</div>
			<Divider />
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
				{renderedProjectTiles}
			</div>
		</Fragment>
	);
};

export default DisocverPage;
