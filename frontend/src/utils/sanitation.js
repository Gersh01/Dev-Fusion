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

export { santizeProject };
