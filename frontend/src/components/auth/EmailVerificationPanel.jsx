import AuthPanel from "../reusable/AuthPanel";

const EmailverificationPanel = () => {
	return (
		<AuthPanel width={480} minHeight={600}>
			<p className="text-black text-3xl font-semibold dark:text-white league-spartan text-center">
				Please Verify Your Email
			</p>
			<div className="flex flex-col gap-5">
				<div className="px-2.5 text-center text-black text-xl font-normal league-spartan dark:text-white">
					We have sent you a link to{" "}
				</div>
				<div className="text-center text-black text-xl font-semibold league-spartan dark:text-white">
					example@email.com
				</div>
				<div className="px-16 text-center text-black text-xl league-spartan dark:text-white">
					Just click on the link to complete your registration
				</div>
			</div>
			<button className="text-black font-semibold justify-center dark:text-white league-spartan text-xl">
				Click here to resend the email
			</button>
		</AuthPanel>
	);
};

export default EmailverificationPanel;
