import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import { toast } from "react-toastify";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // send log out api call
      await logoutApiCall();
      // clear local storage
      dispatch(logout());
      //back to homepage
      navigate("/");
      //tell user
      toast.success("You're Logged Out");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
