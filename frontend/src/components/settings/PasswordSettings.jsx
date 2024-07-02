import { useNavigate } from "react-router-dom";
import Button from "../reusable/Button";
import Axios from "axios";

const PasswordSettings = () => {
  const navigate = useNavigate();

  const resetPassword = async () => {
    try {
      const response = await Axios.put(
        "http://localhost:5000/api/users/password",
        {},
        { withCredentials: true }
      );
      if (response) {
        console.log("Debug: Token was successfully given");
        navigate("/reset-password");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <p className="text-2xl font-semibold">Password</p>
      <Button large mode="danger" onClick={resetPassword}>
        Reset Password
      </Button>
    </div>
  );
};

export default PasswordSettings;
