import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";
import { Fragment, useState } from "react";
import Divider from "../components/reusable/Divider";
import TextArea from "../components/reusable/TextArea";
import CreateTechnologiesPanel from "../components/create/CreateTechnologiesPanel";
import CreateRolesPanel from "../components/create/CreateRolesPanel";
import CreateCommunicationsPanel from "../components/create/CreateCommunicationsPanel";
import { apiDomain } from "../utils/utility";
import axios from "axios";
import { useSelector } from "react-redux";
import { santizeProject } from "../utils/sanitation";
import { validateProject } from "../utils/validations";
import Modal from "../components/reusable/Modal";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
    const user = useSelector((state) => state.user);
    const [projectTitle, setProjectTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [techs, setTechs] = useState([]);
    const [roles, setRoles] = useState([
        { name: "Project Manager", count: 1, description: "" },
    ]);
    const [comms, setComms] = useState([]);
    const [errors, setErrors] = useState({});

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    // * Called when publishing a project
    const onPublish = () => {
        const rolesToSend = roles.map((role) => {
            return {
                role: role.name,
                count: role.count,
                description: role.description,
            };
        });

        const techsToSend = techs.map((tech) => {
            return tech.name;
        });

        const commsToSend = comms.map((comm) => {
            return {
                name: comm.name,
                link: comm.link,
            };
        });

        const newProject = {
            ownerId: user.id,
            title: projectTitle,
            projectStartDate: startDate,
            description: description,
            deadline: endDate,
            roles: rolesToSend,
            technologies: techsToSend,
            communications: commsToSend,
        };

        // * Sanitize input (Remove redundant white space...)
        santizeProject(newProject);

        const validationErrors = validateProject(newProject);
        let hasValidationErrors = false;
        // * Validate input
        setErrors(validationErrors);

        for (const errorType in validationErrors) {
            if (validationErrors[errorType].length !== 0) {
                hasValidationErrors = true;
                break;
            }
        }

        if (hasValidationErrors === false) {
            console.log(newProject);
            setShowModal(true);
            createProject(newProject);
        }
    };

    // * Make API call to create the project
    const createProject = async (project) => {
        console.log("Creating project");
        await axios.post(apiDomain + "/api/project", project, {
            withCredentials: true,
        });
    };

    return (
        <Fragment>
            <div
                className="flex justify-between items-end flex-wrap gap-y-2 
				text-black dark:text-white poppins text-4xl font-bold gap-x-6"
            >
                <p>Create</p>
            </div>
            <Divider />
            <div className="flex flex-col gap-4">
                {/* Project Title */}
                <Input
                    titleText="Project Title"
                    placeholder="Enter Project Title"
                    value={projectTitle}
                    onChange={(e) => {
                        setProjectTitle(e.target.value);
                    }}
                    errors={errors.title}
                    onFocus={() => {
                        setErrors({ ...errors, title: [] });
                    }}
                />
                <div className="grid gap-4 grid-cols-2">
                    {/* Start Date */}
                    <Input
                        titleText="Start Date"
                        placeholder="Enter the start date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        errors={errors.startDate}
                        onFocus={() => {
                            setErrors({ ...errors, startDate: [] });
                        }}
                    />
                    {/* Deadline */}
                    <Input
                        titleText="End Date"
                        placeholder="Enter the deadline"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        errors={errors.endDate}
                        onFocus={() => {
                            setErrors({ ...errors, endDate: [] });
                        }}
                    />
                </div>
                {/* Description */}
                <TextArea
                    titleText="Description"
                    placeholder="tell us about your project"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    errors={errors.description}
                    onFocus={() => {
                        setErrors({ ...errors, description: [] });
                    }}
                />
                {/* Technologies */}
                <CreateTechnologiesPanel
                    techs={techs}
                    setTechs={setTechs}
                    errors={errors.technologies}
                    onFocus={() => {
                        setErrors({ ...errors, technologies: [] });
                    }}
                />
                {/* Roles */}
                <CreateRolesPanel
                    roles={roles}
                    setRoles={setRoles}
                    errors={errors.roles}
                    onFocus={() => {
                        setErrors({ ...errors, roles: [] });
                    }}
                />
                {/* Communications */}
                <CreateCommunicationsPanel
                    comms={comms}
                    setComms={setComms}
                    errors={errors.communications}
                    onFocus={() => {
                        setErrors({ ...errors, communications: [] });
                    }}
                />
                {/* Publish */}
                <Button large onClick={onPublish}>
                    Publish
                </Button>
            </div>
            <Modal show={showModal}>
                <div className="bg-gray-200 dark:bg-gray-700 flex flex-col p-4 pt-12 gap-12 rounded-lg">
                    <p className="text-center text-2xl font-semibold">
                        Project Successfully Created
                    </p>
                    <div className="flex flex-col gap-4">
                        <Button
                            large
                            onClick={() => {
                                setShowModal(false);
                                navigate("/profile");
                            }}
                        >
                            Go to Profile
                        </Button>
                        <Button
                            large
                            mode="secondary"
                            onClick={() => {
                                setShowModal(false);
                                navigate("/discover");
                            }}
                        >
                            Go to Discover
                        </Button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

export default CreatePage;
