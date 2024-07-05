import { Fragment, useEffect, useState } from "react";
import ApplicationCardTile from "../components/application/ApplicationCardTile";
import Divider from "../components/reusable/Divider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MdArrowLeft } from "react-icons/md";

const ProjectsApplicationsPage = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const [applications, setApplications] = useState(
        loaderData.project.appliedUsers
    );
    const projectTitle = loaderData.project.projectTitle;
    const projectId = loaderData.projectId;

    if (!applications) {
        return null;
    }

    const renderedApplication = applications.map((applicant) => {
        return (
            <ApplicationCardTile
                key={applicant._id}
                applicant={applicant}
                projectId={projectId}
            ></ApplicationCardTile>
        );
    });

    useEffect(() => {
        setApplications(loaderData.project.appliedUsers);
    }, [loaderData.project.appliedUsers]);

    const emptyApplications = () => {
        return (
            <p className="text-3xl text-center league-spartan semi-bold">
                There are no applications at this time...
            </p>
        );
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
            <div
                className="flex justify-between items-end flex-wrap gap-y-2 
				text-black dark:text-white poppins text-4xl font-bold gap-x-6"
            >
                <p>Applications</p>
            </div>
            <p className="text-3xl">{projectTitle}</p>
            <Divider></Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12">
                {renderedApplication}
            </div>
            {applications.length === 0 ? emptyApplications() : null}
        </Fragment>
    );
};

export default ProjectsApplicationsPage;
