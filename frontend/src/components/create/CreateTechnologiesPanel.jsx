import { getTechnology } from "../../utils/utility";
import SelectionSearchField from "../reusable/SelectionSearchField";
import Bubble from "../reusable/Bubble";

const CreateTechnologiesPanel = ({ techs, setTechs, errors, onFocus }) => {
	const onRemove = (TechNameToRemove) => {
		const updatedBubbles = techs.filter((bubble) => {
			return bubble.name !== TechNameToRemove;
		});

		setTechs(updatedBubbles);
	};

	const addNewTechnology = (newTech) => {
		if (newTech.length === 0 || techs.includes(newTech)) {
			return;
		}

		let hasDuplicate = false;
		techs.forEach((tech) => {
			if (tech.name === newTech) {
				hasDuplicate = true;
			}
		});

		if (hasDuplicate) {
			return;
		}

		const updatedTechnologies = [...techs, { name: newTech }];

		setTechs(updatedTechnologies);
	};

	const renderedTechBubbles = techs.map((bubble) => {
		return (
			<Bubble
				key={bubble.name}
				text={bubble.name}
				removable
				onRemove={onRemove}
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
		<div className="flex flex-col">
			<div
				className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-900 rounded-md
			text-black dark:text-white poppins min-w-0 min-h-0"
			>
				<div className="flex justify-between items-center gap-1.5 text-lg flex-wrap">
					<p className="text-sm font-medium">Technology</p>
					<SelectionSearchField
						selectionFunc={getTechnology}
						onAdd={addNewTechnology}
						onFocus={onFocus}
					/>
				</div>
				<div className={`flex gap-2 flex-wrap`}>
					{renderedTechBubbles}
				</div>
			</div>
			<ul className="px-2 list-inside list-none">{renderedErrors}</ul>
		</div>
	);
};

export default CreateTechnologiesPanel;
