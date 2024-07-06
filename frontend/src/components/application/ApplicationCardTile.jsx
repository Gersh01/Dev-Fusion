import MemberCardPanel from "../reusable/MemberCardPanel";
import UserBubble from "../view/UserBubble";
import { Fragment } from "react";
import Button from "../reusable/Button";
import {
    applicationAccept,
    applicationDeny,
} from "../../pages/loaders/applicationLoader";
import { useNavigate } from "react-router-dom";

const ApplicationCardTile = ({ applicant, projectId }) => {
    const username = applicant.username;
    const id = applicant.userId;
    const description = applicant.description;
    const role = applicant.role;
    const navigate = useNavigate();

    const acceptApplication = (userId, role) => {
        const payload = { projectId: projectId, userId: userId, role: role };
        applicationAccept(payload);
        navigate(0);
    };

    const denyApplication = (userId, role) => {
        const payload = { projectId: projectId, userId: userId, role: role };
        applicationDeny(payload);
        navigate(0);
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
        <MemberCardPanel
            key={id}
            topContent={topContent}
            bottomContent={bottomContent}
        ></MemberCardPanel>
    );
};

export default ApplicationCardTile;
