import logo from "../../assets/DFLogoFinal.png";
import Button from "../reusable/Button";

const ProfileSettings = () => {
	return (
		<div className="flex justify-between gap-4">
			<img className="max-h-28 max-w-28 rounded-full" src={logo}></img>
			<div className="self-end">
				<Button large>Edit</Button>
			</div>
		</div>
	);
};

export default ProfileSettings;
