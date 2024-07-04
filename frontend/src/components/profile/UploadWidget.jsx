import { useEffect, useRef } from "react";
import { updateProfilePicture } from "../../pages/loaders/updateUser";
import Button from "../reusable/Button";
const UploadWidget = ({ id }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dlj2rlloi",
                uploadPreset: "jm7bfn0z",
                clientAllowedFormats: ["JPG", "PNG"],
                maxImageFileSize: 2000000,
                multiple: false,
                profile: ["profile"],
                sources: ["local"],
            },
            function (error, result) {
                if (result.info.url) {
                    updateProfilePicture(id, result.info.url);
                    window.location.reload();
                }
            }
        );
    }, []);

    return (
        <Button large onClick={() => widgetRef.current.open()}>
            Upload
        </Button>
    );
};

export default UploadWidget;
