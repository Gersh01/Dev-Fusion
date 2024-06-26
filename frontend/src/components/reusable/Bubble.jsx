import { MdOutlineAdd, MdRemove, MdRemoveCircleOutline } from "react-icons/md";
import { Fragment, useState } from "react";

const bubbleBgColors = [
	"bg-red-500",
	"bg-orange-500",
	"bg-amber-500",
	"bg-yellow-500",
	"bg-lime-500",
	"bg-green-500",
	"bg-emerald-500",
	"bg-teal-500",
	"bg-cyan-500",
	"bg-sky-500",
	"bg-blue-500",
	"bg-indigo-500",
	"bg-violet-500",
	"bg-purple-500",
	"bg-fuchsia-500",
	"bg-pink-500",
	"bg-rose-500",
];

const getBubbleColor = (text) => {
	let hash = 0;

	for (const char of text) {
		hash += char.charCodeAt(0);
	}

	return bubbleBgColors[hash % bubbleBgColors.length];
};

const Bubble = ({ text, removable, countable }) => {
	const [count, setCount] = useState(1);

	const incrementCount = () => {
		// * Only allow maximum of 9 people per role
		if (count < 9) {
			setCount(count + 1);
		}
	};

	const decrementCount = () => {
		setCount(count - 1);
	};

	const bubbleColor = getBubbleColor(text);

	return (
		<div className={`h-8 p-1 flex gap-3 rounded-md ${bubbleColor}`}>
			{/* Count display Field */}
			{countable && (
				<p
					className="aspect-square bg-white text-black poppins font-bold
				flex justify-center items-center rounded-sm"
				>
					{count}
				</p>
			)}
			{/* Text Field */}
			<p className="poppins text-white font-semibold">{text}</p>
			{/* Add, Minus, Remove Buttons  */}
			{(countable || removable) && (
				<div className="flex gap-1">
					{/* Add, Minus Button */}
					{countable && (
						<Fragment>
							<button
								className="bg-white rounded-sm aspect-square text-black
							flex justify-center items-center"
								onClick={incrementCount}
							>
								<MdOutlineAdd className="text-xl" />
							</button>
							<button
								className="bg-white rounded-sm aspect-square text-black
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
							className="rounded-sm aspect-square text-white
						flex justify-center items-center"
						>
							<MdRemoveCircleOutline className="text-xl" />
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Bubble;
