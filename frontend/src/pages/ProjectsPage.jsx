import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Divider from "../components/reusable/Divider";
import ProjectTypeSelector from "../components/projects/ProjectTypeSelector";
import OwnedProjectTile from "../components/projects/OwnedProjectTile";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import JoinedProjectTile from "../components/projects/JoinedProjectTile";
import Button from "../components/reusable/Button";
import { getJoinedProjects, getOwnedProjects } from "./loaders/projectLoader";
import { useLazyLoading } from "../hooks/hooks";

const ProjectsPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const initialProjects = useLoaderData();

	const [projects, setProjects] = useState([]);

	const projectsContainerRef = useRef();

	let isInitialLoading = useRef(true);

	const fetchMoreProjects = useCallback(async () => {
		if (projects.length === 0) {
			return [];
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

		return newProjects;
	}, [location.pathname, projects]);

	const [endOfSearch, setEndOfSearch] = useLazyLoading(
		projectsContainerRef,
		fetchMoreProjects,
		projects,
		setProjects,
		isInitialLoading
	);

	useEffect(() => {
		setEndOfSearch(false);
	}, [location.pathname, setEndOfSearch]);

	useEffect(() => {
		setProjects(initialProjects);
		isInitialLoading.current = false;
	}, [initialProjects]);

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
