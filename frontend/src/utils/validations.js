const validateProject = (project) => {
	const errors = {
		title: [],
		description: [],
		roles: [],
		technologies: [],
		communications: [],
		startDate: [],
		endDate: [],
	};
	const {
		title,
		projectStartDate,
		deadline,
		description,
		roles,
		technologies,
		communications,
	} = project;

	// Validate project title
	if (title.length === 0) {
		errors.title.push("Title cannot be empty");
	} else if (title.length > 80) {
		errors.title.push("Title must be less than 80 characters");
	}

	// Validate description
	if (description.length === 0) {
		errors.description.push("Description cannot be empty");
	}

	// Validate roles
	for (const role of roles) {
		if (role.description.length === 0) {
			errors.roles.push("Role description cannot be empty");
			break;
		}
	}

	let teamCount = 0;
	roles.forEach((role) => {
		teamCount += role.count;
	});

	if (teamCount <= 2) {
		errors.roles.push("Project must have at least 2 people");
	}

	// Validate technologies
	if (technologies.length === 0) {
		errors.technologies.push(
			"Project must have at least 1 form of technology"
		);
	}

	// Validate communication
	if (communications.length === 0) {
		errors.communications.push(
			"Project must have at least 1 form of communication"
		);
	}

	// Validate start date
	if (projectStartDate === "") {
		errors.startDate.push("Start date must be valid");
	} else if (+new Date(projectStartDate) <= +new Date()) {
		errors.startDate.push("Start date cannot be in the past");
	} else if (
		+new Date(projectStartDate) - +new Date() >=
		1000 * 60 * 60 * 24 * 365 * 2
	) {
		errors.startDate.push(
			"Start date cannot be more than 2 years from now"
		);
	}

	// Validate end date
	if (deadline === "") {
		errors.endDate.push("End date must be valid");
	} else if (+new Date(deadline) <= +new Date(projectStartDate)) {
		errors.endDate.push("End date cannot be before start date");
	} else if (
		+new Date(deadline) - +new Date(projectStartDate) >=
		1000 * 60 * 60 * 24 * 365 * 2
	) {
		errors.endDate.push("Project duration cannot be longer than 2 years");
	}
	return errors;
};

export { validateProject };
