import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ show, children }) => {
	const display = show ? "" : "hidden";

	// * Disable scrolling while modal is open
	useEffect(() => {
		if (show) {
			document.body.classList.add("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [show]);

	return createPortal(
		<div
			className={`fixed inset-0 ${display} flex justify-center p-4 overflow-auto z-40`}
		>
			{/* Background */}
			<div className="fixed inset-0 bg-black opacity-60"></div>
			{/* Content */}
			<div className="flex justify-center items-center z-50 min-w-0">
				{children}
			</div>
		</div>,
		document.getElementById("app")
	);
};

export default Modal;
