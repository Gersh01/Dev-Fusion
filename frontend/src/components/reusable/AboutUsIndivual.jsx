import Button from "./Button";

const AboutUsIndivual = ({ members }) => {
	return members.map((member) => (
		<div key={member.name} className="flex py-4 justify-between">
			<img
				data-testid="member-image"
				className="max-h-28 max-w-28 rounded-full"
				alt="About us image"
				src={member.picture}
			/>
			<div className="flex-col content-end">
				<p
					data-testid="member-name"
					className="flex poppins py-2 font-semibold"
				>
					{member.name}
				</p>
				<div className="flex justify-end grow">
					<Button onClick={() => window.open(member.link, "_")}>
						GitHub
					</Button>
				</div>
			</div>
		</div>
	));
};

export default AboutUsIndivual;
