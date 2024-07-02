// * titleText: string
// * placeholder: string
const TextArea = ({ titleText, placeholder, ...rest }) => {
	return (
		<div
			className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-900 rounded-md
			text-black dark:text-white poppins min-w-0 min-h-0"
		>
			<div className="flex items-center gap-1.5 text-lg">
				<p className="text-sm font-medium">{titleText}</p>
			</div>
			<div className="flex gap-2 items-center">
				<textarea
					className="grow poppins h-60 bg-transparent focus:outline-none text-base min-w-0 font-normal scroll-bar"
					placeholder={placeholder}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default TextArea;
