import ProjectTilePanel from "../reusable/ProjectTilePanel";
import { Fragment } from "react";
import { MdPerson, MdOutlineAccessTimeFilled } from "react-icons/md";
import Divider from "../reusable/Divider";
import Bubble from "../reusable/Bubble";
import { useSelector } from "react-redux";
import { getDateMessage } from "../../utils/utility";

const JoinedProjectTile = ({ project }) => {
	const userId = useSelector((state) => state?.user.id);
	const title = project.title;
	const description = project.description;
	const currentCount = project.teamMembers.length;
	const numDaysTilStart = Math.floor(
		(new Date(project.projectStartDate) - new Date()) /
			1000 /
			60 /
			60 /
			24 +
			1
	);
	const numDaysTilEnd = Math.floor(
		(new Date(project.deadline) - new Date()) / 1000 / 60 / 60 / 24 + 1
	);

	let dateMessage = getDateMessage(numDaysTilStart, numDaysTilEnd);

	const displayRole = () => {
		let myRole = null;
		let members = project?.teamMembers;
		members.map((member) => {
			if (member.userId === userId) {
				myRole = member?.role;
			}
		});
		if (myRole !== null) {
			return <Bubble text={myRole}></Bubble>;
		}
	};

	const topContent = (
		<Fragment>
			{/* ROW 1 */}
			<div className="flex justify-between items-center">
				<p className="text-xl sm:text-2xl league-spartan font-semibold text-white truncate text-nowrap">
					{title}
				</p>
			</div>
			{/* ROW 2 */}
			<div className="flex justify-between flex-wrap">
				<div className="flex gap-1 items-center">
					<p className="poppins text-white">{currentCount}</p>
					<MdPerson className="text-xl text-white" />
				</div>
				<div className="flex gap-1 items-center">
					<MdOutlineAccessTimeFilled className="text-xl text-white" />
					<p className="poppins text-white">{dateMessage}</p>
				</div>
			</div>
		</Fragment>
	);

	const bottomContent = (
		<Fragment>
			{/* ROW 1 */}
			<div className="h-14 flex flex-col gap-2">
				<p className="poppins text-xl font-semibold">Your Role</p>
				<div className="flex flex-wrap gap-2">{displayRole()}</div>
			</div>
			<Divider />
			{/* ROW 2 */}
			<div className="h-28 flex flex-col gap-2">
				<p className="poppins text-xl font-semibold">Description</p>
				<p className="grow crimson-pro text-lg overflow-hidden leading-6">
					{description}
				</p>
			</div>
		</Fragment>
	);

	return (
		<ProjectTilePanel
			topContent={topContent}
			bottomContent={bottomContent}
			projectId={project._id}
		></ProjectTilePanel>
	);
};

export default JoinedProjectTile;
