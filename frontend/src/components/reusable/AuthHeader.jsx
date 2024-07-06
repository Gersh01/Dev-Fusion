const AuthHeader = ({ title }) => {
	return (
		<div className="flex flex-col justify-center items-center gap-2.5 ">
			<div className="text-orange-400 dark:text-violet-600 text-4xl font-semibold league-spartan">
				DevFusion
			</div>
			<div data-testid="title" className="text-black dark:text-white text-lg font-semibold font-family-Poppins">
				{title}
			</div>
		</div>
	);
};

export default AuthHeader;
