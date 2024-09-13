const MemberCardPanel = ({ topContent, bottomContent }) => {
	return (
		<div
			className="flex flex-col text-black dark:text-white 
			drop-shadow-md"
		>
			{/* TOP */}
			<div className="bg-gray-200 dark:bg-gray-700 rounded-t-2xl">
				<div
					className="bg-gradient-to-r from-orange-400 to-orange-500 
	  				 dark:from-violet-600 dark:to-violet-700 
					rounded-t-2xl rounded-bl-2xl flex flex-col gap-2 p-2 sm:p-4"
				>
					{topContent}
				</div>
			</div>
			{/* BOTTOM */}
			<div
				className="bg-gradient-to-r from-orange-400 to-orange-500 
	  			 dark:from-violet-600 dark:to-violet-700 rounded-b-3xl"
			>
				<div
					className="bg-gray-200 dark:bg-gray-700 rounded-b-2xl rounded-tr-2xl 
					p-2 sm:p-4 flex flex-col gap-4 sm:gap-6"
				>
					{bottomContent}
				</div>
			</div>
		</div>
	);
};

export default MemberCardPanel;
