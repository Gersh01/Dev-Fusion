import { Fragment, useEffect, useState } from "react";
import MemberCardPanel from "../reusable/MemberCardPanel";
import Button from "../reusable/Button";
import { useDispatch } from "react-redux";
import { updateMemberRole } from "../../store/slices/applicationSlice";
import { useLoaderData } from "react-router-dom";
import { updateTeamMembers } from "../../pages/loaders/projectLoader";
import { useNavigate } from "react-router-dom";
import {
    showRemoveModal,
    updateRemoveUser,
} from "../../store/slices/applicationSlice";

const ManageTeamTile = ({ possibleRoles, memberInfo }) => {
    const navigate = useNavigate();
    const dispacth = useDispatch();
    const username = memberInfo.username;
    const userId = memberInfo.userId;
    const role = memberInfo.role;
    const [newRole, setNewRole] = useState(role);
    const projectId = useLoaderData()?._id;
    const updateMembers = useLoaderData()?.teamMembers;

    const renderOptions = possibleRoles.map((role) => {
        return (
            <option key={role} value={role}>
                {role}
            </option>
        );
    });

    const topContent = (
        <p className="text-lg font-semibold text-white">{`@${username}`}</p>
    );

    useEffect(() => {
        if (!newRole && possibleRoles.length > 0) {
            setNewRole(possibleRoles[0]);
        }
        dispacth(updateMemberRole(newRole));
    }, [newRole]);

    const setNewTeamMemberRoles = () => {
        if (newRole != role) {
            let payload = {
                projectId: projectId,
                teamMembers: [],
            };
            let newMemberRoles = updateMembers;

            newMemberRoles.map((member) => {
                if (member.username === username) {
                    member.role = newRole;
                }
                payload.teamMembers.push(member);
            });
            if (updateTeamMembers?.(payload)) {
                navigate(0);
            }
        }
    };

    const removeTeamMember = () => {
        dispacth(updateRemoveUser(username));
        dispacth(showRemoveModal(true));
    };

    const bottomContent = (
        <Fragment>
            <div className="flex gap-2">
                <p className="poppins">Current Role:</p>
                <p className="poppins font-bold">{role}</p>
            </div>
            <div className="flex gap-2">
                <p>Change Role:</p>
                <select
                    className="flex-auto flex max-w-44 bg-gray-200 dark:bg-gray-800 rounded-md px-1 focus:outline-none
					gap-2 items-center"
                    aria-label="role selection dropdown"
                    value={newRole}
                    onChange={(e) => {
                        setNewRole(e.target.value);
                    }}
                >
                    {renderOptions}
                </select>
            </div>
            <div className="flex justify-end gap-2">
                <Button mode={"safe"} onClick={setNewTeamMemberRoles}>
                    Update
                </Button>
                <Button mode={"danger"} onClick={removeTeamMember}>
                    Remove
                </Button>
            </div>
        </Fragment>
    );

    return (
        <MemberCardPanel
            topContent={topContent}
            bottomContent={bottomContent}
            key={userId}
        />
    );
};

export default ManageTeamTile;
