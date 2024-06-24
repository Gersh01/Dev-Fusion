const EmailVerificationPage = () => {
	return (
		<div
			className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 
			dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 flex justify-center items-center"
		>
			<div
				className="w-[480px] min-h-[600px] p-7 bg-gray-100 dark:bg-gray-800 
				rounded-3xl flex flex-col justify-between gap-12 py-20"
			>
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
			</div>
		</div>
	);
};

export default EmailVerificationPage;
