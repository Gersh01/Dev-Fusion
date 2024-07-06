import { useNavigate } from "react-router-dom";

const UserBubble = ({ text, userId }) => {
    const navigate = useNavigate();
    return (
        <button
            // onClick={() => navigate(`/profile/${userId}`)}'
            onClick={() => navigate("/profiles")}
            className={`h-8 rounded-md poppins px-2 text-white text-nowrap flex 
					items-center rounded-l-md bg-gray-500`}
        >
            {text}
        </button>
    );
};

export default UserBubble;
