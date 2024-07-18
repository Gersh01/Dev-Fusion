import { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showRemoveModal } from "../../store/slices/applicationSlice";
import Button from "../reusable/Button";
import { useNavigate } from "react-router-dom";
import { updateTeamMembers } from "../../pages/loaders/projectLoader";
import { useSelector } from "react-redux";

const RemoveUserModal = (projectData, show) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [removeError, setRemoveError] = useState(false);
    const username = useSelector((state) => state.application.removeUser);

    useEffect(() => {
        setRemove(false);
        setRemoveError(false);
        setErrorMessage("");
    }, [show]);

    const removeUser = async () => {
        let teamMembers = projectData.projectData.teamMembers;
        let projectId = projectData.projectData._id;
        let payload = {
            projectId: projectId,
            teamMembers: [],
        };
        teamMembers.map((member) => {
            if (member.username !== username) {
                payload.teamMembers.push(member);
            }
        });
        if (updateTeamMembers?.(payload)) {
            setRemove(true);
        }
    };

    const onCloseModal = () => {
        dispatch(showRemoveModal(false));
    };

    const onFinished = () => {
        onCloseModal();
        navigate(0);
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 gap-4 max-w-60 rounded-lg min-w-0">
            <p className="text-xl text-center font-semibold">
                Are you sure you want to remove the user?
            </p>
            <div className="flex flex-col gap-2 min-w-0">
                {remove ? (
                    <p className="crimson-pro text-green-500">
                        You have removed the user
                    </p>
                ) : null}
                {removeError ? (
                    <p className="crimson-pro text-red-500">{errorMessage}</p>
                ) : null}
            </div>
            <div className="flex flex-col gap-2 min-w-0">
                {remove ? (
                    <Button mode={"danger"} onClick={onFinished}>
                        Close
                    </Button>
                ) : (
                    <Fragment>
                        <Button mode={"safe"} onClick={removeUser}>
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

export default RemoveUserModal;
