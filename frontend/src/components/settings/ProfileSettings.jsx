import { useSelector } from "react-redux";
import UploadWidget from "../profile/UploadWidget";
const ProfileSettings = () => {
	const res = useSelector((state) => state.user);

	return (
		<div className="flex justify-between gap-4">
			<img
				className="h-28 w-28 rounded-full"
				alt="user profile image"
				src={res.link}
			></img>
			<div className="self-end">
				<UploadWidget id={res.id} />
			</div>
		</div>
	);
};

export default ProfileSettings;
