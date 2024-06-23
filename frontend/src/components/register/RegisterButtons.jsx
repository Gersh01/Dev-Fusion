import React from "react";

const RegisterButtons = () => {
  let theme = "";

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

  const goLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div className="self-stretch h-[78px] flex-col justify-center items-center gap-2.5 flex">
      <button className="self-stretch p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-white text-xl font-semibold font-['League Spartan']">
          Login
        </div>
      </button>
      <div className="self-stretch relative border-t-2 border-t-gray-400" />
      <button
        className="text-black dark:text-white text-xs font-medium font-family-Poppins"
        onClick={goLogin}
      >
        Sign up instead
      </button>
    </div>
  );
};

export default RegisterButtons;
