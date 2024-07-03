import { useState } from "react";
import { getTechnology } from "../../utils/utility";
import { MdAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateUserTechnology } from "../../pages/loaders/updateUser";
import { updateTechnologies } from "../../store/slices/userSlice";

const TechnologySearchField = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [techList, setTechList] = useState(getTechnology(""));
  const [newTech, setNewTech] = useState("");

  const renderedTechnologiesOptions = techList.map((value) => {
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  });

  const addNewTechnology = () => {
    if (newTech.length === 0 || user.technologies.includes(newTech)) {
      return;
    }

    let updatedTechnologies = [...user.technologies, newTech];

    dispatch(updateTechnologies(updatedTechnologies));

    updateUserTechnology(user.id, updatedTechnologies);
  };

  return (
    <div className="flex gap-2">
      {/* <div className="flex min-w-[100px] gap-2"> */}
      <input
        className="grow min-w-0 bg-gray-500 rounded-md px-2 focus:outline-none text-white poppins"
        type="text"
        placeholder="Type to search"
        onChange={(e) => {
          const res = getTechnology(e.target.value);
          setTechList(res);
          setNewTech(res[0]);
        }}
      ></input>

      <select
        className="w-40 bg-gray-200 dark:bg-gray-800 rounded-md px-1 focus:outline-none
				gap-2 items-center"
        value={newTech}
        onChange={(e) => setNewTech(e.target.value)}
      >
        {renderedTechnologiesOptions}
      </select>
      <button onClick={addNewTechnology}>
        <MdAdd className="text-2xl" />
      </button>
      {/* </div> */}
    </div>
  );
};

export default TechnologySearchField;
