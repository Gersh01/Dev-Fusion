import { Fragment, useEffect, useState } from "react";
import Divider from "../reusable/Divider";
import TextArea from "../reusable/TextArea";
import { useSelector, useDispatch } from "react-redux";
import { applicationApply } from "../../pages/loaders/applicationLoader";
import Button from "../reusable/Button";
import { showApplicationModal } from "../../store/slices/applicationSlice";

const ApplicationModalView = ({ project, roles, setShowModal, show }) => {
    const [applicationDescription, setApplicationDescription] = useState("");
    const userId = useSelector((state) => state.user.id);
    const [sent, setSent] = useState(false);
    const [appError, setAppError] = useState(false);
    const [role, setRole] = useState(roles.length === 0 ? "" : roles[0]);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setApplicationDescription("");
        setSent(false);
        setAppError(false);
    }, [show]);

    const onSubmit = async () => {
        if (role === "") {
            setErrorMessage("There are no roles available");
            setAppError(true);
            return;
        }

        const payload = {
            projectId: project._id,
            userId: userId,
            role: role,
            description: applicationDescription,
        };

        try {
            await applicationApply(payload);
            setAppError(false);
            setSent(true);
        } catch (e) {
            setErrorMessage(e.response.data.error);
            setAppError(true);
        }
    };

    const onCloseModal = () => {
        // setRole("");

        dispatch(showApplicationModal(false));
    };

    const renderedRoleOptions = roles.map((role) => {
        return (
            <option key={role} value={role}>
                {role}
            </option>
        );
    });

    return (
        <div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 gap-4 rounded-lg min-w-0">
            <p className="text-2xl font-semibold">Application</p>
            <Divider />
            <div className="flex flex-col gap-2 min-w-0">
                <p className="font-medium w-96">Desired Role</p>
                <select
                    className="h-10 flex-auto flex bg-gray-200 dark:bg-gray-900 rounded-md px-1 
					focus:outline-none items-center"
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                >
                    {roles.length > 0 ? (
                        renderedRoleOptions
                    ) : (
                        <option value="">No roles available</option>
                    )}
                </select>
                <TextArea
                    titleText="Description"
                    placeholder="Why would you like to join this project?"
                    value={applicationDescription}
                    onChange={(e) => setApplicationDescription(e.target.value)}
                />
                {sent ? (
                    <p className="crimson-pro text-green-500">
                        Application has been sent
                    </p>
                ) : null}
                {appError ? (
                    <p className="crimson-pro text-red-500">{errorMessage}</p>
                ) : null}
            </div>
            <div className="flex flex-col gap-2 min-w-0">
                {sent ? (
                    <Button mode={"danger"} onClick={onCloseModal}>
                        Close
                    </Button>
                ) : (
                    <Fragment>
                        <Button mode={"safe"} onClick={onSubmit}>
                            Apply
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

export default ApplicationModalView;
