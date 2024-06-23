import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = () => {
  const [hidden, setHidden] = useState(true);
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
  const showPassword = () => {
    setHidden(!hidden);
  };

  return (
    <div className="w-screen h-screen p-2.5 bg-gradient-to-br from-orange-300 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 justify-center items-center gap-2.5 inline-flex">
      <div className="w-[500px] h-[640px] p-[30px] bg-gray-100 dark:bg-gray-800 rounded-[25px] flex-col justify-center items-center gap-[50px] inline-flex">
        <div className="self-stretch h-[66px] flex-col justify-center items-center gap-2.5 flex">
          <div className="text-orange-400 text-[32px] font-semibold font-['League Spartan'] dark:text-violet-600">
            DevFusion
          </div>
          <div className="text-black dark:text-white text-lg font-semibold font-family-Poppins">
            Login
          </div>
        </div>
        <div className="self-stretch h-[166px] flex-col justify-start items-start gap-2.5 flex">
          <div className="self-stretch h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
            <div className="justify-center items-center gap-[5px] inline-flex">
              <div className="w-[15px] h-[15px] relative">
                <div>
                  <FaRegUserCircle className="dark:fill-white" />
                </div>
              </div>
              <div className="text-black dark:text-white text-xs font-semibold font-family-Poppins">
                Username
              </div>
            </div>
            <div className="self-stretch border-b justify-start items-start inline-flex">
              <div className="flex grow">
                <input
                  className="grow-bg-gray-200 text-black  dark:text-white dark:bg-gray-900"
                  type="text"
                  placeholder="Username"
                ></input>
              </div>
            </div>
          </div>
          <div className="self-stretch h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
            <div className="justify-center items-center gap-[5px] inline-flex">
              <div className="w-[15px] h-[15px] relative fill-white">
                <MdOutlineLock className="dark:fill-white" />
              </div>
              <div className="text-black  dark:text-white  text-xs font-semibold font-family-Poppins">
                Password
              </div>
            </div>
            <div className="self-stretch border-b justify-start  items-start inline-flex">
              <input
                className="grow bg-gray-200 text-black dark:text-white  dark:bg-gray-900"
                type={hidden ? "password" : "text"}
                placeholder="Password"
              ></input>
              <button className="w-5 h-5 relative " onClick={showPassword}>
                {hidden ? (
                  <AiOutlineEyeInvisible
                    className="dark:fill-white"
                    size={25}
                  />
                ) : (
                  <AiOutlineEye size={25} className="dark:fill-white" />
                )}
              </button>
            </div>
          </div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-center items-center gap-[5px] flex">
              <input
                type="checkbox"
                className="w-4 h-4 relative rounded-[3px] border border-neutral-400"
              />
              <div className="text-black dark:text-white text-xs font-normal font-family-Poppins">
                Remember Me
              </div>
            </div>
            <button className="text-right text-black dark:text-white text-xs font-normal font-family-Poppins">
              Forgot Password
            </button>
          </div>
        </div>
        <div className="self-stretch h-[78px] flex-col justify-center items-center gap-2.5 flex">
          <button className="self-stretch p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-xl font-semibold font-['League Spartan']">
              Login
            </div>
          </button>
          <div className="w-[340px] relative border-t-2 border-t-gray-400" />
          <button className="text-black dark:text-white text-xs font-medium font-family-Poppins">
            Sign up instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
