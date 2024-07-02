import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";
import { Fragment, useState } from "react";
import Divider from "../components/reusable/Divider";
import TextArea from "../components/reusable/TextArea";
import CreateTechnologiesPanel from "../components/create/CreateTechnologiesPanel";
import CreateRolesPanel from "../components/create/CreateRolesPanel";
import CreateCommunicationsPanel from "../components/create/CreateCommunicationsPanel";
import { apiDomain } from "../utils/utility";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePage = () => {
	const user = useSelector((state) => state.user);
	const [projectTitle, setProjectTitle] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [techs, setTechs] = useState([]);
	const [roles, setRoles] = useState([
		{ name: "Project Manager", count: 1, description: "" },
	]);
	const [comms, setComms] = useState([]);

	// * Called when publishing a project
	const onPublish = () => {
		const rolesToSend = roles.map((role) => {
			return {
				role: role.name,
				count: role.count,
				description: role.description,
			};
		});

		const techsToSend = techs.map((tech) => {
			return tech.name;
		});

		const commsToSend = comms.map((comm) => {
			return {
				name: comm.name,
				link: comm.link,
			};
		});

		const newProject = {
			ownerId: user.id,
			title: projectTitle,
			projectStartDate: startDate,
			description: description,
			deadline: endDate,
			roles: rolesToSend,
			technologies: techsToSend,
			communications: commsToSend,
		};

		console.log(newProject);

		createProject(newProject);
	};

	// * Make API call to create the project
	const createProject = async (project) => {
		await axios.post(apiDomain + "/api/project", project, {
			withCredentials: true,
		});
	};

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 
				text-black dark:text-white poppins text-4xl font-bold gap-x-6"
			>
				<p>Create</p>
			</div>
			<Divider />
			<div className="flex flex-col gap-4">
				{/* Project Title */}
				<Input
					titleText="Project Title"
					placeholder="Enter Project Title"
					value={projectTitle}
					onChange={(e) => {
						setProjectTitle(e.target.value);
					}}
				/>
				{/* TODO: Look into different format for date input */}
				<div className="grid gap-4 grid-cols-2">
					{/* Start Date */}
					<Input
						titleText="Start Date"
						placeholder="Enter the start date"
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
					{/* Deadline */}
					<Input
						titleText="End Date"
						placeholder="Enter the deadline"
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
				{/* Description */}
				<TextArea
					titleText="Description"
					placeholder="tell us about your project"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				{/* Technologies */}
				<CreateTechnologiesPanel techs={techs} setTechs={setTechs} />
				{/* Roles */}
				<CreateRolesPanel roles={roles} setRoles={setRoles} />
				{/* Communications */}
				<CreateCommunicationsPanel comms={comms} setComms={setComms} />
				{/* Publish */}
				<Button large onClick={onPublish}>
					Publish
				</Button>
			</div>
		</Fragment>
	);
};

export default CreatePage;
