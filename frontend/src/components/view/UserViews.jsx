import { MdMailOutline } from "react-icons/md";
import Button from "../reusable/Button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	showApplicationModal,
	showDeleteModal,
	showLeaveModal,
} from "../../store/slices/applicationSlice";
import axios from "axios";
import { apiDomain } from "../../utils/utility";

const UserViews = ({ userViewInfo, projectData, amount }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let mode = userViewInfo.mode;
	let canApply = userViewInfo.canApply;

	const editProject = () => {
		navigate(`/projects/edit/${projectData._id}`);
	};

	const toggleModal = () => {
		dispatch(showApplicationModal(true));
	};

	const leaveProject = () => {
		dispatch(showLeaveModal(true));
	};

	const removeProject = () => {
		dispatch(showDeleteModal(true));
	};

	const startProjectNow = async () => {
		let date = new Date();
		let dateYMD = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;

		let startProject = {
			// ownerID: projectData.ownerID,
			projectId: projectData._id,
			title: projectData.title,
			projectStartDate: dateYMD,
			description: projectData.description,
			deadline: projectData.deadline,
			roles: projectData.roles,
			technologies: projectData.technologies,
			communications: projectData.communications,
			isStarted: true,
		};

		try {
			await axios.put(apiDomain + "/api/edit-project", startProject, {
				withCredentials: true,
			});
			navigate(0);
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	return (
		<Fragment>
			<div className="flex gap-2">
				{mode === "owner" ||
				mode === "manager" ||
				mode === "ownerapply" ? (
					<Fragment>
						{projectData.isStarted === false && (
							<Button mode="safe" onClick={startProjectNow}>
								Begin
							</Button>
						)}

						<Button
							mode="secondary"
							onClick={() =>
								navigate(`/manage-team/${projectData._id}`)
							}
						>
							Manage Team
						</Button>

						<Button mode="secondary" onClick={editProject}>
							Edit
						</Button>
					</Fragment>
				) : null}

				{mode === "owner" || mode === "ownerapply" ? (
					<Button mode="danger" onClick={removeProject}>
						Delete
					</Button>
				) : null}
				{mode === "member" || mode === "manager" ? (
					<Button mode="danger" onClick={leaveProject}>
						Leave
					</Button>
				) : null}
				{(mode === "newUser" || mode === "ownerapply") && canApply ? (
					<Button mode="safe" onClick={toggleModal}>
						Apply
					</Button>
				) : null}
			</div>
			<div className="flex">
				{mode === "manager" ||
				mode === "owner" ||
				mode === "ownerapply" ? (
					<Fragment>
						<button
							onClick={() =>
								navigate(`/applications/${projectData._id}`)
							}
							aria-label="view application button"
						>
							<MdMailOutline className="size-8" />
						</button>
						{amount > 0 ? (
							<p className="flex text-2xl">({amount})</p>
						) : null}
					</Fragment>
				) : null}
			</div>
		</Fragment>
	);
};

export default UserViews;
