import { Fragment, useEffect, useState } from "react";
import {
    MdArrowLeft,
    MdPerson,
    MdOutlineAccessTimeFilled,
} from "react-icons/md";
import Divider from "../components/reusable/Divider";
import Button from "../components/reusable/Button";
import Bubble from "../components/reusable/Bubble";
import { useLoaderData, useNavigate } from "react-router-dom";
import RolesBubble from "../components/view/RolesBubble";
import Modal from "../components/reusable/Modal";
import ApplicationModalView from "../components/application/ApplicationModalView";
import { useSelector } from "react-redux";
import UserViews from "../components/view/UserViews";
import { getApplications } from "./loaders/applicationLoader";
import DeleteProjectModal from "../components/view/DeleteProjectModal";
import { showDeleteModal } from "../store/slices/applicationSlice";

const ViewProjectPage = () => {
    const projectData = useLoaderData();
    const navigate = useNavigate();
    const showModal = useSelector((state) => state.application.showModal);
    const roleSelected = useSelector((state) => state.application.role);
    const userId = useSelector((state) => state.user.id);
    const username = useSelector((state) => state.user.username);
    const [sent, setSent] = useState(false);
    const deleteShowModal = useSelector(
        (state) => state.application.showDeleteModal
    );
    let rolesAvailable = [];

    if (projectData === null) {
        return null;
    }

    useEffect(() => {}, [projectData]);

    const numTotalPositions = 9;
    const {
        title,
        projectStartDate,
        deadline,
        description,
        technologies,
        communications,
        roles,
        teamMembers,
    } = projectData;
    const numDaysTilStart = Math.floor(
        (new Date(projectStartDate) - new Date()) / 1000 / 60 / 60 / 24 + 1
    );
    const numDaysTilEnd = Math.floor(
        (new Date(deadline) - new Date()) / 1000 / 60 / 60 / 24 + 1
    );

    let dateMessage = "";

    if (numDaysTilStart > 0) {
        if (numDaysTilStart === 1) {
            dateMessage = `${numDaysTilStart} day until project begins`;
        } else {
            dateMessage = `${numDaysTilStart} days until project begins`;
        }
    } else {
        if (numDaysTilEnd === 1) {
            dateMessage = `due in ${numDaysTilEnd} day`;
        } else {
            dateMessage = `due in ${numDaysTilEnd} days`;
        }
    }

    const renderedTechnologyBubbles = technologies?.map((technology) => {
        return <Bubble key={technology} text={technology} />;
    });

    const renderedRolesRequirementBubbles = roles?.map((role) => {
        let roleCount = 0;
        const members = [];

        teamMembers.forEach((member) => {
            if (member.role === role.role) {
                roleCount += 1;
                members.push({
                    userId: member.userId,
                    username: member.username,
                });
            }
        });

        if (roleCount < role.count) {
            rolesAvailable.push(role.role);
        }

        return (
            <RolesBubble
                key={role.role}
                role={role.role}
                description={role.description}
                count={role.count}
                currentCount={roleCount}
                members={members}
            />
        );
    });

    const userStatus = () => {
        let mode = "newUser";
        if (userId === projectData.ownerID) {
            mode = "owner";
        } else {
            teamMembers.map((member) => {
                if (member.userId === userId) {
                    if (member.role === "Project Manager") {
                        mode = "manager";
                    } else {
                        mode = "member";
                    }
                }
            });
        }
        return mode;
    };

    const userView = () => {
        const appAmount = getApplications?.(projectData._id);
        const mode = userStatus();
        return (
            <UserViews
                mode={mode}
                projectData={projectData}
                amount={appAmount.length}
                username={username}
            ></UserViews>
        );
    };

    const renderedCommunicationsBubbles = communications?.map((comm) => {
        const mode = userStatus();
        return (
            <Bubble
                key={comm.name}
                text={comm.name}
                input={comm.link.length === 0 ? "None" : comm.link}
                writable
                readOnly
                member={mode}
            />
        );
    });

    return (
        <Fragment>
            <button
                className="flex items-center self-start"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <MdArrowLeft className="text-2xl" />
                <p className="text-xl font-semibold">Back</p>
            </button>
            {/* <Divider /> */}
            <p className="text-3xl font-semibold">{title}</p>
            {/* different views depending on the user viewing the project*/}
            <div className="flex flex-wrap justify-between">{userView()}</div>
            {/* TIME */}
            <div className="flex justify-between flex-wrap">
                <div className="flex gap-1 items-center">
                    <p className="poppins text-white">{numTotalPositions}</p>
                    <MdPerson className="text-xl text-white" />
                </div>
                <div className="flex gap-1 items-center">
                    <MdOutlineAccessTimeFilled className="text-xl text-white" />
                    <p className="poppins text-white">{dateMessage}</p>
                </div>
            </div>
            <Divider />
            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Description</p>
                <p>{description}</p>
            </div>
            {/* POSITION REQUIREMENTS */}
            <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Position Requirements</p>
                <div className="flex flex-col gap-4">
                    {renderedRolesRequirementBubbles}
                </div>
            </div>
            {/* TECHNOLOGIES */}
            <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Technologies</p>
                <div className="flex flex-wrap gap-4">
                    {renderedTechnologyBubbles}
                </div>
            </div>
            {/* COMMUICATION */}
            <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Communications</p>
                <div className="flex flex-wrap gap-4">
                    {renderedCommunicationsBubbles}
                </div>
            </div>
            {/* MODAL */}
            <Modal show={showModal}>
                <ApplicationModalView
                    project={projectData}
                    setShowModal={showModal}
                    roles={rolesAvailable}
                    show={showModal}
                />
            </Modal>
            <Modal show={deleteShowModal}>
                <DeleteProjectModal
                    projectId={projectData._id}
                    show={showDeleteModal}
                ></DeleteProjectModal>
            </Modal>
        </Fragment>
    );
};

export default ViewProjectPage;
