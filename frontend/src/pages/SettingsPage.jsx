import Divider from "../components/reusable/Divider";
import { Fragment } from "react";
import Button from "../components/reusable/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import NameSettings from "../components/settings/NameSettings";
import DisplayModeSettings from "../components/settings/DisplayModeSettings";
import PasswordSettings from "../components/settings/PasswordSettings";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import ProfileSettings from "../components/settings/ProfileSettings";
import { apiDomain } from "../utils/utility";

const SettingsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const doLogout = async () => {
		await Axios.post(
			apiDomain + "/api/logout",
			{},
			{ withCredentials: true }
		);
		navigate("/");
		dispatch(setUser({}));
	};

	const goAboutUs = () => {
		navigate("/about");
	};

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-8
				poppins text-4xl font-bold gap-x-6"
			>
				<p>Settings</p>
			</div>
			<Divider />
			<ProfileSettings />
			<Divider />
			<NameSettings />
			<Divider />
			<DisplayModeSettings />
			<Divider />
			<PasswordSettings />
			<Divider />
			<Button
				large
				mode="danger"
				aria-label="logout button"
				onClick={doLogout}
			>
				Logout
			</Button>
			<Button
				large
				mode="secondary"
				aria-label="about us button"
				onClick={goAboutUs}
			>
				About US
			</Button>
		</Fragment>
	);
};

export default SettingsPage;
