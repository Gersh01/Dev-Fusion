import logo from "../../assets/DFLogoFinal.png";
import Button from "../reusable/Button";

const ProfileSettings = () => {
  return (
    <div className="flex justify-between gap-4">
      <img className="max-h-28 max-w-28 rounded-full" src={logo}></img>
      <div className="self-end">
        <input
          onChange={(e) => console.log(e.target.value)}
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
