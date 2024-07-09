// * Set mode to "edit" when editing a project
const validateProject = (project, mode) => {
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

	if (teamCount < 2) {
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
		if (mode !== "edit") {
			errors.startDate.push("Start date cannot be in the past");
		}
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

const validateLogin = (login) => {
	const errors = {
		username: [],
		password: [],
		returnError: [],
	};

	const userInput = login.username;
	const passwordInput = login.password;

	if (userInput === "") {
		errors.username.push("Username cannot be empty");
	}

	if (passwordInput === "") {
		errors.password.push("Password must not be empty");
	}

	return errors;
};

const validateRegister = (register) => {
	const validEmail = new RegExp(
		"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
	);
	const validPassword = new RegExp(
		"(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])(?=.{8,24}$)"
	);

	const errors = {
		firstName: [],
		lastName: [],
		email: [],
		username: [],
		password: [],
		returnError: [],
	};
	const username = register.username;
	const password = register.password;
	const firstName = register.firstName;
	const lastName = register.lastName;
	const email = register.email;

	if (firstName === "") {
		errors.firstName.push("Cannot be empty");
	} else if (firstName.length > 18) {
		errors.firstName.push("Name is too long");
	}

	if (lastName === "") {
		errors.lastName.push("Cannot be empty");
	} else if (lastName.length > 18) {
		errors.lastName.push("Name is too long");
	}

	if (username === "") {
		errors.username.push("Username cannot be empty");
	} else if (username.length > 24) {
		errors.username.push("Username cannot be more than 24 characters");
	}

	if (email === "") {
		errors.email.push("Email cannot be empty");
	} else if (validEmail.test(email) === false) {
		errors.email.push("Email must follow example@email.com format");
	}

	if (password === "") {
		errors.password.push("Password cannot be empty");
	} else if (validPassword.test(password) === false) {
		errors.password.push("Password does not follow the correct format");
	}

	return errors;
};

const validResetPasswordEmail = (resetEmail) => {
	const validEmail = new RegExp(
		"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
	);

	const errors = {
		email: [],
	};

	const email = resetEmail.email;

	if (email === "") {
		errors.email.push("Email cannot be empty");
	} else if (validEmail.test(email) === false) {
		errors.email.push("Email must follow example@email.com format");
	}
	return errors;
};

const validResetPassword = (resetPassword) => {
	const validPassword = new RegExp(
		"(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])(?=.{8,24}$)"
	);

	const errors = {
		password: [],
		confirmPassword: [],
	};

	const password = resetPassword.password;
	const confirmPassword = resetPassword.confirm;

	if (password === "") {
		errors.password.push("Password cannot be empty");
	} else if (validPassword.test(password) === false) {
		errors.password.push("Password does not follow the correct format");
	}

	if (password !== confirmPassword) {
		errors.confirmPassword.push("Confirm Password does not match");
	} else if (confirmPassword === "") {
		errors.confirmPassword.push("Confirm Password cannot be empty");
	}
	return errors;
};

const validateEditProjectStartDate = (project, oldStartDate) => {
	const errors = {
		title: [],
		description: [],
		roles: [],
		technologies: [],
		communications: [],
		startDate: [],
		endDate: [],
	};

	if (+new Date(project.projectStartDate) <= +new Date()) {
		if (+new Date(oldStartDate) > +new Date(project.projectStartDate)) {
			errors.startDate.push(
				"New start date cannot be before the original start date"
			);
		}
	}

	return errors;
};

export {
	validateProject,
	validateLogin,
	validateRegister,
	validResetPasswordEmail,
	validResetPassword,
	validateEditProjectStartDate,
};
