import { Fragment } from "react";
import ProjectTilePanel from "../reusable/ProjectTilePanel";
import { MdPerson, MdOutlineAccessTimeFilled } from "react-icons/md";
import Bubble from "../reusable/Bubble";
import Divider from "../reusable/Divider";

const DiscoverProjectTile = ({ project }) => {
	const title = project.title;
	const description = project.description;
	const technologies = project.technologies;
	const currentCount = project.teamMembers.length;
	const numDaysTilStart = Math.floor(
		(new Date(project.projectStartDate) - new Date()) /
			1000 /
			60 /
			60 /
			24 +
			1
	);

	let positionLeft = 0;
	project.roles.forEach((role) => {
		let totalCount = role.count;
		project.teamMembers.forEach((member) => {
			if (member.role === role.role) {
				totalCount--;
			}
		});
		if (totalCount > 0) {
			positionLeft += totalCount;
		}
	});

	const renderedTechnologyBubbles = technologies.map((technology) => {
		return <Bubble key={technology} text={technology} />;
	});

	const topContent = (
		<Fragment>
			{/* ROW 1 */}
			<div className="flex justify-between items-center gap-4">
				<p className="text-xl sm:text-2xl league-spartan font-semibold text-white text-nowrap truncate">
					{title}
				</p>
				<div className="bg-gray-200 dark:bg-gray-700 py-0.5 px-1.5 rounded-lg poppins truncate font-medium">
					{positionLeft}{" "}
					{positionLeft === 1 ? "Position Left" : "Positions Left"}
				</div>
			</div>
			{/* ROW 2 */}
			<div className="flex justify-between flex-wrap">
				<div className="flex gap-1 items-center">
					<p className="poppins text-white">{currentCount}</p>
					<MdPerson className="text-xl text-white" />
				</div>
				<div className="flex gap-1 items-center">
					<MdOutlineAccessTimeFilled className="text-xl text-white" />
					<p className="poppins text-white">
						{numDaysTilStart}{" "}
						{numDaysTilStart === 1
							? "day left to join"
							: "days left to join"}
					</p>
				</div>
			</div>
		</Fragment>
	);

	const bottomContent = (
		<Fragment>
			{/* ROW 1 */}
			<div className="h-28 flex flex-col gap-2">
				<p className="poppins text-xl font-semibold">Description</p>
				<p className="grow crimson-pro text-lg overflow-hidden leading-6">
					{description}
				</p>
			</div>
			<Divider />
			{/* ROW 2 */}
			<div className="h-28 flex flex-col gap-2">
				<p className="poppins text-xl font-semibold">Technologies</p>
				<div className="flex flex-wrap gap-2 overflow-hidden">
					{renderedTechnologyBubbles}
				</div>
			</div>
		</Fragment>
	);

	return (
		<ProjectTilePanel
			projectId={project._id}
			topContent={topContent}
			bottomContent={bottomContent}
		></ProjectTilePanel>
	);
};

export default DiscoverProjectTile;
