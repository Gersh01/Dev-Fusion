import classNames from "classnames";
import { twMerge } from "tailwind-merge";

// * width: number -> Width of the panel
// * minHeight: number -> minimum height of the panel
// * transparent: boolean -> whether to set panel to transparent background
const AuthPanel = ({ children, width, minHeight, transparent }) => {
  const widthStyle = `w-[${width || 480}px]`;
  // const minHeightStyle = minHeight ? `min-h-[${minHeight}px]` : `min-h-fit`;
  const minHeightStyle = "";

  const panelColorStyle = twMerge(
    classNames("bg-gray-100 dark:bg-gray-800", {
      "bg-transparent dark:bg-transparent": transparent,
    })
  );

  return (
    <div
      className={`py-24 ${widthStyle} sm:${minHeightStyle} ${panelColorStyle} 
			px-4 sm:px-7 rounded-3xl flex flex-col justify-center gap-12`}
    >
      {children}
    </div>
  );
};

export default AuthPanel;
