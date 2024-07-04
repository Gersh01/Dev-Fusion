// * titleText: string
// * placeholder: string
const TextArea = ({ titleText, placeholder, errors, ...rest }) => {
	const renderedErrors = errors?.map((error) => {
		return (
			<li className="crimson-pro text-lg text-red-500" key={error}>
				{error}
			</li>
		);
	});

	return (
		<div className="flex flex-col">
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
			<ul className="px-2 list-inside list-none">{renderedErrors}</ul>
		</div>
	);
};

export default TextArea;
