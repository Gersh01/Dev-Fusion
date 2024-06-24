import React from "react";
import SignIn from "../components/signin/SignIn";
import SignInHeader from "../components/signin/SignInHeader";
import SignInFields from "../components/signin/SignInFields";
import SignInButtons from "../components/signin/SignInButtons";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex">
      <div className="w-[450px] h-[640px] p-[30px] bg-gray-100 dark:bg-gray-800 rounded-[25px] flex-col justify-center items-center gap-[50px] inline-flex">
        <SignInHeader />
        <SignInFields />
        <SignInButtons />
      </div>
    </div>
  );
};

export default SignInPage;
