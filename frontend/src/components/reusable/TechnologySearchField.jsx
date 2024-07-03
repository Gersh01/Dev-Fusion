import { Fragment, useState } from "react";
import { getTechnology } from "../../utils/utility";
import { MdAdd } from "react-icons/md";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUserTechnology } from "../../pages/loaders/updateUser";
import { updateTechnologies } from "../../store/slices/userSlice";

const TechnologySearchField = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [techList, setTechList] = useState(getTechnology(""));
  const [newTech, setNewTech] = useState("");
  const [existingTech, setExistingTech] = useState(user.technologies);

  const renderedTechnologiesOptions = techList.map((value) => {
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  });

  const addNewTechnology = () => {
    console.log(existingTech);
    let array = existingTech.concat(newTech);
    dispatch(updateTechnologies(array));
    updateUserTechnology(user.id, array);
    console.log(array);
  };
  return (
    <Fragment>
      <div className="flex flex-auto min-w-[100px]">
        <div className="flex min-w-[100px] gap-1">
          <input
            type="text"
            className="flex min-w-[100px] focus:outline-none text-black poppins"
            placeholder="Search"
            onChange={(e) => {
              setTechList(getTechnology(e.target.value));
            }}
          ></input>

          <select
            className="w-40 bg-gray-200 dark:bg-gray-800 rounded-md px-1 focus:outline-none
						flex gap-2 items-center"
            onChange={(e) => setNewTech([e.target.value])}
          >
            {renderedTechnologiesOptions}
          </select>
          <button onClick={addNewTechnology}>
            <MdAdd />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TechnologySearchField;
