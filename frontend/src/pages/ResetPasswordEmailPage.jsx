import { MdMailOutline } from "react-icons/md";
import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";
import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import Axios from "axios";

const ResetPasswordEmailPage = () => {
  const [email, setEmail] = useState("");
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
  );

  const sendResetPasswordRequest = async () => {
    if (validEmail.test(email)) {
      const payload = { email: email };
      try {
        await Axios.post(
          "http://localhost:5000/api/forgot_password/send",
          payload,
          { withCredentials: true }
        );
        console.log("DEBUG: Sent Payload");
        console.log(payload);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    } else {
      console.log("Email is not a valid");
    }
  };

  return (
    <AuthPanel width={480} minHeight={500}>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="league-spartan dark:text-white text-2xl font-semibold">
          Reset Password
        </p>
        <p className="poppins dark:text-white">
          Enter your email to reset your password
        </p>
      </div>
      <Input
        titleText="Email"
        placeholder="Email"
        icon={<MdMailOutline />}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button large onClick={sendResetPasswordRequest}>
        Submit
      </Button>
    </AuthPanel>
  );
};

export default ResetPasswordEmailPage;
