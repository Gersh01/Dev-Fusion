import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import Input from "../components/reusable/Input";
import { MdLockOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import Button from "../components/reusable/Button";
import Axios from "axios";

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

  const resetPassword = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage("One or more fields are missing a value");
    } else {
      if (validPassword.test(password) && password === confirmPassword) {
        console.log("sending password" + password);
        const payload = { newPassword: password };
        try {
          console.log("Debug: Payload Sent");
          console.log(payload);
          await Axios.post(
            "http://localhost:5000/api/forgot_password/reset",
            payload,
            { withCredentials: true }
          );
          if (payload) {
            console.log("Password has been changed successfully");
          }
        } catch (err) {
          console.log(`Error: ${err.message}`);
          setErrorMessage("There was an error when changing the password");
        }
      }
    }
  };

  return (
    // <div className="w-[450px] h-[500px] p-7 bg-gray-100 dark:bg-gray-800 rounded-3xl flex flex-col justify-center gap-12">
    <AuthPanel width={480} minHeight={600} passwordFieldHeight={800}>
      <p className="text-center text-2xl font-semibold league-spartan dark:text-white">
        Reset Password
      </p>
      <div className="flex flex-col gap-4">
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
        <div>
          <p>{errorMessage}</p>
          <div className=" h-[120px] flex flex-col grow dark:text-white text-sm">
            {passwordField && (
              <PasswordChecklist
                className="poppins"
                rules={[
                  "capital",
                  "specialChar",
                  "minLength",
                  "number",
                  "match",
                ]}
                minLength={8}
                valueAgain={confirmPassword}
                value={password}
              />
            )}
          </div>
        </div>
      </div>
      <Button onClick={resetPassword} large>
        Reset Password
      </Button>
    </AuthPanel>
  );
};

export default ResetPasswordPage;
