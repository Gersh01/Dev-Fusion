const NavButton = ({ icon, text }) => {
	return (
		<button
			className="bg-transparent w-16 flex flex-col justify-center items-center hover:bg-black/20
			text-black dark:text-white"
		>
			<div className="text-2xl">{icon}</div>
			<p className="poppins font-semibold text-xs">{text}</p>
		</button>
	);
};

export default NavButton;
