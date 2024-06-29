import { useLoaderData } from "react-router-dom";
import DiscoverProjectTile from "../components/discover/DiscoverProjectTile";
import Divider from "../components/reusable/Divider";
import SearchField from "../components/reusable/SearchField";
import { Fragment, useState } from "react";
import { getProjects } from "./loaders/projectLoader";
import SortBySelector from "../components/reusable/SortBySelector";

const DisocverPage = () => {
	const [searchBy, setSearchBy] = useState("title");
	const [sortBy, setSortBy] = useState("relevance");
	const [query, setQuery] = useState("");

	const [projects, setProjects] = useState(useLoaderData());

	if (!projects) {
		return null;
	}

	const renderedProjectTiles = projects.map((project) => {
		return <DiscoverProjectTile key={project._id} project={project} />;
	});

	const onSearch = async () => {
		setProjects(
			await getProjects({
				searchBy: searchBy,
				sortBy: sortBy,
				query: query,
				count: 12,
				initial: true,
				projectId: "000000000000000000000000",
			})
		);
	};

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
					onSearch={onSearch}
				/>
			</div>
			<div className="self-end">
				<SortBySelector sortBy={sortBy} setSortBy={setSortBy} />
			</div>
			<Divider />
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
				{renderedProjectTiles}
			</div>
		</Fragment>
	);
};

export default DisocverPage;
