import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../../store/slices/applicationSlice";

const CreateRolesSelectionPanel = ({ projectRoles }) => {
    const test = useSelector((state) => state.application.role);

    const [roleList, setRoleList] = useState(projectRoles);
    const [role, setRole] = useState("");
    const dispacth = useDispatch();

    const renderedRoleOptions = roleList.map((role) => {
        let value = role.role;
        return (
            <option key={value} value={value}>
                {value}
            </option>
        );
    });

    useEffect(() => {
        dispacth(updateRole(role));
    }, [role]);

    return (
        <div className="flex gap-2">
            {/* <div className="flex min-w-[100px] gap-2"> */}
            <p>Select your role:</p>
            <select
                className="w-40 bg-gray-200 dark:bg-gray-800 rounded-md px-1 focus:outline-none
				gap-2 items-center"
                value={role}
                onChange={(e) => {
                    setRole(e.target.value);
                }}
            >
                {renderedRoleOptions}
            </select>
            {/* </div> */}
        </div>
    );
};

export default CreateRolesSelectionPanel;
