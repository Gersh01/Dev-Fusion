import React from "react";

const EmailVerificationPage = () => {
  return (
    <div className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center  items-center gap-2.5 inline-flex">
      <div className="w-[500px] h-[800px] p-[30px] bg-gray-100 dark:bg-gray-800 rounded-[25px] flex-col justify-between items-center gap-[50px] inline-flex py-20">
        <div className="text-black text-2xl font-semibold justify-center dark:text-white league-spartan">
          Please verify your email
        </div>
        <div className="w-[300px] h-[168px] flex-col justify-start items-center gap-2.5 inline-flex">
          <div className="self-stretch px-2.5 justify-center items-center gap-2.5 inline-flex text-center text-black text-xl font-normal league-spartan dark:text-white">
            We have sent you a link to{" "}
          </div>
          <div className="flex-auto justify-center items-center gap-2.5 inline-flex text-center text-black text-xl font-semibold league-spartan dark:text-white">
            example@email.com
          </div>

          <div className="flex-auto h-[33px] text-center text-black text-xl font-normal league-spartan dark:text-white">
            Just click on the link to complete your registration
          </div>
        </div>
        <button className="text-black font-semibold justify-center dark:text-white league-spartan">
          Click here to resend the email
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
