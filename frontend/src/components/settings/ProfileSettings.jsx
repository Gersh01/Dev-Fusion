import { useSelector } from "react-redux";

const ProfileSettings = () => {
    const res = useSelector((state) => state.user.link);
    console.log(res);
    return (
        <div className="flex justify-between gap-4">
            <img className="h-28 w-28 rounded-full" src={res}></img>
            <div className="self-end">
                <input
                    onChange={(e) => console.log(e.target.value)}
                    type="file"
                    accept="image/png, image/jpeg"
                    name="profile-file"
                />
            </div>
        </div>
    );
};

export default ProfileSettings;
