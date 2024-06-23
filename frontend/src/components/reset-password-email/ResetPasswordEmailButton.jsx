import React from "react";

export const ResetPasswordEmailButton = () => {
  return (
    <div className="self-stretch pt-10 h-[78px] flex-col justify-center items-center gap-2.5 flex">
      <button className="self-stretch p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-white text-xl font-semibold league-spartan">
          Submit
        </div>
      </button>
    </div>
  );
};
