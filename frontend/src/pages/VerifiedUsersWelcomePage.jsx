import AuthPanel from "../components/reusable/AuthPanel";
import { useNavigate } from "react-router-dom";

const VerifiedUsersWelcomePage = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <AuthPanel width={480} minHeight={600}>
            <div className="flex flex-col gap-10 text-black text-2xl dark:text-white text-center">
                <p className="text-3xl font-semibold league-spartan">
                    Welcome to Dev Fusion!
                </p>
                <p className="league-spartan">
                    Your account has been successfully verified. We're excited
                    to have you join our open-source community. Let's create,
                    collaborate, and innovate together!
                </p>
                <p className="league-spartan">Happy Coding!</p>
                <p className="league-spartan">- The Dev Fusion Team</p>
            </div>
            <button
                onClick={goToLogin}
                className="font-semibold justify-center underline text-xl league-spartan"
            >
                Click here to sign in to your new account
            </button>
        </AuthPanel>
    );
};

export default VerifiedUsersWelcomePage;
