import { Fragment } from "react";
import Divider from "../components/reusable/Divider";
import Button from "../components/reusable/Button";
import AboutCards from "../components/reusable/AboutCards";
import Alex from "../assets/Alex.png";
import Alperen from "../assets/Alperen.png";
import Golden from "../assets/Golden.png";
import Jacob from "../assets/Jacob.png";
import James from "../assets/James.png";
import Tony from "../assets/Tony.png";
import Xutao from "../assets/Xutao.jpg";

const AboutUsPage = () => {
	const projectManager = [
		{
			name: "Alex Gershfeld",
			link: "https://github.com/Gersh01",
			picture: Alex,
		},
	];
	const frontend = [
		{
			name: "Xutao Gao",
			link: "https://www.github.com/XutaoG",
			picture: Xutao,
		},
		{
			name: "James Salzer",
			link: "https://github.com/jsalzer312",
			picture: James,
		},
		{
			name: "Jacob Peach",
			link: "https://github.com/JPEACH34",
			picture: Jacob,
		},
	];
	const api = [
		{
			name: "Alperen Yazmaci",
			link: "https://github.com/alperenyazmaci",
			picture: Alperen,
		},
		{
			name: "Golden Lin",
			link: "https://github.com/GoldenLin9",
			picture: Golden,
		},
	];
	const backend = [
		{
			name: "Tony Chau",
			link: "https://github.com/tonych312312",
			picture: Tony,
		},
	];

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 min-w-[100px]
					poppins text-4xl font-bold gap-x-6"
			>
				<p>About Us</p>
			</div>
			<Divider />
			<AboutCards role="Project Manager" members={projectManager} />
			<AboutCards role="Frontend" members={frontend} />
			<AboutCards role="API" members={api} />
			<AboutCards role="Backend" members={backend} />
			<Button
				large
				mode="secondary"
				onClick={() =>
					window.open("https://github.com/Gersh01/LargeProject", "_")
				}
			>
				Dev Fusion GitHub
			</Button>
		</Fragment>
	);
};

export default AboutUsPage;
