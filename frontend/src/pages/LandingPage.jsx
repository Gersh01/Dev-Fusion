import { ReactTyped } from "react-typed";

const LandingPage = () => {
	const goLogin = () => {
		window.location.href = "/login";
	};

	return (
		<div className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex">
			<div className="w-[400px] h-[520px] p-2.5 flex-col justify-start items-center gap-5 inline-flex">
				<div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-[20px] flex">
					<div className="self-stretch h-[280px] flex-col justify-center items-center gap-4 flex">
						<div className="self-stretch text-center text-white text-4xl font-bold font-['Playfair Display'] uppercase leading-10">
							Thrive in the power of open-source to drive
							innovation!
						</div>
						<div className="self-stretch text-center text-white text-md font-normal font-['Crimson Text'] leading-tight">
							Whether you are a seasoned developer or just
							starting out, you will find a place here.
						</div>
						<div className="self-stretch text-center text-white text-md font-normal font-['Crimson Text'] leading-tight">
							connect with like-minded individuals who share your
							passion for coding.
						</div>
					</div>
					<div className="self-stretch text-center text-white text-2xl font-semibold font-['Inter'] leading-tight">
						<ReactTyped
							strings={[
								"Together, we can build a brighter future, one line of code at a time!",
							]}
							typeSpeed={60}
						/>
					</div>
				</div>
				<button
					className="self-stretch p-2.5 bg-white rounded-[5px] justify-center items-center gap-2.5 inline-flex text-black text-xl font-semibold font-['League Spartan']"
					onClick={goLogin}
				>
					Get Started
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
