import React from "react";
import ResetPasswordFields from "../components/reset-password/ResetPasswordFields";
import ResetPasswordButton from "../components/reset-password/ResetPasswordButton";

const ResetPasswordPage = () => {
  return (
    <div className="w-screen h-screen p-3 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex">
      <div className="w-[450px] h-[550px] p-[30px] bg-gray-100 dark:bg-gray-800 rounded-[25px] flex-col justify-center items-center gap-10 inline-flex">
        <div className="self-stretch h-5 flex-col justify-center items-center flex text-2xl font-semibold league-spartan dark:text-white">
          Reset Password
        </div>
        <ResetPasswordFields />
        <ResetPasswordButton />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
