import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  // const auth = useSelector((state) => state.user);
  let x = false;
  const auth = useSelector((state) => state.user).then((res) => {
    console.log(res);
    x = res !== null;
    return x ? <Outlet /> : <Navigate to="/login" />;
  });

  // <Navigate to="/login" />;
};

export default PrivateRoutes;
