import { useState } from "react";
import { Fragment } from "react";
import Bubble from "./Bubble";
import SearchField from "./SearchField";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { getTechnology } from "../../utils/utility";
import TechnologySearchField from "./TechnologySearchField";

const TechnologiesField = ({ technologies, title, type }) => {
  let res = useSelector((state) => state.user);
  const [mode, setMode] = useState(type);
  const [newTech, setNewTech] = useState(technologies);
  const dispatch = useDispatch();

  const switchMode = () => {
    if (mode === false) {
      // dispatch(updateBio(newInfo));
      //updateUser(newInfo, res.id);
    }
    //getTechnology("p");
    setMode(!mode);
  };

  const bubbleMode = () => {
    if (mode === false) {
      return (
        <Fragment>
          {res.technologies.map((value) => (
            <Bubble removable text={value} key={value} />
          ))}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {res.technologies.map((value) => (
            <Bubble text={value} key={value} />
          ))}
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">{title}</p>
        <button className="" onClick={switchMode}>
          {mode ? <BiSolidEdit /> : <MdOutlineSaveAlt />}
        </button>
      </div>
      <div className="flex min-w-[100px]">
        {mode ? null : <TechnologySearchField />}
      </div>
      <div className="flex gap-2 pt-4 flex-wrap">{bubbleMode()}</div>
    </Fragment>
  );
};

export default TechnologiesField;
