import { Navigate, Outlet } from "react-router-dom";
// import useServerCheck from "../../hooks/useServerCheck";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/Context";
import api from "../../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PrivateRouter = () => {
  console.log("PrivateRouter renderizou");
  //   useServerCheck();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  // const { user, logUser } = useContext(UserContext);

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token não encontrado");
    }

    try {
      const response = await api.get("api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      localStorage.removeItem("token");
      throw err; // importante!
    }
  };
  // getCurrentUser();
  // console.log("Antes do useQuery");
const {
  data: user,
  isPending,
  isError,
} = useQuery({
  queryKey: ["me"],
  queryFn: getCurrentUser,
  retry: false,
});

if (isPending) {
  return <div>Carregando...</div>;
}

if (isError) {
  localStorage.removeItem("token");
  return <Navigate to="/" replace />;
}

return <Outlet />;
};

export default PrivateRouter;
