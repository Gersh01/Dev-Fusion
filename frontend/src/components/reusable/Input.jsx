import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// * titleText: string
// * placeholder: string
// * icon: </>
// * password: boolean -> indicating whether an input is a password
const Input = ({
	titleText,
	placeholder,
	icon,
	password = false,
	errors, // * Errors to display
	...rest
}) => {
	const [inputVisibility, setInputVisibility] = useState(password);

	const renderedErrors = errors?.map((error) => {
		return (
			<li className="crimson-pro text-lg text-red-500" key={error}>
				{error}
			</li>
		);
	});

	return (
		<div className="flex flex-col drop-shadow-lg">
			{/* Input */}
			<div
				className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-900 rounded-md
				text-black dark:text-white poppins min-w-0 min-h-0"
			>
				<div className="flex items-center gap-1.5 text-lg">
					{icon}
					<p data-testid="title-text" className="text-sm font-medium">
						{titleText}
					</p>
				</div>
				<div className="flex gap-2 items-center">
					<input
						data-testid="input"
						aria-label="input field"
						className="grow poppins bg-transparent focus:outline-none text-base min-w-0 font-normal"
						type={inputVisibility ? "password" : "text"}
						placeholder={placeholder}
						{...rest}
					/>
					{password && (
						<div
							className="text-lg hover:cursor-pointer"
							onClick={() => setInputVisibility(!inputVisibility)}
						>
							{inputVisibility ? (
								<MdVisibilityOff />
							) : (
								<MdVisibility />
							)}
						</div>
					)}
				</div>
			</div>
			{/* Errors */}
			<ul className="px-2 list-inside list-none">{renderedErrors}</ul>
		</div>
	);
};

export default Input;
