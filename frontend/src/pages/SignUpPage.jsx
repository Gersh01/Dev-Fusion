import AuthHeader from "../components/reusable/AuthHeader";
import Input from "../components/reusable/Input";
import { MdAccountCircle, MdLockOpen, MdEmail } from "react-icons/md";
import Button from "../components/reusable/Button";
import AuthPanel from "../components/reusable/AuthPanel";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { apiDomain } from "../utils/utility";
import { setVerificationEmail } from "../store/slices/systemSlice";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/validations";
const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordField, setPasswordField] = useState(false);

    const goToLogin = () => {
        navigate("/login");
    };

    const doRegister = async (e) => {
        const registerAttempt = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
        };
        const validationErrors = validateRegister(registerAttempt);

        setErrors(validationErrors);
        let hasValidationErrors = false;

        for (const errorType in validationErrors) {
            if (validationErrors[errorType].length !== 0) {
                hasValidationErrors = true;
                console.log("Validation errors are the following: ");
                console.log(validationErrors);
                break;
            }
        }

        if (hasValidationErrors === false) {
            console.log("Sending new registration!");
            // 	try {
            // 		const response = await Axios.post(
            // 			apiDomain + "/api/register",
            // 			registerAttempt
            // 		);
            // 		if (response && response.status === 201) {
            // 			dispatch(setVerificationEmail(email));
            // 			navigate("/email-verification");
            // 		}
            // 	} catch (err) {
            // 		let errorMessage = err.response.data.error;
            // 		if (errorMessage === "email is taken") {
            // 			setErrors({
            // 				...errors,
            // 				email: ["Email is already Taken"],
            // 			});
            // 		}
            // 		if (errorMessage === "username is taken") {
            // 			setErrors({
            // 				...errors,
            // 				username: ["Username is already Taken"],
            // 			});
            // 		}
            // 	}
        }
    };
    const showPasswordField = () => {
        setPasswordField(true);
    };
    const hidePasswordField = () => {
        setPasswordField(false);
    };

    return (
        <AuthPanel width={480} minHeight={750}>
            <AuthHeader title="Sign Up" />
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2 min-w-0">
                    <Input
                        titleText="First Name"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        errors={errors.firstName}
                        onFocus={() => {
                            setErrors({ ...errors, firstName: [] });
                        }}
                    />
                    <Input
                        titleText="Last Name"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        errors={errors.lastName}
                        onFocus={() => {
                            setErrors({ ...errors, lastName: [] });
                        }}
                    />
                </div>
                <Input
                    titleText="Username"
                    placeholder="Username"
                    icon={<MdAccountCircle />}
                    onChange={(e) => setUsername(e.target.value)}
                    errors={errors.username}
                    onFocus={() => {
                        setErrors({ ...errors, username: [] });
                    }}
                />
                <Input
                    titleText="Email"
                    placeholder="Email"
                    icon={<MdEmail />}
                    onChange={(e) => setEmail(e.target.value)}
                    errors={errors.email}
                    onFocus={() => {
                        setErrors({ ...errors, email: [] });
                    }}
                />
                <Input
                    titleText="Password"
                    placeholder="Password"
                    icon={<MdLockOpen />}
                    password
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                        [
                            showPasswordField(),
                            setErrors({ ...errors, password: [] }),
                        ];
                    }}
                    errors={errors.password}
                    onBlur={hidePasswordField}
                />
                <div className="grid ">
                    <div className=" h-20 flex flex-col grow dark:text-white text-sm">
                        {passwordField && (
                            <PasswordChecklist
                                className="poppins"
                                rules={[
                                    "capital",
                                    "specialChar",
                                    "minLength",
                                    "number",
                                    "maxLength",
                                ]}
                                maxLength={24}
                                minLength={8}
                                value={password}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Button large onClick={doRegister}>
                    Sign Up
                </Button>
                <hr></hr>
                <button
                    className="text-black dark:text-white text-sm font-medium poppins"
                    onClick={goToLogin}
                >
                    Login instead
                </button>
            </div>
        </AuthPanel>
    );
};

export default SignUpPage;
