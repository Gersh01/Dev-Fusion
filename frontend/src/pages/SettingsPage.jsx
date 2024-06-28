import Divider from "../components/reusable/Divider";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/DFLogoFinal.png";
import Button from "../components/reusable/Button";
import Input from "../components/reusable/Input";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  let res = useSelector((state) => state.user);
  const navigate = useNavigate();

  const doLogout = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      if (response) {
        navigate("/");
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const goResetPassword = () => {
    navigate("/reset-password");
  };

  const goAboutUs = () => {};

  console.log(res);
  return (
    <Fragment>
      <div
        className="flex justify-between items-end flex-wrap gap-y-8
					poppins text-4xl font-bold gap-x-6"
      >
        <p>Settings</p>
      </div>
      <Divider />
      <div className="flex gap-5">
        <div className="flex">
          <img className="max-h-28 max-w-28 rounded-full" src={logo}></img>
          <Button className="max-h-10">Edit</Button>
        </div>
      </div>
      <Divider />

      <div
        className="flex flex-col gap-6 grow 
					poppins text-4xl font-bold"
      >
        <p className="pt-8">Name</p>
        <div className="flex gap-8">
          <Input titleText="Firstname" value={res.firstName} />
          <Input titleText="Lastname" value={res.lastName} />
        </div>
        <Button large>Save</Button>
      </div>
      <Divider />

      <div
        className="flex flex-col gap-6 grow 
    poppins text-4xl font-bold"
      >
        <p className="pt-8">Display Mode</p>
      </div>
      <Divider />
      <div
        className="flex justify-between gap-6 
    poppins text-4xl font-bold"
      >
        <p className="pt-8">Password</p>
        <Button large mode="danger" onClick={goResetPassword}>
          Reset Password
        </Button>
      </div>
      <Button large mode="danger" onClick={doLogout}>
        Logout
      </Button>
      <Button large mode="secondary" onClick={goAboutUs}>
        About US
      </Button>
    </Fragment>
  );
};

export default SettingsPage;
