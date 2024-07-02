import { getBubbleColor } from "../../utils/utility";

// * text: string -> determines the color of the bubble
// * children: <> -> Anything after the text
// * colorless: boolean -> bubble will have a gray color
const ContentBubble = ({ text, children, colorless }) => {
	const bubbleColor = colorless ? "bg-gray-500" : getBubbleColor(text);

	return (
		<div className={`flex rounded-md`}>
			{/* Text Field */}
			<p
				className={`poppins p-2 text-white font-semibold text-nowrap flex 
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
