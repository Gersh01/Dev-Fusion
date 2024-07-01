import { useState } from "react";
import { getTechnology } from "../../utils/utility";
import SelectionSearchField from "../reusable/SelectionSearchField";
import Bubble from "../reusable/Bubble";

const CreateTechnologiesPanel = () => {
	const [techs, setTechs] = useState([]);

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

	return (
		<div
			className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-900 rounded-md
			text-black dark:text-white poppins min-w-0 min-h-0"
		>
			<div className="flex justify-between items-center gap-1.5 text-lg flex-wrap">
				<p className="text-sm font-medium">Technology</p>
				<SelectionSearchField
					selectionFunc={getTechnology}
					onAdd={addNewTechnology}
				/>
			</div>
			<div className={`flex gap-2 flex-wrap`}>{renderedTechBubbles}</div>
		</div>
	);
};

export default CreateTechnologiesPanel;
