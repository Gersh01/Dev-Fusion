import AuthPanel from "../components/reusable/AuthPanel";
import { useNavigate } from "react-router-dom";

const EmailVerificationErrorPage = () => {
    const navigate = useNavigate();

    const redirectToRegister = () => {
        navigate("/signup");
    };

    return (
        <AuthPanel width={480} minHeight={600}>
            <div className="flex flex-col gap-10 text-black text-2xl dark:text-white text-center">
                <p className="text-3xl font-semibold league-spartan">
                    Email Verification Error
                </p>
                <p className="league-spartan">
                    There was an error while trying to verify your account.
                    Please try creating a new account with us today!
                </p>
            </div>
            <button
                className="font-semibold justify-center underline text-xl league-spartan"
                onClick={redirectToRegister}
            >
                Click here to sign up
            </button>
        </AuthPanel>
    );
};

export default EmailVerificationErrorPage;
