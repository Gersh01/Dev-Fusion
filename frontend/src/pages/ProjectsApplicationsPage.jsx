import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import ApplicationCardTile from "../components/application/ApplicationCardTile";
import Divider from "../components/reusable/Divider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MdArrowLeft } from "react-icons/md";

const ProjectsApplicationsPage = () => {
    const user = {
        username: "JamesS",
        userId: "667147a77d5f8d94a8a374c0",
        role: "Project Manager",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicinge lit. Dolorem ad quidem, sapiente placeat minus nonectetur adipisicinge lit. Dolorem ad quidem, sapiente placeat minus nonectetur adipisicinge lit. Dolorem ad quidem, sapiente placeat minus non",
    };

    const projectName = "IDK how we'll get this here???";
    const navigate = useNavigate();
    const loaderData = useLoaderData();

    const [applications, setApplications] = useState(loaderData.applications);
    const projectId = loaderData.projectId;

    console.log(projectId);

    // const renderedApplication = applications.map((applicant) => {
    //     return (
    //         <ApplicationCardTile
    //             key={application._id}
    //             applicant={applicant}
    //             projectId={projectId}
    //         ></ApplicationCardTile>
    //     );
    // });

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
            <div
                className="flex justify-between items-end flex-wrap gap-y-2 
				text-black dark:text-white poppins text-4xl font-bold gap-x-6"
            >
                <p> Applications</p>
            </div>
            <p className="text-2xl font-semibold">{projectName}</p>
            <Divider></Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12">
                <ApplicationCardTile
                    applicant={user}
                    projectId={projectId}
                ></ApplicationCardTile>
                <ApplicationCardTile
                    applicant={user}
                    projectId={projectId}
                ></ApplicationCardTile>
                <ApplicationCardTile
                    applicant={user}
                    projectId={projectId}
                ></ApplicationCardTile>
                <ApplicationCardTile
                    applicant={user}
                    projectId={projectId}
                ></ApplicationCardTile>
                <ApplicationCardTile
                    applicant={user}
                    projectId={projectId}
                ></ApplicationCardTile>
                <ApplicationCardTile
                    applicant={user}
                    projectId={projectId}
                ></ApplicationCardTile>
            </div>
        </Fragment>
    );
};

export default ProjectsApplicationsPage;
