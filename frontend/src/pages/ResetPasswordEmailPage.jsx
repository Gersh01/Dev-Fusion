import { MdMailOutline } from "react-icons/md";
import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";
import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import Axios from "axios";
import { apiDomain } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import { validResetPasswordEmail } from "../utils/validations";

const ResetPasswordEmailPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [sendResetEmail, setSendResetEmail] = useState(true);

    const sendResetPasswordRequest = async () => {
        const payload = { email: email };
        const validationErrors = validResetPasswordEmail(payload);

        setErrors(validationErrors);
        let hasValidationErrors = false;

        for (const errorType in validationErrors) {
            if (validationErrors[errorType].length !== 0) {
                hasValidationErrors = true;
                break;
            }
        }
        if (hasValidationErrors === false && sendResetEmail) {
            try {
                const response = await Axios.post(
                    apiDomain + "/api/forgot_password/send",
                    payload,
                    {
                        withCredentials: true,
                    }
                );
                if (response) {
                    setSuccess(true);
                    setSendResetEmail(false);
                    setTimeout(() => {
                        setSendResetEmail(true);
                        setSuccess(false);
                    }, 100000);
                }
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
        } else {
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const successMessage = () => {
        if (success) {
            return (
                <p className="league-spartan text-xl text-center font-semibold">
                    The email has successfully beeen sent!
                </p>
            );
        }
    };

    return (
        <AuthPanel width={480} minHeight={500}>
            <div className="flex flex-col justify-center items-center gap-2">
                <p className="league-spartan dark:text-white text-2xl font-semibold">
                    Reset Password
                </p>
                <p className="poppins dark:text-white">
                    Enter your email to reset your password
                </p>
            </div>
            <Input
                titleText="Email"
                placeholder="Email"
                icon={<MdMailOutline />}
                onChange={(e) => setEmail(e.target.value)}
                errors={errors.email}
                onFocus={() => {
                    setErrors({ ...errors, email: [] });
                }}
            />
            {successMessage()}
            <div className="flex-col flex gap-3">
                <Button large onClick={sendResetPasswordRequest}>
                    Submit
                </Button>
                <hr></hr>
                <button
                    className="text-black dark:text-white text-sm font-medium poppins"
                    onClick={goToLogin}
                >
                    Go back to Login
                </button>
            </div>
        </AuthPanel>
    );
};

export default ResetPasswordEmailPage;
