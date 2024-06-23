import React from "react";
import { MdMailOutline } from "react-icons/md";

const ResetPasswordEmailFields = () => {
  return (
    <div className="flex-fill w-full h-18 p-2.5 bg-gray-200 dark:bg-gray-900 rounded-[5px] shadow border border-none flex-col justify-start items-start gap-[5px] flex">
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
  );
};

export default ResetPasswordEmailFields;
