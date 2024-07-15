import { useEffect, useState } from "react";
import {
	MdOutlineModeEdit,
	MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { updateUser } from "../../pages/loaders/updateUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBio } from "../../store/slices/userSlice";

const BioProfileFields = ({ type, title, info, privateView }) => {
	let user = useSelector((state) => state.user);
	const [mode, setMode] = useState(type);
	const [bio, setBio] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		setBio(info);
	}, [info]);

	const switchMode = () => {
		if (mode === false) {
			dispatch(updateBio(bio));
			updateUser(user.id, bio);
		}
		setMode(!mode);
	};

	const editStyles = !mode
		? "bg-gray-300 dark:bg-gray-700 p-2 rounded-md"
		: "bg-transparent";

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<span className="text-2xl font-semibold ">{title}</span>
				{privateView && (
					<button onClick={switchMode} aria-label="edit/save button">
						{mode ? (
							<MdOutlineModeEdit className="text-2xl" />
						) : (
							<MdOutlineKeyboardDoubleArrowUp className="text-2xl" />
						)}
					</button>
				)}
			</div>
			<textarea
				className={`grow flex w-full min-h-60 max-h-60 text-base focus:outline-none 
				${editStyles} scroll-bar`}
				aria-label="user bio textarea"
				role="textbox"
				disabled={mode}
				value={bio}
				onChange={(e) => setBio(e.target.value)}
			></textarea>
		</div>
	);
};

export default BioProfileFields;
