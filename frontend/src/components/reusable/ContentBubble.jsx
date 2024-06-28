import { getBubbleColor } from "../../utils/utility";

// * text: string -> determines the color of the bubble
// * children: <> -> Anything after the text
const ContentBubble = ({ text, children }) => {
	const bubbleColor = getBubbleColor(text);

	return (
		<div className={`flex rounded-md`}>
			{/* Text Field */}
			<p
				className={`poppins px-2 text-white font-semibold text-nowrap flex 
					items-center rounded-l-md ${bubbleColor}`}
			>
				{text}
			</p>
			{/* Content */}
			<div
				className="bg-gray-200 dark:bg-gray-700 p-2 rounded-r-md 
				grow flex gap-2 flex-wrap"
			>
				{children}
			</div>
		</div>
	);
};

export default ContentBubble;
