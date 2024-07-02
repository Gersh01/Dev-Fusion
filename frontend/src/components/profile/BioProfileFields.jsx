import { useState } from "react";
import {
	MdOutlineModeEdit,
	MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { updateUser } from "../../pages/loaders/updateUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBio } from "../../store/slices/userSlice";

const BioProfileFields = ({ type, title, info }) => {
	let user = useSelector((state) => state.user);
	const [mode, setMode] = useState(type);
	const [bio, setBio] = useState(info);
	const dispatch = useDispatch();

	const switchMode = () => {
		if (mode === false) {
			updateUser(user.id, bio);
			dispatch(updateBio(bio));
		}
		setMode(!mode);
	};

	const editStyles = !mode
		? "bg-gray-50 dark:bg-gray-900 p-2 rounded-md"
		: "";

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<span className="text-2xl font-semibold ">{title}</span>
				<button onClick={switchMode}>
					{mode ? (
						<MdOutlineModeEdit className="text-2xl" />
					) : (
						<MdOutlineKeyboardDoubleArrowUp className="text-2xl" />
					)}
				</button>
			</div>
			<textarea
				className={`grow flex w-full min-h-60 max-h-60 bg-transparent text-base focus:outline-none 
				${editStyles} scroll-bar`}
				role="textbox"
				disabled={mode}
				onChange={(e) => setBio(e.target.value)}
				defaultValue={user.bio}
			></textarea>
		</div>
	);
};

export default BioProfileFields;
