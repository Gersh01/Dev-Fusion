import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDisplayMode } from "../../store/slices/systemSlice";
import Cookies from "universal-cookie";

const DisplayModeSettings = () => {
	const cookies = new Cookies(null, { path: "/", maxAge: 60 * 60 * 24 * 7 });

	const displayMode = useSelector((state) => state.system.displayMode);
	const [selectionValue, setSelectionValue] = useState(displayMode);
	const dispatch = useDispatch();

	const onDisplayModeChange = (event) => {
		setSelectionValue(event.target.value);
		dispatch(setDisplayMode(event.target.value));
		cookies.set("display-mode", event.target.value);
	};

	return (
		<div className="flex gap-4 justify-between items-center">
			<p className="text-2xl font-semibold">Display Mode</p>
			<select
				className="w-32 rounded-md p-1 bg-gray-200 dark:bg-gray-700 focus:outline-none"
				value={selectionValue}
				onChange={onDisplayModeChange}
			>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</select>
		</div>
	);
};

export default DisplayModeSettings;
