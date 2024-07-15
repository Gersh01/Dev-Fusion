import {
	MdOutlineAdd,
	MdRemove,
	MdRemoveCircleOutline,
	MdLaunch,
} from "react-icons/md";
import { Fragment } from "react";
import { getBubbleColor } from "../../utils/utility";
import { sanitizeLink } from "../../utils/sanitation";

const Bubble = ({
	text, // * Title
	countable, // * Make bubble increment or decrement in count
	count, // * Control current count
	onCountChange, // * Event listener when count is changed
	writable, // * Make bubble writable
	useTextArea, // * Use textarea for writing instead of input
	useContainer, // * Shows a div showing content
	children, // * Control current content contained within div content
	input, // * Control input or textarea data
	onTextAreaChange, // * Event listener when input or textarea is changed
	readOnly, // * Make input or textarea read only
	placeholder, // * Placeholder text for textarea or input
	removable, // * Make bubble remoable
	onRemove, // * Event listener when remove icon is clicked
	member, // * Allows only Owners, PMs, and Members to see the links
	onFocus, // * Event listen to call when anything is focused again
}) => {
	const incrementCount = () => {
		onCountChange(text, count + 1);
	};

	const decrementCount = () => {
		if (count > 1) {
			onCountChange(text, count - 1);
		}
		if (count - 1 === 0) {
			onRemove(text);
		}
	};

	const onType = (e) => {
		onTextAreaChange(text, e.target.value);
	};

	const redirectCommsLink = () => {
		if (input !== "None") {
			const newlink = sanitizeLink(input);

			window.open(newlink);
		}
	};

	const bubbleColor = getBubbleColor(text);

	return (
		<div
			className={`flex flex-col gap-2 p-1 rounded-md min-w-0 ${bubbleColor}`}
		>
			<div className="flex justify-between gap-2">
				{/* Count display Field */}
				<div className="flex items-center gap-2">
					{countable && (
						<p
							data-testid="count"
							className="w-6 bg-gray-200 dark:bg-gray-700 font-bold
						flex justify-center items-center rounded-md"
						>
							{count}
						</p>
					)}
					{/* Text Field */}
					<p
						data-testid="text-field"
						className="poppins flex text-base text-white font-semibold"
					>
						{text}
					</p>
				</div>
				{input !== "None" &&
					input &&
					member !== "newUser" &&
					member !== null &&
					!removable && (
						<MdLaunch
							className="text-xl"
							onClick={redirectCommsLink}
						/>
					)}

				{/* Add, Minus, Remove Buttons  */}
				{(countable || removable) && (
					<div className="flex gap-1">
						{/* Add, Minus Button */}
						{countable && (
							<Fragment>
								<button
									data-testid="countable-button"
									className="bg-gray-200 dark:bg-gray-700 w-6 rounded-md
									flex justify-center items-center"
									aria-label="add button"
									onClick={() => {
										incrementCount();
										onFocus?.();
									}}
								>
									<MdOutlineAdd className="text-xl" />
								</button>
								<button
									className="bg-gray-200 dark:bg-gray-700 w-6 rounded-md
									flex justify-center items-center"
									aria-label="minus button"
									onClick={() => {
										decrementCount();
										onFocus?.();
									}}
								>
									<MdRemove className="text-xl" />
								</button>
							</Fragment>
						)}
						{/* Remove Field */}
						{removable && (
							<button
								data-testid="remove-button"
								className="rounded-sm w-6 bg-transparent
								flex justify-center items-center text-white"
								aria-label="remove button"
								onClick={() => {
									onRemove(text);
									onFocus?.();
								}}
							>
								<MdRemoveCircleOutline className="text-xl" />
							</button>
						)}
					</div>
				)}
			</div>
			{/* Div Container */}
			{useContainer && (
				<div
					data-testid="children-field"
					className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md flex gap-2"
				>
					{children}
				</div>
			)}
			{/* Text Field */}
			{writable &&
				member !== "newUser" &&
				(useTextArea ? (
					<textarea
						className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md 
							focus:outline-none h-24 scroll-bar min-w-0"
						aria-label="writable textarea"
						value={input}
						disabled={readOnly}
						onChange={onType}
						placeholder={placeholder}
						onFocus={() => {
							onFocus?.();
						}}
					/>
				) : (
					<input
						className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md 
							focus:outline-none min-w-0"
						aria-label="writable input"
						value={input}
						disabled={readOnly}
						onChange={onType}
						placeholder={placeholder}
						onFocus={() => {
							onFocus?.();
						}}
					/>
				))}
		</div>
	);
};

export default Bubble;
