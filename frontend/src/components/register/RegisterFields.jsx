import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLock, MdMailOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RegisterFields = () => {
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
    <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch h-16 justify-start items-start gap-2.5 inline-flex">
        <div className="self-stretch h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
          <div className="justify-center items-center gap-[5px] inline-flex">
            <div className="text-black dark:text-white text-xs font-semibold poppins">
              First Name
            </div>
          </div>
          <div className="self-stretch border-b justify-start items-start inline-flex">
            <div className="flex grow">
              <input
                className="grow-bg-gray-200 grow text-black  dark:text-white dark:bg-gray-900"
                type="text"
                placeholder="First Name"
              ></input>
            </div>
          </div>
        </div>
        <div className="self-stretch grow h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
          <div className="justify-center items-center gap-[5px] inline-flex">
            <div className="text-black dark:text-white text-xs font-semibold poppins">
              Last Name
            </div>
          </div>
          <div className="self-stretch border-b justify-start items-start inline-flex">
            <div className="flex grow">
              <input
                className="grow-bg-gray-200 grow text-black  dark:text-white dark:bg-gray-900"
                type="text"
                placeholder="Last Name"
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
        <div className="justify-center items-center gap-[5px] inline-flex">
          <div className="w-[15px] h-[15px] relative">
            <div>
              <FaRegUserCircle className="dark:fill-white" />
            </div>
          </div>
          <div className="text-black dark:text-white text-xs font-semibold poppins">
            Username
          </div>
        </div>
        <div className="self-stretch border-b justify-start items-start inline-flex">
          <div className="flex grow">
            <input
              className="grow-bg-gray-200 grow text-black  dark:text-white dark:bg-gray-900"
              type="text"
              placeholder="Username"
            ></input>
          </div>
        </div>
      </div>
      <div className="self-stretch h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
        <div className="justify-center items-center gap-[5px] inline-flex">
          <div className="w-[15px] h-[15px] relative">
            <div>
              <MdMailOutline className="dark:fill-white" />
            </div>
          </div>
          <div className="text-black dark:text-white text-xs font-semibold poppins">
            Email
          </div>
        </div>
        <div className="self-stretch border-b justify-start items-start inline-flex">
          <div className="flex grow">
            <input
              className="grow-bg-gray-200 grow text-black  dark:text-white dark:bg-gray-900"
              type="text"
              placeholder="Email"
            ></input>
          </div>
        </div>
      </div>
      <div className="self-stretch h-16 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
        <div className="justify-center items-center gap-[5px] inline-flex">
          <div className="w-[15px] h-[15px] relative fill-white">
            <MdOutlineLock className="dark:fill-white" />
          </div>
          <div className="text-black  dark:text-white  text-xs font-semibold poppins">
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
              <AiOutlineEyeInvisible className="dark:fill-white" size={25} />
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
          <div className="text-black dark:text-white text-xs font-normal poppins">
            Remember Me
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFields;
