const santizeProject = (project) => {
	project.title = project.title.trim();
	project.description = project.description.trim();

	project.roles.forEach((role) => {
		role.description = role.description.trim();
	});

	project.communications.forEach((comm) => {
		comm.link = comm.link.trim();
	});
};

const sanitizeLink = (link) => {
	if (link.startsWith("https://") || link.startsWith("http://")) {
		return link;
	} else if (link.startsWith("www.")) {
		return "https://" + link;
	} else {
		return "https://www." + link;
	}
};

export { santizeProject, sanitizeLink };
