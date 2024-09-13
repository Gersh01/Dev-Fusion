import AuthPanel from "../components/reusable/AuthPanel";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useState } from "react";
import { apiDomain } from "../utils/utility";

const EmailverificationPage = () => {
    const email = useSelector((state) => state.system.email);
    const [emailMessage, setEmailMesssage] = useState("");
    const [emailTimer, setEmailTimer] = useState(true);

    const resendEmail = async () => {
        if (emailTimer) {
            setEmailTimer(false);
            const payload = { email: email };
            try {
                const response = await Axios.post(
                    apiDomain + "/api/resend_verification_email",
                    payload,
                    { withCredentials: true }
                );

                if (response) {
                    setEmailMesssage("Email has been successfully sent");
                }
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
            setTimeout(() => {
                setEmailTimer(true);
                setEmailMesssage("");
            }, 10000);
        }
    };

    return (
        <AuthPanel width={480} minHeight={600}>
            <p className="text-black text-3xl font-semibold dark:text-white league-spartan text-center">
                Please Verify Your Email
            </p>
            <div className="flex flex-col gap-5">
                <div className="px-2.5 text-center text-black text-xl font-normal league-spartan dark:text-white">
                    We have sent you a link to{" "}
                </div>
                <div className="text-center text-black text-xl font-semibold league-spartan dark:text-white">
                    {email}
                </div>
                <div className="px-16 text-center text-black text-xl league-spartan dark:text-white">
                    Click on the link to complete your registration
                </div>
            </div>
            <button
                onClick={resendEmail}
                className="text-black font-semibold justify-center dark:text-white underline league-spartan text-xl"
            >
                Click here to resend the email
            </button>
            <p className="flex justify-center text-center">{emailMessage}</p>
        </AuthPanel>
    );
};

export default EmailverificationPage;
