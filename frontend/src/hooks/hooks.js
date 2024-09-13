import { useCallback, useEffect, useRef, useState } from "react";

const useLazyLoading = (
	container,
	retrieveProjects,
	projects,
	setProjects,
	isInitialLoading
) => {
	const [endOfSearch, setEndOfSearch] = useState(false);
	const isFetching = useRef(false);

	// * Lazy loading more projects
	const lazyLoad = useCallback(async () => {
		if (isFetching.current || isInitialLoading.current) {
			return;
		}

		isFetching.current = true;
		const newProjects = await retrieveProjects();
		isFetching.current = false;

		setProjects([...projects, ...newProjects]);

		if (newProjects.length === 0) {
			setEndOfSearch(true);
		}
	}, [projects, retrieveProjects, setProjects, isInitialLoading]);

	const handleScroll = useCallback(() => {
		const bottom =
			window.innerHeight + window.scrollY + 50 >=
			document.body.scrollHeight;

		if (bottom && !endOfSearch) {
			lazyLoad();
		}
	}, [lazyLoad, endOfSearch]);

	useEffect(() => {
		// * Adding scroll listener to window
		window.addEventListener("scroll", handleScroll);

		// * Load
		if (container.current.clientHeight - 500 <= window.innerHeight) {
			if (!endOfSearch) {
				lazyLoad();
			}
		}
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [container, endOfSearch, handleScroll, lazyLoad]);

	return [endOfSearch, setEndOfSearch];
};

export { useLazyLoading };
