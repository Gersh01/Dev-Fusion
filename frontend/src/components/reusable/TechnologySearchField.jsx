import React, { Fragment, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { getTechnology } from "../../utils/utility";
import userSlice from "../../store/slices/userSlice";

const TechnologySearchField = () => {
  const [newTech, setNewTech] = useState("");
  const [techList, setTechList] = useState(getTechnology(newTech));

  const getOptions = () => {
    console.log("techlist");
    console.log(techList);
    return techList.map((value) => {
      <option key={value} value={value}>
        {value}
      </option>;
    });
  };

  return (
    <Fragment>
      <div className="flex">
        <div className="flex gap-1">
          <input
            type="text"
            className="flex focus:outline-none text-black poppins"
            placeholder="Search"
            onChange={(e) => {
              setNewTech(e.target.value);
              setTechList(getTechnology(e.target.value));
            }}
          ></input>

          <select
            className="w-40 bg-gray-200 dark:bg-gray-800 rounded-md px-1 focus:outline-none
				flex gap-2 items-center"
          >
            {getOptions()}
            <option>test</option>
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default TechnologySearchField;
