import { useNavigate } from "react-router-dom";

const UserBubble = ({ userId, username, textSize }) => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate(`/profile/${userId}`);
	};

	return (
		<button
			className={`h-6 poppins px-1 text-nowrap crimson-pro ${
				textSize ? textSize : "text-xl"
			} ${textSize} underline underline-offset-8`}
			onClick={onClick}
		>
			{"@" + username}
		</button>
	);
};

export default UserBubble;
