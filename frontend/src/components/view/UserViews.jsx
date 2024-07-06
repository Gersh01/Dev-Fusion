import { MdMailOutline } from "react-icons/md";
import Button from "../reusable/Button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const UserViews = ({ mode, projectData, appAmount }) => {
    console.log("Debug: The mode being set: " + mode);
    const navigate = useNavigate();

    const editProject = () => {
        navigate(`/projects/edit/${projectData._id}`);
    };

    return (
        <Fragment>
            <div className="flex gap-2">
                {mode === "owner" || mode === "manager" ? (
                    <Fragment>
                        <Button mode="safe">Begin</Button>
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

                {mode === "owner" ? (
                    <Button mode="danger">Delete</Button>
                ) : null}
                {mode === "member" ? (
                    <Button mode="danger">Leave</Button>
                ) : null}
                {mode === "newUser" ? (
                    <Button
                        mode="safe"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        Apply
                    </Button>
                ) : null}
            </div>
            <div className="flex">
                {mode === "manager" || mode === "owner" ? (
                    <Fragment>
                        <button
                            onClick={() =>
                                navigate(`/applications/${projectData._id}`)
                            }
                        >
                            <MdMailOutline className="size-8" />
                        </button>
                        {appAmount > 0 ? (
                            <p className="flex text-2xl">({appAmount})</p>
                        ) : null}
                    </Fragment>
                ) : null}
            </div>
        </Fragment>
    );
};

export default UserViews;
