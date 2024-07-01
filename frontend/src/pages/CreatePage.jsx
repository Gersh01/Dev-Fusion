import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";

import { Fragment } from "react";
import Divider from "../components/reusable/Divider";
import TextArea from "../components/reusable/TextArea";
import CreateTechnologiesPanel from "../components/create/CreateTechnologiesPanel";
import CreateRolesPanel from "../components/create/CreateRolesPanel";
import CreateCommunicationsPanel from "../components/create/CreateCommunicationsPanel";

const CreatePage = () => {
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
				/>
				{/* TODO: Look into different format for date input */}
				<div className="grid gap-4 grid-cols-2">
					{/* Start Date */}
					<Input
						titleText="Start Date"
						placeholder="Enter the start date"
						type="date"
					/>
					{/* Deadline */}
					<Input
						titleText="Deadline"
						placeholder="Enter the deadline"
						type="date"
					/>
				</div>
				{/* Description */}
				<TextArea
					titleText="Description"
					placeholder="tell us about your project"
				/>
				{/* Technologies */}
				<CreateTechnologiesPanel />
				{/* Roles */}
				<CreateRolesPanel />
				{/* Communications */}
				<CreateCommunicationsPanel />
				{/* Publish */}
				<Button large>Publish</Button>
			</div>
		</Fragment>
	);
};

export default CreatePage;
