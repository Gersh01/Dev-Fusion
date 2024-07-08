import { useState, Fragment, useEffect } from "react";
// import { deleteProject } from "../../pages/loaders/projectLoader";
import { useDispatch } from "react-redux";
import { showDeleteModal } from "../../store/slices/applicationSlice";
import Button from "../reusable/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiDomain } from "../../utils/utility";

const DeleteProjectModal = ({ projectId, show }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [deleteError, setDeleteError] = useState(false);

    useEffect(() => {
        setDeleted(false);
        setDeleteError(false);
        setErrorMessage("");
    }, [show]);

    const removeProject = async () => {
        try {
            await axios.delete(`${apiDomain}/api/project/${projectId}`, {
                withCredentials: true,
            });
            console.log("Deleted project");
            setDeleteError(false);
            setDeleted(true);
        } catch (err) {
            console.log(`Error: ${err.message}`);
            setDeleteError(true);
            setErrorMessage("There was an error when deleting the project");
        }
    };

    const onCloseModal = () => {
        dispatch(showDeleteModal(false));
    };

    const onFinished = () => {
        onCloseModal();
        navigate("/my-projects");
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 gap-4 max-w-60 rounded-lg min-w-0">
            <p className="text-xl text-center font-semibold">
                Are you sure you want to delete the project?
            </p>
            <div className="flex flex-col gap-2 min-w-0">
                {deleted ? (
                    <p className="crimson-pro text-green-500">
                        Application has been deleted
                    </p>
                ) : null}
                {deleteError ? (
                    <p className="crimson-pro text-red-500">{errorMessage}</p>
                ) : null}
            </div>
            <div className="flex flex-col gap-2 min-w-0">
                {deleted ? (
                    <Button mode={"danger"} onClick={onFinished}>
                        Close
                    </Button>
                ) : (
                    <Fragment>
                        <Button mode={"safe"} onClick={removeProject}>
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

export default DeleteProjectModal;
