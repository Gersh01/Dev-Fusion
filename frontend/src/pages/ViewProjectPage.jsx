import { Fragment, useState } from "react";
import {
    MdArrowLeft,
    MdPerson,
    MdOutlineAccessTimeFilled,
    MdMailOutline,
} from "react-icons/md";
import Divider from "../components/reusable/Divider";
import Button from "../components/reusable/Button";
import Bubble from "../components/reusable/Bubble";
import { useLoaderData, useNavigate } from "react-router-dom";
import RolesBubble from "../components/view/RolesBubble";
import Modal from "../components/reusable/Modal";
import CreateRolesSelectionPanel from "../components/create/CreateRolesSelectionPanel";
import { useSelector } from "react-redux";
import { applicationApply } from "./loaders/applicationLoader";

const ViewProjectPage = () => {
    const projectData = useLoaderData();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [applicationDescription, setApplicationDescription] = useState("");
    const roleSelected = useSelector((state) => state.application.role);
    const userId = useSelector((state) => state.user.id);
    const [sent, setSent] = useState(false);
    const [appError, SetAppError] = useState(false);
    let rolesAvailable = [];

    if (projectData === null) {
        return null;
    }
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
        // TODO - Mock members (to be removed)
        // const members = [
        // 	{
        // 		name: "Alex",
        // 		id: "abc",
        // 	},
        // 	{
        // 		name: "James",
        // 		id: "abcd",
        // 	},
        // 	{
        // 		name: "Xutao",
        // 		id: "abcde",
        // 	},
        // ];

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
        console.log(
            `${role.role}-roles count:${role.count} (role.count) vs ${roleCount} (roleCount)`
        );
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

    const renderedCommunicationsBubbles = communications?.map((comm) => {
        return (
            <Bubble
                key={comm.name}
                text={comm.name}
                input={comm.link.length === 0 ? "None" : comm.link}
                writable
                readOnly
            />
        );
    });

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const sendApp = () => {
        const payload = {
            projectId: projectData._id,
            userId: userId,
            role: roleSelected,
            description: applicationDescription,
        };
        if (!sent) {
            if (applicationApply?.(payload) === 201) {
                SetAppError(false);
                setSent(true);
                setTimeout(() => {
                    setSent(false);
                    toggleModal();
                }, 10000);
            } else {
                SetAppError(true);
            }
        }
    };

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
            <div className="flex gap-2 flex-wrap">
                <Button mode="safe">Begin</Button>
                <Button mode="secondary">Manage Team</Button>
                <Button mode="secondary">Edit</Button>
                <Button mode="danger">Delete</Button>
                <Button mode="safe" onClick={toggleModal}>
                    Apply
                </Button>
                <button
                    onClick={() => navigate(`/applications/${projectData._id}`)}
                >
                    <MdMailOutline className="size-8" />
                </button>
            </div>
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
            <Modal show={showModal}>
                <div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 gap-6 rounded-lg">
                    <p className="text-center text-xl font-semibold">
                        Application
                    </p>
                    <div className="flex flex-col gap-4">
                        <CreateRolesSelectionPanel
                            projectRoles={rolesAvailable}
                        ></CreateRolesSelectionPanel>
                        <div className="flex gap-1 flex-col">
                            <p>Description</p>
                            <textarea
                                role="textbox"
                                className="bg-gray-900 w-[300px] h-[150px] p-2 overflow-y-scroll focus:outline-none scroll-bar rounded-md"
                                placeholder="Why would you like to join this project?"
                                onChange={(e) =>
                                    setApplicationDescription(e.target.value)
                                }
                            ></textarea>
                        </div>
                        {sent ? <p>Application has been sent</p> : null}
                        {appError ? (
                            <p className="crimson-pro text-red-600">
                                Error when trying to apply
                            </p>
                        ) : null}
                        <div className="flex gap-2 justify-end">
                            {sent ? (
                                <Button mode={"danger"} onClick={toggleModal}>
                                    Close
                                </Button>
                            ) : (
                                <Fragment>
                                    <Button mode={"safe"} onClick={sendApp}>
                                        Apply
                                    </Button>
                                    <Button
                                        mode={"danger"}
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </Button>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default ViewProjectPage;
