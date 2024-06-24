import React from "react";

const ResetPasswordButton = () => {
  const goLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="self-stretch h-[78px] flex-col justify-center items-center gap-2.5 flex">
      <button className="self-stretch p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 dark:bg-gradient-to-br dark:from-violet-600 dark:to-violet-700 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
        <div
          className="text-white text-xl font-semibold league-spartan"
          onClick={goLogin}
        >
          Reset Password
        </div>
      </button>
    </div>
  );
};

export default ResetPasswordButton;
