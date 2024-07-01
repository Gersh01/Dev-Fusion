import AuthPanel from "../components/reusable/AuthPanel";
import { useNavigate } from "react-router-dom";

const VerifiedUsersWelcomePage = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <AuthPanel width={480} minHeight={600}>
      <p className="text-black text-3xl font-semibold dark:text-white league-spartan text-center">
        Welcome to Dev Fusion!
      </p>
      <p className="text-black text-2xl font-semibold dark:text-white league-spartan text-center">
        Your account has been successfully verified. We're excited to have you
        join our open-source community. Let's create, collaborate, and innovate
        together!
      </p>
      <p className="text-black text-2xl font-semibold dark:text-white league-spartan text-center">
        Happy Coding!
      </p>
      <p className="text-black text-2xl font-semibold dark:text-white league-spartan text-center">
        - The Dev Fusion Team
      </p>
      <button
        onClick={goToLogin}
        className="text-black font-semibold justify-center dark:text-white league-spartan text-xl"
      >
        Click here to sigin to your new account
      </button>
    </AuthPanel>
  );
};

export default VerifiedUsersWelcomePage;
