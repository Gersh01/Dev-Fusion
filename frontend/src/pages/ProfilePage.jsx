import Divider from "../components/reusable/Divider";
import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DiscoverProjectTile from "../components/discover/DiscoverProjectTile";
import BioProfileFields from "../components/profile/BioProfileFields";
import TechnologiesField from "../components/profile/TechnologiesField";
import Button from "../components/reusable/Button";
import { getProfileProjects } from "./loaders/projectLoader";
import { MdArrowLeft } from "react-icons/md";

const ProfilePage = () => {
	let res = useSelector((state) => state.user);
	const tech = res.technologies;
	const navigate = useNavigate();

	const loaderData = useLoaderData();
	const [projects, setProjects] = useState(loaderData.projects);
	const [usersProfile, setUsersProfile] = useState(loaderData.user);
	const [endOfSearch, setEndOfSearch] = useState(false);

	const projectsContainerRef = useRef();

	// * Lazy loading more projects
	const retrieveMoreProjects = useCallback(async () => {
		if (projects.length === 0) {
			return;
		}

		let newProjects;
		if (!usersProfile) {
			//retrieves signed in users projects
			newProjects = await getProfileProjects({
				userId: "",
				searchBy: "title",
				sortBy: "recent",
				query: "",
				count: 4,
				initial: false,
				projectId: projects[projects.length - 1]._id,
			});
		} else {
			//retrieves a different users projects
			newProjects = await getProfileProjects({
				userId: usersProfile.userId,
				searchBy: "title",
				sortBy: "recent",
				query: "",
				count: 4,
				initial: false,
				projectId: projects[projects.length - 1]._id,
			});
		}

		setProjects([...projects, ...newProjects]);

		if (newProjects.length === 0) {
			setEndOfSearch(true);
		}
	}, [projects, usersProfile]);

	// * Only lazy load when reaching end of projects
	const handleScroll = useCallback(() => {
		const bottom =
			window.innerHeight + window.scrollY >= document.body.scrollHeight;

		if (bottom) {
			retrieveMoreProjects();
		}
	}, [retrieveMoreProjects]);

	useEffect(() => {
		setUsersProfile(loaderData.user);
		setProjects(loaderData.projects);
	}, [loaderData.user, loaderData.projects]);

	useEffect(() => {
		// * Adding scroll listener to window
		window.addEventListener("scroll", handleScroll);

		// * Load
		if (
			projectsContainerRef.current.clientHeight - 500 <=
			window.innerHeight
		) {
			if (!endOfSearch) {
				retrieveMoreProjects();
			}
		}
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [
		retrieveMoreProjects,
		endOfSearch,
		handleScroll,
		projects,
		usersProfile,
	]);

	const renderedProjectTiles = projects.map((project) => {
		return <DiscoverProjectTile key={project._id} project={project} />;
	});

	const renderedBioField = !usersProfile ? (
		<BioProfileFields
			title="Bio"
			info={res.bio}
			type={true}
			privateView={true}
		/>
	) : (
		<BioProfileFields
			title="Bio"
			info={usersProfile.bio}
			type={true}
			privateView={false}
		/>
	);

	const renderedTechField = !usersProfile ? (
		<TechnologiesField
			technologies={tech}
			title="Technologies"
			type={true}
			privateView={true}
		/>
	) : (
		<TechnologiesField
			technologies={usersProfile.technologies}
			title="Technologies"
			type={true}
			privateView={false}
		/>
	);

	const displayError = !usersProfile ? (
		<Fragment>
			<p className="text-xl text-center pb-4">
				You are not apart of any projects
			</p>
			<div className="flex gap-5 flex-col items-center grow-0 sm:flex-row justify-center">
				<Button onClick={() => navigate("/create")} large>
					Create New Project
				</Button>
				<span className="league-spartan flex">Or</span>
				<Button large onClick={() => navigate("/discover")}>
					Discover Projects
				</Button>
			</div>
		</Fragment>
	) : (
		<Fragment>
			<p className="text-3xl league-spartan font-semibold text-center pb-4">
				{usersProfile.username} is not apart of any projects
			</p>
		</Fragment>
	);

	const displayProfilePic = () => {
		if (!usersProfile) {
			// console.log(res.link);
			return res.link;
		} else {
			return usersProfile.link;
		}
	};

	return (
		<Fragment>
			{usersProfile ? (
				<button
					className="flex items-center self-start"
					onClick={() => {
						navigate(-1);
					}}
				>
					<MdArrowLeft className="text-2xl" />
					<p className="text-xl font-semibold">Back</p>
				</button>
			) : null}
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 min-w-[100px]
					poppins text-4xl font-bold gap-x-6"
			>
				<p>Profile</p>
			</div>
			<Divider />
			<div className="flex min-w-[100px] gap-5">
				<img
					className="h-28 w-28 rounded-full"
					src={displayProfilePic()}
				></img>
				<p className="flex items-center text-2xl md:text-4xl font-bold poppins text-wrap text-center ">
					{!usersProfile ? res.username : usersProfile.username}
				</p>
			</div>
			<div className="flex flex-wrap gap-8 py-4">
				{/* Bio Field*/}
				<div className="flex flex-col w-full h-80 p-4 rounded-2xl dark:bg-gray-900 bg-gray-50 lg:w-3/5 text-xl poppins">
					{renderedBioField}
				</div>
				{/*Technologies fields*/}
				<div className="flex flex-col p-4 rounded-2xl h-80 dark:bg-gray-900 bg-gray-50 w-full lg:w-1/5 lg:grow poppins text-xl">
					{renderedTechField}
				</div>
			</div>
			<p className="text-3xl poppins font-semibold">Projects</p>

			<div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12"
				ref={projectsContainerRef}
			>
				{renderedProjectTiles}
			</div>
			{projects.length === 0 && (
				<div className="flex flex-col grow-0 poppins justify-center">
					{displayError}
				</div>
			)}
			{endOfSearch && (
				<div className="self-center px-8 py-1 mb-12 rounded-full bg-gray-50 dark:bg-gray-900">
					End of Search
				</div>
			)}
		</Fragment>
	);
};

export default ProfilePage;
