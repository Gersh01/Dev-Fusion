const UserBubble = ({ text }) => {
	return (
		<p
			className={`h-8 rounded-md poppins px-2 text-white text-nowrap flex 
					items-center rounded-l-md bg-gray-500`}
		>
			{text}
		</p>
	);
};

export default UserBubble;
