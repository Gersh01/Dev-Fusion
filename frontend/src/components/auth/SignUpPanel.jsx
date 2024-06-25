import AuthHeader from "../reusable/AuthHeader";
import Input from "../reusable/Input";
import { MdAccountCircle, MdLockOpen, MdEmail } from "react-icons/md";
import Button from "../reusable/Button";
import AuthPanel from "../reusable/AuthPanel";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";

const SignUpPanel = () => {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  );

  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    const currentErrors = [...errors, error];
    const listErrors = Array.from(new Set(currentErrors));
    setErrors(listErrors);
  };

  const renderError = errors.map((error) => {
    console.log(errors);
    return <li key={error}>{error}</li>;
  });

  const doRegister = async (e) => {
    if (
      fisrtName !== "" &&
      lastName !== "" &&
      username !== "" &&
      password !== "" &&
      email !== ""
    ) {
      setErrors([]);
      if (validEmail.test(email)) {
        console.log("Password is correct: " + password);
      }
    } else {
      addError("Field is missing");
    }
  };

  const goToLogin = () => {
    window.location.href = "/login";
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
        />
      </div>
      <div className="h-30flex flex-col grow text-white ">
        <ul>{renderError}</ul>
        <PasswordChecklist
          rules={["capital", "specialChar", "minLength", "number"]}
          minLength={8}
          value={password}
        />
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

export default SignUpPanel;
