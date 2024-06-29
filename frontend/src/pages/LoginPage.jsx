import AuthHeader from "../components/reusable/AuthHeader";
import { MdAccountCircle, MdLockOpen } from "react-icons/md";
import { useState } from "react";
import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";
import AuthPanel from "../components/reusable/AuthPanel";
import Axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // * Keeps track of remember me
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setUserInput] = useState([]);

  const goToRegister = () => {
    navigate("/signup");
  };

  const goToResetPassword = () => {
    navigate("/reset-password-email");
  };
  //POST for Login API
  //uses the err.response.data.error to distinguish between error codes
  const doLogin = async (e) => {
    setErrorMessage("");
    if (userInput !== "" && passwordInput !== "") {
      e.preventDefault();
      const newLogin = {
        login: userInput,
        password: passwordInput,
        rememberMe: rememberMe,
      };
      try {
        console.log(newLogin);
        const response = await Axios.post(
          "http://localhost:5000/api/login",
          newLogin,
          { withCredentials: true }
        );
        console.log(response);
        if (response && response.data) {
          dispatch(setUser(response.data));
          navigate("/discover");
        }
      } catch (err) {
        let errorMessage = err.response.data.error;
        console.log(`Error: ${err.message}`);
        console.log(errorMessage);
        if (errorMessage === "User is not verified") {
          navigate("/email-verification");
        } else {
          setErrorMessage("Username/Password is incorrect");
        }
      }
    } else {
      setErrorMessage("One or more fields is missing valid data");
    }
  };

  return (
    // <div className="w-[480px] min-h-[750px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
    <AuthPanel width={480} minHeight={750}>
      <AuthHeader title="Login" />
      <div className="flex flex-col gap-2">
        <Input
          titleText="First Name"
          icon={<MdAccountCircle />}
          placeholder="First Name"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Input
          titleText="Password"
          placeholder="Password"
          icon={<MdLockOpen />}
          password
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <div className="flex justify-between">
          <div className="flex gap-1 items-center poppins">
            <input
              className="h-4 aspect-square"
              type="checkbox"
              onChange={(event) => {
                setRememberMe(event.target.checked);
              }}
            />
            <p className="text-black dark:text-white">Remember Me</p>
          </div>
          <button
            className="text-black dark:text-white poppins"
            onClick={goToResetPassword}
          >
            Forgot Password
          </button>
        </div>
        <div className="h-5 flex justify-ceneter text-black dark:text-white text-md poppins">
          <span>{errorMessage}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={doLogin} large>
          Login
        </Button>
        <hr></hr>
        <button
          className="text-black dark:text-white text-sm font-medium poppins"
          onClick={goToRegister}
        >
          Sign up instead
        </button>
      </div>
      <Outlet />
    </AuthPanel>
  );
};

export default LoginPage;
