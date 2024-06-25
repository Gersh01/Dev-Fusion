import AuthHeader from "../reusable/AuthHeader";
import { MdAccountCircle, MdLockOpen } from "react-icons/md";
import { useState } from "react";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import AuthPanel from "../reusable/AuthPanel";
import Axios from "axios";

const LoginPanel = () => {
  // * Keeps track of remember me
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState([]);

  const goToRegister = () => {
    window.location.href = "/signup";
  };

  const addError = (error) => {
    const currentErrors = [...errors, error];
    const listErrors = Array.from(new Set(currentErrors));
    setErrors(listErrors);
  };

  const loginSuccess = (user) => {
    setUser(user);
  };
  const doLogin = async (e) => {
    if (username !== "" && password !== "") {
      setErrors([]);
      e.preventDefault();
      const newLogin = { login: username, password: password };
      try {
        const response = await Axios.post(
          "http://localhost:5000/api/login",
          newLogin
        );
        if (response && response.data) {
          loginSuccess(response.data);
        }
        console.log(user);
      } catch (err) {
        console.log(newLogin);
        console.log("Error: ${err.message}");
      }
    } else {
      addError("Missing field");
    }
  };

  const renderError = errors.map((error) => {
    return <li key={error}>{error}</li>;
  });

  return (
    // <div className="w-[480px] min-h-[750px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
    <AuthPanel width={480} minHeight={750}>
      <AuthHeader title="Login" />
      <div className="flex flex-col gap-2">
        <Input
          titleText="First Name"
          icon={<MdAccountCircle />}
          placeholder="First Name"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          titleText="Password"
          placeholder="Password"
          icon={<MdLockOpen />}
          password
          onChange={(e) => setPassword(e.target.value)}
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
          <button className="text-black dark:text-white poppins">
            Forgot Password
          </button>
        </div>
      </div>
      <div className="h-10 flex text-white ">
        <ul>{renderError}</ul>
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
    </AuthPanel>
  );
};

export default LoginPanel;
