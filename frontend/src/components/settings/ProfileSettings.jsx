import { useSelector } from "react-redux";
import CloudinaryUploadWidget from "../profile/CloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useState } from "react";
import UploadWidget from "../profile/UploadWidget";
const ProfileSettings = () => {
    const res = useSelector((state) => state.user);

    // const [publicId, setPublicId] = useState("");
    // const [cloudName] = useState("dlj2rlloi");
    // const [uploadPreset] = useState("ml_default");

    // const [uwConfig] = useState({
    //     cloudName,
    //     uploadPreset,
    //     cropping: true,
    //     folder: "DevFusion",
    //     maxImageFileSize: 2000000,
    // });
    // const cld = new Cloudinary({
    //     cloud: {
    //         cloudName,
    //     },
    // });

    // const myImage = cld.image(publicId);

    return (
        <div className="flex justify-between gap-4">
            <img className="h-28 w-28 rounded-full" src={res.link}></img>
            <div className="self-end">
                {/* <CloudinaryUploadWidget
                    uwConfig={uwConfig}
                    setPublicId={setPublicId}
                /> */}
                <UploadWidget id={res.id} />
            </div>
        </div>
    );
};

export default ProfileSettings;
