import { useState } from "react";
import { Fragment } from "react";
import Bubble from "../reusable/Bubble";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import TechnologySearchField from "./TechnologySearchField";

const TechnologiesField = ({ title, type }) => {
	let res = useSelector((state) => state.user);
	const [mode, setMode] = useState(type);

	const editStyles = !mode
		? "bg-gray-100 dark:bg-gray-900 p-2 rounded-md"
		: "";

	const bubbleMode = () => {
		if (mode === false) {
			return (
				<Fragment>
					{res.technologies?.map((value) => (
						<Bubble removable text={value} key={value} />
					))}
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					{res.technologies?.map((value) => (
						<Bubble text={value} key={value} />
					))}
				</Fragment>
			);
		}
	};

	return (
		<div className="flex flex-col gap-2 overflow-hidden">
			<div className="flex justify-between">
				<p className="text-2xl font-semibold">{title}</p>
				<button
					className=""
					onClick={() => {
						setMode(!mode);
					}}
				>
					{mode ? (
						<BiSolidEdit className="text-2xl" />
					) : (
						<MdOutlineSaveAlt className="text-2xl" />
					)}
				</button>
			</div>
			{mode ? null : <TechnologySearchField />}
			<div
				className={`grow flex gap-2 flex-wrap overflow-y-auto ${editStyles} scroll-bar-light dark:scroll-bar-dark`}
			>
				{bubbleMode()}
			</div>
		</div>
	);
};

export default TechnologiesField;
