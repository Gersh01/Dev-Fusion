import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import { updateUserName } from "../../pages/loaders/updateUser";
import {
  updateUsersFirstName,
  updateUsersLastName,
} from "../../store/slices/userSlice";

const NameSettings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.firstName && user.lastName) {
      setFirstNameInput(user.firstName);
      setLastNameInput(user.lastName);
    }
  }, [user]);

  const setNewUserName = () => {
    if (firstNameInput && lastNameInput) {
      setError(false);
      dispatch(updateUsersFirstName(firstNameInput));
      dispatch(updateUsersLastName(lastNameInput));
      updateUserName(user.id, firstNameInput, lastNameInput);
    } else {
      setError(true);
    }
  };

  const displayError = () => {
    if (error) {
      return <p>First or Last name field is missing a value</p>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Name</p>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-2">
        <Input
          titleText="First Name"
          value={firstNameInput}
          onChange={(e) => {
            setFirstNameInput(e.target.value);
          }}
        />
        <Input
          titleText="Last Name"
          value={lastNameInput}
          onChange={(e) => {
            setLastNameInput(e.target.value);
          }}
        />
      </div>
      <div className="flex h-3">{displayError()}</div>
      <div className="self-end">
        <Button large onClick={setNewUserName}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default NameSettings;
