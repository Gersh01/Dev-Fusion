import React from "react";

const ResetPasswordEmailHeader = () => {
  return (
    <>
      <div className="justify-center items-center gap-2.5">
        <div className="self-stretch h-[22px] flex-col justify-center items-center gap-4 flex text-2xl font-semibold league-spartan dark:text-white">
          Reset Password
        </div>
        <div className="self-stretch flex-col pt-10 justify-center items-center gap-5 flex text-center text-md poppins dark:text-white">
          Enter your email to reset your password
        </div>
      </div>
    </>
  );
};

export default ResetPasswordEmailHeader;
