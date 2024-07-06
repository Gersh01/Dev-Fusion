import { useNavigate } from "react-router-dom";

const UserBubble = ({ userId, username, textSize }) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/profile/${userId}`);
    };

    return (
        <button
            className={`h-6 poppins px-1 text-white text-nowrap crimson-pro ${
                textSize ? textSize : "text-xl"
            } ${textSize} underline`}
            onClick={onClick}
        >
            {"@" + username}
        </button>
    );
};

export default UserBubble;
