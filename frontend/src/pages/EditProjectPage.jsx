import { Fragment, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { santizeProject } from "../utils/sanitation";
import {
	validateEditProjectStartDate,
	validateProject,
} from "../utils/validations";
import axios from "axios";
import { apiDomain } from "../utils/utility";
import Divider from "../components/reusable/Divider";
import Input from "../components/reusable/Input";
import TextArea from "../components/reusable/TextArea";
import CreateTechnologiesPanel from "../components/create/CreateTechnologiesPanel";
import CreateCommunicationsPanel from "../components/create/CreateCommunicationsPanel";
import Button from "../components/reusable/Button";
import Modal from "../components/reusable/Modal";
import CreateRolesPanel from "../components/create/CreateRolesPanel";
import { MdArrowLeft } from "react-icons/md";

const EditProjectPage = () => {
	const projectData = useLoaderData();
	const [projectTitle, setProjectTitle] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [techs, setTechs] = useState([]);
	const [roles, setRoles] = useState([
		{ name: "Project Manager", count: 1, description: "" },
	]);
	const [comms, setComms] = useState([]);
	const [errors, setErrors] = useState({});

	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	const oldStartDate = projectData.projectStartDate;

	useEffect(() => {
		const { title, description } = projectData;

		const projectStartDate = projectData.projectStartDate.substring(0, 10);
		const deadline = projectData.deadline.substring(0, 10);

		const technologies = projectData.technologies.map((tech) => {
			return {
				name: tech,
			};
		});

		const communications = projectData.communications.map((comm) => {
			return {
				name: comm.name,
				link: comm.link,
			};
		});

		const roles = projectData.roles.map((role) => {
			return {
				name: role.role,
				count: role.count,
				description: role.description,
			};
		});

		setProjectTitle(title);
		setStartDate(projectStartDate);
		setEndDate(deadline);
		setDescription(description);
		setTechs(technologies);
		setRoles(roles);
		setComms(communications);
	}, [projectData]);

	// * Called when publishing a project
	const publishChanges = () => {
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

		const editedProject = {
			projectId: projectData._id,
			isOpen: projectData.isOpen,
			isDone: projectData.isDone,
			isStarted: projectData.isDone,
			title: projectTitle,
			projectStartDate: startDate,
			description: description,
			deadline: endDate,
			roles: rolesToSend,
			technologies: techsToSend,
			communications: commsToSend,
		};

		// * Sanitize input (Remove redundant white space...)
		santizeProject(editedProject);

		const validationErrors = validateProject(editedProject, "edit");
		validationErrors.startDate = validateEditProjectStartDate(
			editedProject,
			oldStartDate
		).startDate;
		let hasValidationErrors = false;
		// * Validate input
		setErrors(validationErrors);

		for (const errorType in validationErrors) {
			if (validationErrors[errorType].length !== 0) {
				hasValidationErrors = true;
				break;
			}
		}

		if (hasValidationErrors === false) {
			setShowModal(true);
			editProject(editedProject);
		}
	};

	const discardChanges = () => {
		navigate(`/projects/${projectData._id}`);
	};

	// * Make API call to create the project
	const editProject = async (project) => {
		await axios.put(apiDomain + "/api/edit-project", project, {
			withCredentials: true,
		});
	};

	return (
		<Fragment>
			<button
				className="flex items-center self-start"
				onClick={() => {
					navigate(`/projects/${projectData._id}`);
				}}
			>
				<MdArrowLeft className="text-2xl" />
				<p className="text-xl font-semibold">Back</p>
			</button>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 
				text-black dark:text-white poppins text-2xl font-semibold gap-x-6"
			>
				<p>{projectTitle} - Editing</p>
			</div>
			<Divider />
			<p className="font-semibold text-2xl"></p>
			<div className="flex flex-col gap-4">
				{/* Project Title */}
				<Input
					titleText="Project Title"
					placeholder="Enter Project Title"
					value={projectTitle}
					onChange={(e) => {
						setProjectTitle(e.target.value);
					}}
					errors={errors.title}
					onFocus={() => {
						setErrors({ ...errors, title: [] });
					}}
				/>
				<div className="grid gap-4 grid-cols-2">
					{/* Start Date */}
					<Input
						titleText="Start Date"
						placeholder="Enter the start date"
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						errors={errors.startDate}
						onFocus={() => {
							setErrors({ ...errors, startDate: [] });
						}}
					/>
					{/* Deadline */}
					<Input
						titleText="End Date"
						placeholder="Enter the deadline"
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						errors={errors.endDate}
						onFocus={() => {
							setErrors({ ...errors, endDate: [] });
						}}
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
					errors={errors.description}
					onFocus={() => {
						setErrors({ ...errors, description: [] });
					}}
				/>
				{/* Technologies */}
				<CreateTechnologiesPanel
					techs={techs}
					setTechs={setTechs}
					errors={errors.technologies}
					onFocus={() => {
						setErrors({ ...errors, technologies: [] });
					}}
				/>
				{/* Roles */}
				<CreateRolesPanel
					roles={roles}
					setRoles={setRoles}
					errors={errors.roles}
					onFocus={() => {
						setErrors({ ...errors, roles: [] });
					}}
				/>
				{/* Communications */}
				<CreateCommunicationsPanel
					comms={comms}
					setComms={setComms}
					errors={errors.communications}
					onFocus={() => {
						setErrors({ ...errors, communications: [] });
					}}
				/>
				<div className="grid grid-cols-2 gap-4">
					{/* Publish */}
					<Button large onClick={publishChanges}>
						Publish
					</Button>
					{/* Publish */}
					<Button large onClick={discardChanges} mode="danger">
						Discard
					</Button>
				</div>
			</div>
			<Modal show={showModal}>
				<div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 pt-12 gap-12 rounded-lg">
					<p className="text-center text-2xl font-semibold">
						Project Successfully Edited
					</p>
					<div className="flex flex-col gap-4">
						<Button
							large
							onClick={() => {
								setShowModal(false);
								navigate(`/projects/${projectData._id}`);
							}}
						>
							View Project
						</Button>
						<Button
							large
							mode="secondary"
							onClick={() => {
								setShowModal(false);
								navigate("/discover");
							}}
						>
							Go to Discover
						</Button>
					</div>
				</div>
			</Modal>
		</Fragment>
	);
};

export default EditProjectPage;
