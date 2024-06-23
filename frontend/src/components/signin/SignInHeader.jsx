import React from "react";

const SignInHeader = () => {
  let theme = "";

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className="self-stretch h-[66px] flex-col justify-center items-center gap-2.5 flex">
      <div className="text-orange-400 text-[32px] font-semibold league-spartan dark:text-violet-600">
        DevFusion
      </div>
      <div className="text-black dark:text-white text-lg font-semibold poppins">
        Login
      </div>
    </div>
  );
};

export default SignInHeader;
