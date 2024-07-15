import { Fragment } from "react";
import { getBubbleColor } from "../../utils/utility";
import Divider from "../reusable/Divider";
import UserBubble from "./UserBubble";

const RolesBubble = ({ role, description, count, currentCount, members }) => {
	const bubbleColor = getBubbleColor(role);

	const renderedMembers = members.map((member) => {
		return (
			<UserBubble
				key={member.userId}
				username={member.username}
				userId={member.userId}
			/>
		);
	});

	return (
		<div
			className={`flex flex-col rounded-lg min-w-0 bg-gray-200 drop-shadow-lg`}
		>
			<div
				className={`flex justify-between items-center gap-2
    			px-2 py-1 rounded-t-lg ${bubbleColor}`}
			>
				{/* Count display Field */}
				<div className={`flex items-center gap-2 rounded-md `}>
					{/* Text Field */}
					<p className="poppins text-xl text-white font-semibold">
						{role}
					</p>
				</div>
				<div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md">
					<p className="text-sm font-semibold">
						{`(${currentCount}/${count})`}
					</p>
				</div>
			</div>
			{/* Description */}
			<div className="flex flex-col gap-3 px-2 py-3 dark:bg-gray-900 rounded-b-lg">
				{description !== "" ? (
					<Fragment>
						<div className="flex flex-col gap-1">
							<p
								className="text-base font-medium bg-gray-200 dark:bg-gray-700
    				self-start px-1 rounded-md"
							>
								Description
							</p>
							<p className="px-1 crimson-pro text-lg">
								{description}
							</p>
						</div>
					</Fragment>
				) : null}
				<Divider />
				{/* Members */}
				<div className="flex flex-col gap-1">
					<p
						className="text-base font-medium bg-gray-200 dark:bg-gray-700
    				self-start px-1 rounded-md"
					>
						Current Members
					</p>
					<div className="flex gap-2 flex-wrap">
						{members.length === 0 ? (
							<p className="px-1 crimson-pro text-lg">None</p>
						) : (
							renderedMembers
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RolesBubble;
