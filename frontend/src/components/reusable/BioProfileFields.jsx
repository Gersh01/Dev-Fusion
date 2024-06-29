import { Fragment } from "react";
import { useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { updateUser } from "../../pages/loaders/updateUser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateBio } from "../../store/slices/userSlice";

const BioProfileFields = ({ type, title, info }) => {
  let res = useSelector((state) => state.user);
  const [mode, setMode] = useState(type);
  const [newInfo, setNewInfo] = useState(info);
  const dispatch = useDispatch();

  const switchMode = () => {
    if (mode === false) {
      dispatch(updateBio(newInfo));
      updateUser(newInfo, res.id);
    }
    setMode(!mode);
  };

  return (
    <Fragment>
      <div className="flex justify-between">
        <span className="text-2xl font-semibold ">{title}</span>
        <button onClick={switchMode}>
          {mode ? <BiSolidEdit /> : <MdOutlineSaveAlt />}
        </button>
      </div>
      <textarea
        className="flex w-full pt-3 h-full max-h-[250px] min-h-[250px] bg-transparent "
        role="textbox"
        disabled={mode}
        onChange={(e) => setNewInfo(e.target.value)}
        defaultValue={res.bio}
      ></textarea>
    </Fragment>
  );
};

export default BioProfileFields;
