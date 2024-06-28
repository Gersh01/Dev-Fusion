import { useSelector,useDispatch } from "react-redux"
import { addUser } from "../../store/slices/userSlice";

export const userSelector = () => {


    let auth = useSelector((state)=>state.user.value) 
    return auth

}


export default userSelector