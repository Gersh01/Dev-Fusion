import { useEffect, useRef } from "react";
import { updateProfilePicture } from "../../pages/loaders/updateUser";
const UploadWidget = ({ id }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dlj2rlloi",
                uploadPreset: "jm7bfn0z",
            },
            function (error, result) {
                if (result.info.url) {
                    updateProfilePicture(id, result.info.url);
                    window.location.reload();
                }
            }
        );
    }, []);

    return <button onClick={() => widgetRef.current.open()}>Upload</button>;
};

export default UploadWidget;
