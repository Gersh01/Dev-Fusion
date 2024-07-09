import { useState, Fragment, useEffect } from "react";
// import { deleteProject } from "../../pages/loaders/projectLoader";
import { useDispatch } from "react-redux";
import { showLeaveModal } from "../../store/slices/applicationSlice";
import Button from "../reusable/Button";
import { useNavigate } from "react-router-dom";
import { userLeavingProject } from "../../pages/loaders/projectLoader";

const LeaveProjectModal = (projectId, show) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [leave, setLeave] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [leaveError, setLeaveError] = useState(false);

    useEffect(() => {
        setLeave(false);
        setLeaveError(false);
        setErrorMessage("");
    }, [show]);

    const leaveProject = async () => {
        if (userLeavingProject?.(projectId)) {
            setLeave(true);
        }
    };

    const onCloseModal = () => {
        dispatch(showLeaveModal(false));
    };

    const onFinished = () => {
        onCloseModal();
        navigate("/my-projects");
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 gap-4 max-w-60 rounded-lg min-w-0">
            <p className="text-xl text-center font-semibold">
                Are you sure you want to leave the project?
            </p>
            <div className="flex flex-col gap-2 min-w-0">
                {leave ? (
                    <p className="crimson-pro text-green-500">
                        You have left the project
                    </p>
                ) : null}
                {leaveError ? (
                    <p className="crimson-pro text-red-500">{errorMessage}</p>
                ) : null}
            </div>
            <div className="flex flex-col gap-2 min-w-0">
                {leave ? (
                    <Button mode={"danger"} onClick={onFinished}>
                        Close
                    </Button>
                ) : (
                    <Fragment>
                        <Button mode={"safe"} onClick={leaveProject}>
                            Confirm
                        </Button>
                        <Button mode={"danger"} onClick={onCloseModal}>
                            Cancel
                        </Button>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default LeaveProjectModal;
