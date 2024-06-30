import Divider from "../components/reusable/Divider";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/DFLogoFinal.png";
import DiscoverProjectTile from "../components/discover/DiscoverProjectTile";
import BioProfileFields from "../components/profile/BioProfileFields";
import TechnologiesField from "../components/profile/TechnologiesField";

const ProfilePage = () => {
	let res = useSelector((state) => state.user);
	const tech = [
		"React",
		"Express",
		"MongoDB",
		"NodeJs",
		"Passport",
		"NodeMailer",
		"JavaScript",
		"React Redux",
		"Flutter",
		"Frontend",
		"SQL Database",
		"Testing",
	];

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
				className="flex justify-between items-end flex-wrap gap-y-2 min-w-[100px]
					poppins text-4xl font-bold gap-x-6"
			>
				<p>Profile</p>
			</div>
			<Divider />
			<div className="flex min-w-[100px] gap-5">
				<img
					className="max-h-28 max-w-28 rounded-full"
					src={logo}
				></img>
				<p className="flex items-center text-3xl md:text-4xl font-bold poppins text-center ">
					{res.username}
				</p>
			</div>
			<div className="flex flex-wrap gap-8 py-4">
				{/* Bio Field*/}
				<div className="flex flex-col w-full h-80 p-4 rounded-2xl dark:bg-gray-700 bg-gray-200 lg:w-3/5 text-xl poppins">
					<BioProfileFields title="Bio" info={res.bio} type={true} />
				</div>
				{/*Technologies fields*/}
				<div className="flex flex-col p-4 rounded-2xl h-80 dark:bg-gray-700 bg-gray-200 w-full lg:w-1/5 lg:grow poppins text-xl">
					<TechnologiesField
						technologies={tech}
						title="Technologies"
						type={true}
					/>
				</div>
			</div>
			<p className="text-3xl poppins font-semibold">Projects</p>
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
				{renderedProjectTiles}
			</div>
		</Fragment>
	);
};

export default ProfilePage;
