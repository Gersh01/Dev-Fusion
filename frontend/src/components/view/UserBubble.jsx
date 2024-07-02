const UserBubble = ({ text }) => {
	return (
		<p
			className={`h-6 rounded-md poppins px-1 text-white text-nowrap flex 
			items-center rounded-l-md bg-gray-500 crimson-pro text-lg`}
		>
			{"@" + text}
		</p>
	);
};

export default UserBubble;
