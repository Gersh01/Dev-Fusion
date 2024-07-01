import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import Input from "../components/reusable/Input";
import { MdLockOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import Button from "../components/reusable/Button";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const validPassword = new RegExp(
    "(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])(?=.{8,})"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordField, setPasswordField] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showPasswordField = () => {
    setPasswordField(true);
  };
  const hidePasswordField = () => {
    setPasswordField(false);
  };

  const goLogin = () => {
    // navigate("/login");
  };

  return (
    // <div className="w-[450px] h-[500px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
    <AuthPanel width={480} minHeight={600} passwordFieldHeight={800}>
      <p className="text-center text-2xl font-semibold league-spartan dark:text-white">
        Reset Password
      </p>
      <div className="flex flex-col gap-2">
        <Input
          titleText="Password"
          placeholder="Password"
          icon={<MdLockOpen />}
          password
          onChange={(e) => setPassword(e.target.value)}
          onFocus={showPasswordField}
          onBlur={hidePasswordField}
        />
        <Input
          titleText="Confirm Password"
          placeholder="Confirm Password"
          icon={<MdLockOpen />}
          password
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={showPasswordField}
          onBlur={hidePasswordField}
        />
      </div>
      <div className="self-stretch h-[78px] flex-col justify-center items-center gap-2.5 flex">
        <Button large>Reset Password</Button>
        <div className=" h-[100px] bg-white flex flex-col grow dark:text-white text-sm">
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
    </AuthPanel>
  );
};

export default ResetPasswordPage;
