import { Fragment } from "react";
import {
	MdArrowLeft,
	MdPerson,
	MdOutlineAccessTimeFilled,
} from "react-icons/md";
import Divider from "../components/reusable/Divider";
import Button from "../components/reusable/Button";
import Bubble from "../components/reusable/Bubble";
import ContentBubble from "../components/reusable/ContentBubble";
import UserBubble from "../components/reusable/UserBubble";

const ViewProjectPage = () => {
	const numTotalPositions = 9;
	const numDaysTilStart = 7;

	return (
		<Fragment>
			<button className="flex gap-2 items-center self-start">
				<MdArrowLeft className="text-2xl" />
				<p className="text-xl font-semibold">Back</p>
			</button>
			{/* <Divider /> */}
			<p className="text-3xl font-semibold">Project Title</p>
			<div className="flex gap-2 flex-wrap">
				<Button mode="safe">Begin</Button>
				<Button mode="secondary">Manage Team</Button>
				<Button mode="secondary">Edit</Button>
				<Button mode="danger">Delete</Button>
			</div>
			{/* TIME */}
			<div className="flex justify-between flex-wrap">
				<div className="flex gap-1 items-center">
					<p className="poppins text-white">{numTotalPositions}</p>
					<MdPerson className="text-xl text-white" />
				</div>
				<div className="flex gap-1 items-center">
					<MdOutlineAccessTimeFilled className="text-xl text-white" />
					<p className="poppins text-white">
						{numDaysTilStart}{" "}
						{numDaysTilStart === 1
							? "day left to join"
							: "days left to join"}
					</p>
				</div>
			</div>
			<Divider />
			{/* DESCRIPTION */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Description</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
					corporis minima illo corrupti rem nesciunt temporibus?
					Deleniti corporis voluptatibus, doloremque fuga quasi,
					eaque, dicta aut perferendis id iusto error consectetur
					repudiandae! Cumque quam dicta laboriosam repellendus quia?
					Deleniti natus, dolores at error laboriosam consequuntur
					ratione quae, sed modi incidunt tempora aspernatur animi
					fugit quod! Earum facilis illum ipsa itaque eum corrupti,
					error inventore accusantium.
				</p>
				<p>
					Doloremque magni delectus est? Dolorem, saepe. At sit a,
					exercitationem praesentium dolor vero dolorem sed minus,
					expedita mollitia possimus adipisci optio enim ad vel fugit
					accusantium? Neque soluta inventore, veritatis ratione
					labore accusamus nulla a reiciendis voluptas id blanditiis,
					consequuntur ipsam quam sunt odio? Voluptate repudiandae hic
					cumque eveniet laudantium, animi non sequi quibusdam
					obcaecati, accusantium adipisci omnis beatae maiores fugiat
					laborum ab eligendi ipsum impedit! Beatae facilis
					accusantium, harum quo quae vero facere culpa. Quo
					aspernatur labore molestias nostrum fugiat quos ad eligendi
					aliquid? Ullam minima veritatis dignissimos minus ex iure
					omnis, voluptatum quo, aliquid possimus aliquam repellendus
					necessitatibus dolorem consectetur deleniti ratione eligendi
					voluptates cupiditate eveniet placeat. Eius vero vitae iure
					nisi quia nesciunt minima vel quos?
				</p>
				<p>
					Libero, molestias. Inventore eum quidem placeat unde
					exercitationem, vitae sunt eos alias repudiandae amet
					incidunt, temporibus eligendi laboriosam! Rerum ex possimus
					officia. Distinctio et nulla odio quam. Fugiat aliquam harum
					nostrum, temporibus magni suscipit ducimus maxime provident
					nobis cum, omnis incidunt? Inventore pariatur odio
					reiciendis ratione repellendus numquam, ipsum ea provident
					vitae voluptas illo eius laboriosam dolorem facere maxime!
					Officia, illo consequatur debitis inventore rerum
					repellendus explicabo.
				</p>
			</div>
			{/* POSITIONS NEEDED */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Positions Needed</p>
				<div className="flex flex-wrap gap-4">
					<ContentBubble text="Frontend">(0/2)</ContentBubble>
					<ContentBubble text="API">(1/2)</ContentBubble>
					<ContentBubble text="Database">(0/1)</ContentBubble>
				</div>
			</div>
			{/* POSITION REQUIREMENTS */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Position Requirements</p>
				<div className="flex flex-col gap-4">
					<ContentBubble text="Project Manager">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quod aspernatur accusantium sit architecto recusandae id
						iusto eum, adipisci atque assumenda.
					</ContentBubble>
					<ContentBubble text="Frontend">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Aliquam nemo asperiores eum quasi. Reprehenderit,
						laboriosam.
					</ContentBubble>
					<ContentBubble text="API">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Labore dolorem possimus voluptas officiis repudiandae
						veritatis amet corrupti quisquam?
					</ContentBubble>
					<ContentBubble text="Database">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Exercitationem nostrum, perspiciatis sit veritatis
						vero vitae quidem neque labore molestias odio asperiores
						delectus iste dolorum commodi unde voluptatibus
						similique, maiores corporis consequatur eius.
					</ContentBubble>
				</div>
			</div>
			{/* TECHNOLOGIES */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Technologies</p>
				<div className="flex flex-wrap gap-2">
					<Bubble text="React" />
					<Bubble text="Express" />
					<Bubble text="MongoDB" />
					<Bubble text="NodeJs" />
					<Bubble text="Heroku" />
					<Bubble text="Python" />
					<Bubble text="ChatGPT" />
					<Bubble text="Git" />
					<Bubble text="GitHub" />
					<Bubble text="TypeScript" />
					<Bubble text="JavaScript" />
					<Bubble text="Redux" />
				</div>
			</div>
			{/* COMMUICATION */}
			<div className="flex flex-col gap-2">
				<p className="text-xl font-semibold">Communications</p>
				<div className="flex flex-wrap gap-2">
					<Bubble text="iMessage" />
					<Bubble text="Discord" />
					<Bubble text="GitHub" />
					<Bubble text="WhatsApp" />
				</div>
			</div>
			{/* CURRENT TEAM */}
			<div className="flex flex-col gap-4">
				<p className="text-xl font-semibold">Current Team</p>
				<div className="flex flex-col">
					<ContentBubble text="Project Manager">
						<UserBubble text="@Alex" />
					</ContentBubble>
				</div>
				<div className="flex flex-col">
					<ContentBubble text="Frontend">
						<UserBubble text="@Xutao" />
						<UserBubble text="@James" />
						<UserBubble text="@Jacob" />
					</ContentBubble>
				</div>
				<div className="flex flex-col">
					<ContentBubble text="API">
						<UserBubble text="@Alperen" />
						<UserBubble text="@Golden" />
					</ContentBubble>
				</div>
				<div className="flex flex-col">
					<ContentBubble text="Database">
						<UserBubble text="@Tony" />
					</ContentBubble>
				</div>
			</div>
		</Fragment>
	);
};

export default ViewProjectPage;
