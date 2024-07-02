import { Fragment } from "react";
import {
	MdArrowLeft,
	MdPerson,
	MdOutlineAccessTimeFilled,
} from "react-icons/md";
import Divider from "../components/reusable/Divider";
import Button from "../components/reusable/Button";
import Bubble from "../components/reusable/Bubble";
import ContentBubble from "../components/reusable/ContentBubble";
import UserBubble from "../components/reusable/UserBubble";
import { useLoaderData, useNavigate } from "react-router-dom";

const ViewProjectPage = () => {
	const projectData = useLoaderData();
	const navigate = useNavigate();

	if (projectData === null) {
		return null;
	}

	const numTotalPositions = 9;

	const {
		title,
		description,
		technologies,
		communications,
		projectStartDate,
		deadline,
	} = projectData;

	const numDaysTilStart = Math.floor(
		(new Date(projectStartDate) - new Date()) / 1000 / 60 / 60 / 24 + 1
	);
	const numDaysTilEnd = Math.floor(
		(new Date(deadline) - new Date()) / 1000 / 60 / 60 / 24 + 1
	);

	let dateMessage = "";

	if (numDaysTilStart > 0) {
		if (numDaysTilStart === 1) {
			dateMessage = `${numDaysTilStart} day until project begins`;
		} else {
			dateMessage = `${numDaysTilStart} days until project begins`;
		}
	} else {
		if (numDaysTilEnd === 1) {
			dateMessage = `due in ${numDaysTilEnd} day`;
		} else {
			dateMessage = `due in ${numDaysTilEnd} days`;
		}
	}

	const renderedTechnologyBubbles = technologies?.map((technology) => {
		return <Bubble key={technology} text={technology} />;
	});

	const renderedCommunicationBubble = communications?.map((communication) => {
		return <Bubble key={communication} text={communication} />;
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
			<p className="text-3xl font-semibold">{title}</p>
			<div className="flex gap-2 flex-wrap">
				<Button mode="safe">Begin</Button>
				<Button mode="secondary">Manage Team</Button>
				<Button mode="secondary">Edit</Button>
				<Button mode="danger">Delete</Button>
			</div>
			{/* TIME */}
			<div className="flex justify-between flex-wrap">
				<div className="flex gap-1 items-center">
					<p className="poppins text-white">{numTotalPositions}</p>
					<MdPerson className="text-xl text-white" />
				</div>
				<div className="flex gap-1 items-center">
					<MdOutlineAccessTimeFilled className="text-xl text-white" />
					<p className="poppins text-white">{dateMessage}</p>
				</div>
			</div>
			<Divider />
			{/* DESCRIPTION */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Description</p>
				<p>{description}</p>
			</div>
			{/* POSITIONS NEEDED */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Positions Needed</p>
				<div className="flex flex-wrap gap-4">
					<ContentBubble text="Frontend">(0/2)</ContentBubble>
					<ContentBubble text="API">(1/2)</ContentBubble>
					<ContentBubble text="Database">(0/1)</ContentBubble>
				</div>
			</div>
			{/* POSITION REQUIREMENTS */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Position Requirements</p>
				<div className="flex flex-col gap-4">
					<ContentBubble text="Project Manager"></ContentBubble>
					<ContentBubble text="Frontend"></ContentBubble>
					<ContentBubble text="API"></ContentBubble>
					<ContentBubble text="Database"></ContentBubble>
				</div>
			</div>
			{/* TECHNOLOGIES */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Technologies</p>
				<div className="flex flex-wrap gap-2">
					{renderedTechnologyBubbles}
				</div>
			</div>
			{/* COMMUICATION */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Communications</p>
				<div className="flex flex-wrap gap-2">
					{renderedCommunicationBubble}
				</div>
			</div>
			{/* CURRENT TEAM */}
			<div className="flex flex-col gap-4">
				<p className="text-xl font-semibold">Current Team</p>
				<div className="flex flex-col">
					<ContentBubble text="Project Manager">
						<UserBubble text="@Alex" />
					</ContentBubble>
				</div>
				<div className="flex flex-col">
					<ContentBubble text="Frontend">
						<UserBubble text="@Xutao" />
						<UserBubble text="@James" />
						<UserBubble text="@Jacob" />
					</ContentBubble>
				</div>
				<div className="flex flex-col">
					<ContentBubble text="API">
						<UserBubble text="@Alperen" />
						<UserBubble text="@Golden" />
					</ContentBubble>
				</div>
				<div className="flex flex-col">
					<ContentBubble text="Database">
						<UserBubble text="@Tony" />
					</ContentBubble>
				</div>
			</div>
		</Fragment>
	);
};

export default ViewProjectPage;
