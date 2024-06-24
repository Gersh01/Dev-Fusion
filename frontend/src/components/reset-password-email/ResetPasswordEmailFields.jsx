import { MdMailOutline } from "react-icons/md";
import Input from "../reusable/Input";

const ResetPasswordEmailFields = () => {
	return (
		<Input titleText="Email" placeholder="Email" icon={<MdMailOutline />} />
	);
};

export default ResetPasswordEmailFields;
