import { Navigate, Outlet } from "react-router-dom";
// import useServerCheck from "../../hooks/useServerCheck";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/Context";
import api from "../../services/api";

const PrivateRouter = () => {
//   useServerCheck();
 
  
  if (!localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }
  const { user, logUser } = useContext(UserContext);

  useEffect(()=>{
    const getUser = async () => {
      try {
        
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data;
          logUser(prevUser => ({ ...prevUser, ...user }));
        console.log(user);

        }
      } catch (err) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
      }
    };
    getUser();
  },[])

  return <Outlet />;
};

export default PrivateRouter;