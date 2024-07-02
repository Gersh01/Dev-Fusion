import React, { Fragment } from "react";
import Button from "../components/reusable/Button";

const ProjectsApplicationsPage = () => {
    return (
        <Fragment>
            <div className="dark:bg-gray-700 w-[300px] h-[250px] align-middle rounded-2xl p-4 bg-gray-200">
                <div className="flex justify-between">
                    <p className="flex align-middle">Username</p>
                    <div className="flex gap-2">
                        <Button mode="safe">Accept</Button>
                        <Button mode="danger">Deny</Button>
                    </div>
                </div>
                <p>Role</p>
                <div className="ov scroll-bar">
                    <span className="flex">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolorem ad quidem, sapiente placeat minus non. Magnam
                        sunt, corrupti tempora voluptas... sunt, corrupti
                        tempora volu
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default ProjectsApplicationsPage;
