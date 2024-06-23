import React from "react";
import ResetPasswordEmailHeader from "../components/reset-password-email/ResetPasswordEmailHeader";
import ResetPasswordEmailFields from "../components/reset-password-email/ResetPasswordEmailFields";
import { ResetPasswordEmailButton } from "../components/reset-password-email/ResetPasswordEmailButton";

const ResetPasswordEmailPage = () => {
  return (
    <div className="w-screen h-screen p-3 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex">
      <div className="w-[400px] h-[550px] p-[30px] bg-gray-100 dark:bg-gray-800 rounded-[25px] flex-col justify-center items-center gap-[25px] inline-flex">
        <ResetPasswordEmailHeader />
        <ResetPasswordEmailFields />
        <ResetPasswordEmailButton />
      </div>
    </div>
  );
};

export default ResetPasswordEmailPage;
