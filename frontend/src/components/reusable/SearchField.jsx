import { MdOutlineSearch } from "react-icons/md";

const SearchField = () => {
	return (
		<div className="h-8 flex gap-2 min-w-0 text-base font-normal drop-shadow">
			<select
				className="w-40 bg-gray-200 dark:bg-gray-700 rounded-md px-1 focus:outline-none
				flex gap-2 items-center"
			>
				<option value="title">Title</option>
				<option value="technology">Technology</option>
				<option value="description">Description</option>
				<option value="role">Role</option>
			</select>
			<input
				className="bg-transparent min-w-0 focus:outline-none"
				placeholder="Search"
			/>
			<button
				className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-md 
				flex justify-center items-center"
			>
				<MdOutlineSearch className="text-2xl" />
			</button>
		</div>
	);
};

export default SearchField;
