import React from "react";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterFields from "../components/register/RegisterFields";
import RegisterButtons from "../components/register/RegisterButtons";

const RegisteringPage = () => {
  return (
    <div className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex">
      <div className="w-[500px] h-[800px] p-[30px] bg-gray-100 dark:bg-gray-800 rounded-[25px] flex-col justify-center items-center gap-[50px] inline-flex">
        <RegisterHeader />
        <RegisterFields />
        <RegisterButtons />
      </div>
    </div>
  );
};

export default RegisteringPage;
