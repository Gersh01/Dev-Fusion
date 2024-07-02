import { MdOutlineCompareArrows, MdOutlineTimer } from "react-icons/md";

const SortBySelector = ({ sortBy, setSortBy }) => {
	return (
		<div className="flex gap-1 items-center">
			{sortBy === "recent" ? (
				<MdOutlineTimer className="text-xl" />
			) : (
				<MdOutlineCompareArrows className="text-xl" />
			)}
			<select
				className="self-end w-36 bg-transparent rounded-md focus:outline-none
				flex gap-2 items-center"
				value={sortBy}
				onChange={(e) => {
					setSortBy(e.target.value);
				}}
			>
				<option className="bg-gray-200 dark:bg-gray-700" value="recent">
					Most Recent
				</option>
				<option
					className="bg-gray-200 dark:bg-gray-700"
					value="relevance"
				>
					Relevance
				</option>
			</select>
		</div>
	);
};

export default SortBySelector;
