import Divider from "../components/reusable/Divider";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/DFLogoFinal.png";

const ProfilePage = () => {
  let res = useSelector((state) => state.user);

  return (
    <Fragment>
      <div
        className="flex justify-between items-end flex-wrap gap-y-2 
					text-black dark:text-white poppins text-4xl font-bold gap-x-6"
      >
        <p>Profile</p>
      </div>
      <Divider />
      <div className="flex flex-row gap-4">
        <img className="max-h-14 max-w-14 rounded-full" src={logo}></img>
        <span className="bg-white text-3xl font-bold poppins text-center text-black">
          {res.username}
        </span>
      </div>
      <div className="flex flex-row gap-10">
        <div className="bg-white h-[300px] w-[300px]"></div>
        <div className="bg-white h-[300px] w-[300px]"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-6"></div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8"></div>
    </Fragment>
  );
};

export default ProfilePage;
