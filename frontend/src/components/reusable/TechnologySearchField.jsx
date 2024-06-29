import { Fragment, useState } from "react";
import { getTechnology } from "../../utils/utility";

const TechnologySearchField = () => {
	const [techList, setTechList] = useState(getTechnology(""));

	const renderedTechnologiesOptions = techList.map((value) => {
		return (
			<option key={value} value={value}>
				{value}
			</option>
		);
	});

	return (
		<Fragment>
			<div className="flex">
				<div className="flex gap-1">
					<input
						type="text"
						className="flex focus:outline-none text-black poppins"
						placeholder="Search"
						onChange={(e) => {
							setTechList(getTechnology(e.target.value));
						}}
					></input>

					<select
						className="w-40 bg-gray-200 dark:bg-gray-800 rounded-md px-1 focus:outline-none
						flex gap-2 items-center"
					>
						{renderedTechnologiesOptions}
						<option value="test">test</option>
					</select>
				</div>
			</div>
		</Fragment>
	);
};

export default TechnologySearchField;
