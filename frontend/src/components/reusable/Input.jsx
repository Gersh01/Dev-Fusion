import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

// * titleText: string
// * placeholder: string
// * icon: </>
// * password: boolean -> indicating whether an input is a password
const Input = ({ titleText, placeholder, icon, password = false, ...rest }) => {
	const [inputVisibility, setInputVisibility] = useState(password);

	return (
		<div
			className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-900 rounded-md
			text-black dark:text-white poppins min-w-0 min-h-0"
		>
			<div className="flex items-center gap-1.5 text-lg">
				{icon}
				<p className="text-sm font-medium">{titleText}</p>
			</div>
			<div className="flex gap-2 items-center">
				<input
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
	);
};

export default Input;
