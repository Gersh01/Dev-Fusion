import { useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { updateUser } from "../../pages/loaders/updateUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBio } from "../../store/slices/userSlice";

const BioProfileFields = ({ type, title, info }) => {
	let res = useSelector((state) => state.user);
	const [mode, setMode] = useState(type);
	const [newInfo, setNewInfo] = useState(info);
	const dispatch = useDispatch();

	const switchMode = () => {
		if (mode === false) {
			// console.log(newInfo);
			dispatch(updateBio(newInfo));
			updateUser(res.id, newInfo);
		}
		setMode(!mode);
	};

	const editStyles = !mode
		? "bg-gray-100 dark:bg-gray-900 p-2 rounded-md"
		: "";

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<span className="text-2xl font-semibold ">{title}</span>
				<button onClick={switchMode}>
					{mode ? (
						<BiSolidEdit className="text-2xl" />
					) : (
						<MdOutlineSaveAlt className="text-2xl" />
					)}
				</button>
			</div>
			<textarea
				className={`grow flex w-full min-h-60 max-h-60 bg-transparent text-base focus:outline-none 
				${editStyles} scroll-bar-light dark:scroll-bar-dark`}
				role="textbox"
				disabled={mode}
				onChange={(e) => setNewInfo(e.target.value)}
				defaultValue={res.bio}
			></textarea>
		</div>
	);
};

export default BioProfileFields;
