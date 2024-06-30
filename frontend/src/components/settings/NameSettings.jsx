import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../reusable/Input";
import Button from "../reusable/Button";

const NameSettings = () => {
	const user = useSelector((state) => state.user);

	const [firstNameInput, setFirstNameInput] = useState("");
	const [lastNameInput, setLastNameInput] = useState("");

	useEffect(() => {
		if (user.firstName && user.lastName) {
			setFirstNameInput(user.firstName);
			setLastNameInput(user.lastName);
		}
	}, [user]);

	return (
		<div className="flex flex-col gap-4">
			<p className="text-2xl font-semibold">Name</p>
			<div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-2">
				<Input
					titleText="First Name"
					value={firstNameInput}
					onChange={(e) => {
						setFirstNameInput(e.target.value);
					}}
				/>
				<Input
					titleText="Last Name"
					value={lastNameInput}
					onChange={(e) => {
						setLastNameInput(e.target.value);
					}}
				/>
			</div>
			<div className="self-end">
				<Button large>Save</Button>
			</div>
		</div>
	);
};

export default NameSettings;
