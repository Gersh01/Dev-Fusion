import { useSelector,useDispatch } from "react-redux"


export const userSelector = () => {
    let auth = useSelector((state)=>state.user.value) 
    return auth
}


export default userSelector