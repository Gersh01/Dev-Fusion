import { Fragment } from "react";
import { MdArrowLeft } from "react-icons/md";
import Divider from "../components/reusable/Divider";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import ManageTeamTile from "../components/manage_team/ManageTeamTile";
import RolesBubble from "../components/view/RolesBubble";

const ProjectManageMembersPage = () => {
	const navigate = useNavigate();
	const teamMembers = useLoaderData().teamMembers;
	const roles = useLoaderData().roles;
	let possibleRoles = [];
	let possibleMovedRoles = [];

	const getMembers = teamMembers.map((value) => {
		possibleMovedRoles = ["No change..."];
		roles.map((role) => {
			if (role.role !== value.role) {
				possibleMovedRoles.push(role.role);
			}
		});
		console.log("Returning USER");
		return (
			<ManageTeamTile
				possibleRoles={possibleMovedRoles}
				memberInfo={value}
				key={value.userId}
			></ManageTeamTile>
		);
	});

	const renderedRolesRequirementBubbles = roles?.map((role) => {
		let roleCount = 0;
		const members = [];

		teamMembers.forEach((member) => {
			if (member.role === role.role) {
				roleCount += 1;
				members.push({
					userId: member.userId,
					username: member.username,
				});
			}
		});

		if (roleCount < role.count) {
			possibleRoles.push(role.role);
		}
		return (
			<RolesBubble
				key={role.role}
				role={role.role}
				count={role.count}
				description={role.description}
				currentCount={roleCount}
				members={members}
			/>
		);
	});

	return (
		<Fragment>
			<button
				className="flex items-center self-start"
				onClick={() => {
					navigate(-1);
				}}
			>
				<MdArrowLeft className="text-2xl" />
				<p className="text-xl font-semibold">Back</p>
			</button>
			{/* <Divider /> */}
			<p className="text-3xl font-semibold">Manage Team</p>
			<Divider></Divider>
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Current Positions</p>
				<div className="flex flex-col gap-4">
					{renderedRolesRequirementBubbles}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12">
				{teamMembers ? getMembers : null}
			</div>
		</Fragment>
	);
};

export default ProjectManageMembersPage;
