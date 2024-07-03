import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  // const auth = useSelector((state) => state.user);
  let x = false;
  const auth = useSelector((state) => state.user).then((res) => {
    x = res !== null;
    return x ? <Outlet /> : navigate("/login");
  });
  return auth ? <Outlet /> : navigate("/login");
  // <Navigate to="/login" />;
};

export default PrivateRoutes;
