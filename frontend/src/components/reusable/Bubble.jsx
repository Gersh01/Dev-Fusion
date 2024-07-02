import { MdOutlineAdd, MdRemove, MdRemoveCircleOutline } from "react-icons/md";
import { Fragment } from "react";
import { getBubbleColor } from "../../utils/utility";

const Bubble = ({
	text,
	countable,
	count,
	onCountChange,
	writable,
	useTextArea,
	input,
	onTextAreaChange,
	placeholder,
	removable,
	onRemove,
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
							className="w-6 bg-gray-200 dark:bg-gray-700 font-bold
						flex justify-center items-center rounded-md"
						>
							{count}
						</p>
					)}
					{/* Text Field */}
					<p className="poppins text-base text-white font-semibold">
						{text}
					</p>
				</div>
				{/* Add, Minus, Remove Buttons  */}
				{(countable || removable) && (
					<div className="flex gap-1">
						{/* Add, Minus Button */}
						{countable && (
							<Fragment>
								<button
									className="bg-gray-200 dark:bg-gray-700 w-6 rounded-md
									flex justify-center items-center"
									onClick={incrementCount}
								>
									<MdOutlineAdd className="text-xl" />
								</button>
								<button
									className="bg-gray-200 dark:bg-gray-700 w-6 rounded-md
									flex justify-center items-center"
									onClick={decrementCount}
								>
									<MdRemove className="text-xl" />
								</button>
							</Fragment>
						)}
						{/* Remove Field */}
						{removable && (
							<button
								className="rounded-sm w-6 bg-transparent
								flex justify-center items-center"
								onClick={() => {
									onRemove(text);
								}}
							>
								<MdRemoveCircleOutline className="text-xl" />
							</button>
						)}
					</div>
				)}
			</div>
			{/* Text Field */}
			{writable &&
				(useTextArea ? (
					<textarea
						className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md 
					focus:outline-none h-24 scroll-bar min-w-0"
						value={input}
						onChange={onType}
						placeholder={placeholder}
					/>
				) : (
					<input
						className="bg-gray-200 dark:bg-gray-700 p-1 rounded-md 
					focus:outline-none min-w-0"
						value={input}
						onChange={onType}
						placeholder={placeholder}
					/>
				))}
		</div>
	);
};

export default Bubble;
