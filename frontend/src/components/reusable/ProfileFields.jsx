import { Fragment } from "react";
import { useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { updateUser } from "../../pages/loaders/updateUser";
import { useSelector } from "react-redux";
import getUserFromJwt from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const ProfileFields = ({ type, title, info }) => {
  let res = useSelector((state) => state.user);
  const [mode, setMode] = useState(type);
  const [newInfo, setNewInfo] = useState(info);
  //const dispatch = useDispatch();

  const switchMode = () => {
    if (mode === false) {
      console.log(newInfo);
      updateUser(newInfo, res.id);
      //dispatch(setUser(getUserFromJwt()));
    }
    setMode(!mode);
  };

  return (
    <Fragment>
      <div className="flex justify-between">
        <span className="text-2xl font-semibold">{title}</span>
        <button onClick={switchMode}>
          {mode ? <BiSolidEdit /> : <MdOutlineSaveAlt />}
        </button>
      </div>
      <textarea
        className="flex w-full pt-3 h-full max-h-[250px] min-h-[250px] bg-transparent hover:outline-none"
        role="textbox"
        disabled={mode}
        onChange={(e) => setNewInfo(e.target.value)}
        defaultValue={res.bio}
      ></textarea>
    </Fragment>
  );
};

export default ProfileFields;
