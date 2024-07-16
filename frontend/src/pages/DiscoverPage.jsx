import { useLoaderData } from "react-router-dom";
import DiscoverProjectTile from "../components/discover/DiscoverProjectTile";
import Divider from "../components/reusable/Divider";
import SearchField from "../components/reusable/SearchField";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getProjects } from "./loaders/projectLoader";
import SortBySelector from "../components/reusable/SortBySelector";
import { useLazyLoading } from "../hooks/hooks";

const DisocverPage = () => {
	const [searchBy, setSearchBy] = useState("title");
	const [sortBy, setSortBy] = useState("relevance");
	const [query, setQuery] = useState("");

	const initialProjects = useLoaderData();
	const [projects, setProjects] = useState(useLoaderData());

	let isInitialLoading = useRef(false);

	const projectsContainerRef = useRef();

	const fetchMoreProjects = useCallback(async () => {
		if (projects.length == 0) {
			return [];
		}

		const newProjects = await getProjects({
			searchBy: searchBy,
			sortBy: sortBy,
			query: query,
			count: 4,
			initial: false,
			projectId: projects[projects.length - 1]._id,
		});

		return newProjects;
	}, [projects, sortBy, query, searchBy]);

	const initialSearch = useCallback(async () => {
		isInitialLoading.current = true;
		setProjects(
			await getProjects({
				searchBy: searchBy,
				sortBy: sortBy,
				query: query,
				count: 4,
				initial: true,
				projectId: "000000000000000000000000",
			})
		);
		isInitialLoading.current = false;
	}, [query, searchBy, sortBy]);

	const [endOfSearch, setEndOfSearch] = useLazyLoading(
		projectsContainerRef,
		fetchMoreProjects,
		projects,
		setProjects,
		isInitialLoading
	);

	useEffect(() => {
		setEndOfSearch(false);
	}, [query, sortBy, searchBy, setEndOfSearch]);

	useEffect(() => {
		setProjects(initialProjects);
	}, [initialProjects]);

	useEffect(() => {
		// setProjects([]);
		initialSearch();
	}, [initialSearch]);

	const renderedProjectTiles = projects.map((project) => {
		return <DiscoverProjectTile key={project._id} project={project} />;
	});

	return (
		<Fragment>
			<div
				className="flex justify-between items-end flex-wrap gap-y-2 
				text-black dark:text-white poppins text-4xl font-bold gap-x-6"
			>
				<p>Discover</p>
				<SearchField
					searchBy={searchBy}
					setSearchBy={setSearchBy}
					query={query}
					setQuery={setQuery}
					// onSearch={search}
				/>
			</div>
			<div className="self-end">
				<SortBySelector sortBy={sortBy} setSortBy={setSortBy} />
			</div>
			<Divider />
			<div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12"
				ref={projectsContainerRef}
			>
				{renderedProjectTiles}
			</div>
			{endOfSearch && (
				<div className="self-center px-8 py-1 mb-12 rounded-full bg-gray-200 dark:bg-gray-700">
					End of Search
				</div>
			)}
		</Fragment>
	);
};

export default DisocverPage;
