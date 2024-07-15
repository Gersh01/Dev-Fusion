import { getRole } from "../../utils/utility";
import SelectionSearchField from "../reusable/SelectionSearchField";
import Bubble from "../reusable/Bubble";

const CreateRolesPanel = ({ roles, setRoles, errors, clearErrors }) => {
	const onRemove = (roleNameToRemove) => {
		// * Project Manager cannot be removed
		if (roleNameToRemove === "Project Manager") {
			return;
		}

		const updatedBubbles = roles.filter((bubble) => {
			return bubble.name !== roleNameToRemove;
		});

		setRoles(updatedBubbles);
	};

	const addNewRole = (newRole) => {
		if (newRole.length === 0) {
			return;
		}

		let hasDuplicate = false;
		roles.forEach((role) => {
			if (role.name === newRole) {
				hasDuplicate = true;
			}
		});

		if (hasDuplicate) {
			return;
		}

		const updatedRoles = [
			...roles,
			{ name: newRole, count: 1, description: "" },
		];

		setRoles(updatedRoles);
	};

	const onCountChange = (roleName, newCount) => {
		if (newCount > 9) {
			return;
		}

		const updatedRoles = roles.map((role) => {
			if (role.name === roleName) {
				role.count = newCount;
			}
			return role;
		});
		setRoles(updatedRoles);
	};

	const onDescriptionChange = (roleName, newDescription) => {
		const updatedRoles = roles.map((role) => {
			if (role.name === roleName) {
				role.description = newDescription;
			}
			return role;
		});
		setRoles(updatedRoles);
	};

	const renderedRolesBubbles = roles.map((bubble) => {
		return (
			<Bubble
				key={bubble.name}
				text={bubble.name}
				countable
				onCountChange={onCountChange}
				count={bubble.count}
				removable
				onRemove={onRemove}
				useTextArea
				input={bubble.description}
				writable
				placeholder="Tell us more about this role"
				onTextAreaChange={onDescriptionChange}
				onFocus={clearErrors}
			/>
		);
	});

	const renderedErrors = errors?.map((error) => {
		return (
			<li className="crimson-pro text-lg text-red-500" key={error}>
				{error}
			</li>
		);
	});

	return (
		<div className="flex flex-col drop-shadow-lg">
			<div
				className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-900 rounded-md
			text-black dark:text-white poppins min-w-0 min-h-0"
			>
				<div className="flex justify-between items-center gap-1.5 text-lg flex-wrap">
					<p className="text-sm font-medium">Roles</p>
					<SelectionSearchField
						selectionFunc={getRole}
						onAdd={addNewRole}
						onFocus={clearErrors}
					/>
				</div>
				<div className={`flex flex-col gap-2`}>
					{renderedRolesBubbles}
				</div>
			</div>
			<ul className="px-2 list-inside list-none">{renderedErrors}</ul>
		</div>
	);
};

export default CreateRolesPanel;
