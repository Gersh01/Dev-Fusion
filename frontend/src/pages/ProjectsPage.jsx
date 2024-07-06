import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Divider from "../components/reusable/Divider";
import ProjectTypeSelector from "../components/projects/ProjectTypeSelector";
import OwnedProjectTile from "../components/projects/OwnedProjectTile";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import JoinedProjectTile from "../components/projects/JoinedProjectTile";
import Button from "../components/reusable/Button";
import { getJoinedProjects, getOwnedProjects } from "./loaders/projectLoader";

const ProjectsPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const retrievedProjects = useLoaderData();

	const [projects, setProjects] = useState([]);
	const [endOfSearch, setEndOfSearch] = useState(false);

	const projectsContainerRef = useRef();

	useEffect(() => {
		setEndOfSearch(false);
	}, [location.pathname]);

	useEffect(() => {
		setProjects(retrievedProjects);
	}, [retrievedProjects]);

	// * Lazy loading more projects
	const retrieveMoreProjects = useCallback(async () => {
		if (projects.length === 0) {
			return;
		}

		let newProjects;
		if (location.pathname === "/my-projects") {
			newProjects = await getOwnedProjects({
				searchBy: "title",
				sortBy: "recent",
				query: "",
				count: 4,
				initial: false,
				projectId: projects[projects.length - 1]._id,
			});
		} else {
			newProjects = await getJoinedProjects({
				searchBy: "title",
				sortBy: "recent",
				query: "",
				count: 4,
				initial: false,
				projectId: projects[projects.length - 1]._id,
			});
		}

		setProjects([...projects, ...newProjects]);

		console.log(newProjects.length);
		if (newProjects.length === 0) {
			setEndOfSearch(true);
		}
	}, [location.pathname, projects]);

	// * Only lazy load when reaching end of projects
	const handleScroll = useCallback(() => {
		const bottom =
			window.innerHeight + window.scrollY >= document.body.scrollHeight;

		if (bottom) {
			retrieveMoreProjects();
		}
	}, [retrieveMoreProjects]);

	useEffect(() => {
		// * Adding scroll listener to window
		window.addEventListener("scroll", handleScroll);

		// * Load
		if (
			projectsContainerRef.current.clientHeight - 500 <
			window.innerHeight
		) {
			if (!endOfSearch) {
				retrieveMoreProjects();
			}
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [endOfSearch, handleScroll, retrieveMoreProjects]);

	const renderedProjectsTiles = projects.map((project) => {
		if (location.pathname === "/my-projects") {
			return <OwnedProjectTile key={project._id} project={project} />;
		} else if (location.pathname === "/joined-projects") {
			return <JoinedProjectTile key={project._id} project={project} />;
		}
	});

	const emptyProjectsMessage =
		location.pathname === "/my-projects" ? (
			<Fragment>
				<p>You have not created any projects</p>
				<Button
					large
					onClick={() => {
						navigate("/create");
					}}
				>
					Create New Project
				</Button>
			</Fragment>
		) : (
			<Fragment>
				<p>You have not joined any projects</p>
				<Button
					large
					onClick={() => {
						navigate("/discover");
					}}
				>
					Discover Projects
				</Button>
			</Fragment>
		);

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 
					text-black dark:text-white poppins text-4xl font-bold gap-x-6"
			>
				<p>Projects</p>
			</div>
			<Divider />
			<ProjectTypeSelector />
			<div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12"
				ref={projectsContainerRef}
			>
				{renderedProjectsTiles}
			</div>
			{projects.length === 0 && (
				<div className="font-medium text-lg flex justify-center">
					<div className="flex flex-col gap-4 items-center">
						{emptyProjectsMessage}
					</div>
				</div>
			)}
			{endOfSearch && (
				<div className="self-center px-8 py-1 mb-12 rounded-full bg-gray-200 dark:bg-gray-700">
					End of Search
				</div>
			)}
		</Fragment>
	);
};

export default ProjectsPage;
