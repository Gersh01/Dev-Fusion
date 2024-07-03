import { getCommunication } from "../../utils/utility";
import SelectionSearchField from "../reusable/SelectionSearchField";
import Bubble from "../reusable/Bubble";

const CreateCommunicationsPanel = ({ comms, setComms, errors, onFocus }) => {
	const onRemove = (commNameToRemove) => {
		const updatedBubbles = comms.filter((bubble) => {
			return bubble.name !== commNameToRemove;
		});

		setComms(updatedBubbles);
	};

	const addNewComm = (newComm) => {
		if (newComm.length === 0) {
			return;
		}

		let hasDuplicate = false;
		comms.forEach((role) => {
			if (role.name === newComm) {
				hasDuplicate = true;
			}
		});

		if (hasDuplicate) {
			return;
		}

		const updatedComms = [...comms, { name: newComm, link: "" }];

		setComms(updatedComms);
	};

	const onLinkChange = (commName, newLink) => {
		const updatedComms = comms.map((comm) => {
			if (comm.name === commName) {
				comm.link = newLink;
			}
			return comm;
		});
		setComms(updatedComms);
	};

	const renderedCommsBubbles = comms.map((bubble) => {
		return (
			<Bubble
				key={bubble.name}
				text={bubble.name}
				removable
				onRemove={onRemove}
				writable
				input={bubble.link}
				onTextAreaChange={onLinkChange}
				placeholder="Enter a link"
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
					<p className="text-sm font-medium">Communications</p>
					<SelectionSearchField
						selectionFunc={getCommunication}
						onAdd={addNewComm}
						onFocus={onFocus}
					/>
				</div>
				<div className={`flex gap-2 flex-wrap`}>
					{renderedCommsBubbles}
				</div>
			</div>
			<ul className="px-2 list-inside list-none">{renderedErrors}</ul>
		</div>
	);
};

export default CreateCommunicationsPanel;
