import ApplicationCardPanel from "./ApplicationCardPanel";
import UserBubble from "../view/UserBubble";
import { Fragment } from "react";
import Button from "../reusable/Button";
import {
    applicationAccept,
    applicationDeny,
} from "../../pages/loaders/applicationLoader";

const ApplicationCardTile = ({ applicant, projectId }) => {
    console.log(applicant);
    const username = applicant.username;
    const id = applicant.userId;
    const description = applicant.description;
    const role = applicant.role;

    const acceptApplication = (userId, role) => {
        const payload = { projectId: projectId, userId: userId, role: role };
        if (applicationAccept?.(payload) === 200) {
            window.location.reload();
        }
    };

    const denyApplication = (userId, role) => {
        const payload = { projectId: projectId, userId: userId, role: role };
        if (applicationDeny?.(payload) === 200) {
            window.location.reload();
        }
    };

    const topContent = (
        <Fragment>
            <p className="league-spartan text-2xl font-semibold">{role}</p>
            <div className="flex justify-between">
                <UserBubble userId={id} username={username}></UserBubble>
                <div className="flex gap-2">
                    <Button
                        mode={"safe"}
                        onClick={() => {
                            acceptApplication(id, role);
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        mode={"danger"}
                        onClick={() => {
                            denyApplication(id, role);
                        }}
                    >
                        Deny
                    </Button>
                </div>
            </div>
        </Fragment>
    );

    const bottomContent = (
        <Fragment>
            <div className="h-[150px] overflow-y-scroll scroll-bar">
                {description}
            </div>
        </Fragment>
    );

    return (
        <ApplicationCardPanel
            key={id}
            topContent={topContent}
            bottomContent={bottomContent}
        ></ApplicationCardPanel>
    );
};

export default ApplicationCardTile;
