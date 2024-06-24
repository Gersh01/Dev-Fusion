import { ReactTyped } from "react-typed";
import Button from "../reusable/Button";
import AuthPanel from "../reusable/AuthPanel";

const LanderPanel = () => {
	const goToLogin = () => {
		window.location.href = "/login";
	};
	return (
		// <div className="w-[480px] p-2 flex flex-col justify-start gap-20">
		<AuthPanel width={480} transparent>
			<div className="flex flex-col gap-5">
				<div className="text-center text-white text-4xl font-bold italic inter uppercase leading-10">
					Thrive in the power of open-source to drive innovation!
				</div>
				<div className="text-center text-white text-md font-normal crimson-pro leading-tight">
					Whether you are a seasoned developer or just starting out,
					you will find a place here.
				</div>
				<div className="text-center text-white text-md font-normal crimson-pro leading-tight">
					connect with like-minded individuals who share your passion
					for coding.
				</div>
				<div className="text-center text-white text-2xl font-semibold inter leading-tight">
					<ReactTyped
						strings={[
							"Together, we can build a brighter future, one line of code at a time!",
						]}
						typeSpeed={40}
					/>
				</div>
			</div>
			<Button large mode="white" onClick={goToLogin}>
				Get Started
			</Button>
		</AuthPanel>
	);
};

export default LanderPanel;
