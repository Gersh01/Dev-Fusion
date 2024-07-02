import AuthHeader from "../components/reusable/AuthHeader";
import Input from "../components/reusable/Input";
import { MdAccountCircle, MdLockOpen, MdEmail } from "react-icons/md";
import Button from "../components/reusable/Button";
import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { apiDomain } from "../utils/utility";
import { setVerificationEmail } from "../store/slices/systemSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  );
  const validPassword = new RegExp(
    "(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])(?=.{8,})"
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordField, setPasswordField] = useState(false);

  const goToLogin = () => {
    navigate("/login");
  };

  const doRegister = async (e) => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      password !== "" &&
      email !== ""
    ) {
      console.log(validPassword.test(password));
      setErrorMessage("");
      if (!validEmail.test(email)) {
        setErrorMessage("Email is incorrect");
      } else if (!validPassword.test(password)) {
        setErrorMessage("Password does not follow the correct format");
      } else if (validEmail.test(email) && validPassword.test(password)) {
        const newSignup = {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
          email: email,
        };
        try {
          const response = await Axios.post(
            apiDomain + "/api/register",
            newSignup
          );
          console.log(response.status);
          if (response && response.status === 201) {
            console.log("Positive respose");
            console.log(email);
            dispatch(setVerificationEmail(email));
            console.log("Dispatched");
            navigate("/email-verification");
          }
        } catch (err) {
          let errorMessage = err.response.data.error;
          if (errorMessage === "email is taken") {
            setErrorMessage("Email is already taken");
          } else if (errorMessage === "username is taken") {
            setErrorMessage("Username is already taken");
          }
        }
      }
    } else {
      setErrorMessage("One or more fields is missing valid data");
    }
  };
  const showPasswordField = () => {
    setPasswordField(true);
  };
  const hidePasswordField = () => {
    setPasswordField(false);
  };

  return (
    <AuthPanel width={480} minHeight={750}>
      <AuthHeader title="Sign Up" />
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 min-w-0">
          <Input
            titleText="First Name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            titleText="Last Name"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Input
          titleText="Username"
          placeholder="Username"
          icon={<MdAccountCircle />}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          titleText="Email"
          placeholder="Email"
          icon={<MdEmail />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          titleText="Password"
          placeholder="Password"
          icon={<MdLockOpen />}
          password
          onChange={(e) => setPassword(e.target.value)}
          onFocus={showPasswordField}
          onBlur={hidePasswordField}
        />
        <div className="grid ">
          <div className="h-5 flex justify-ceneter dark:text-white text-sm poppins">
            <span>{errorMessage}</span>
          </div>
          <div className=" h-16 flex flex-col grow dark:text-white text-sm">
            {passwordField && (
              <PasswordChecklist
                className="poppins"
                rules={["capital", "specialChar", "minLength", "number"]}
                minLength={8}
                value={password}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button large onClick={doRegister}>
          Sign Up
        </Button>
        <hr></hr>
        <button
          className="text-black dark:text-white text-sm font-medium poppins"
          onClick={goToLogin}
        >
          Login instead
        </button>
      </div>
    </AuthPanel>
  );
};

export default SignUpPage;
