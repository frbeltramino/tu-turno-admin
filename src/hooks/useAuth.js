import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import tuTurnoApi from "../api/tuTurnoApi";



export const useAuth = () => {

  const { 
    user,
    setUser,
    errorLogin,
    setErrorLogin,
    loadingLogin,
    setLoadingLogin,
    setAuthStatus,
    authStatus,
    login,
    logout,
    errorRegister,
    setErrorRegister,
    loadingRegister,
    setLoadingRegister
   } = useContext(AuthContext);


  const startLogin = async( {email, password}) => {

    setLoadingLogin(true);

    try {
      const response = await tuTurnoApi.post("/admin/auth/login", { email, password });
  
      const data = response.data;
  
      if (!data.ok) {
        throw new Error(data.message || "Error en el login");
      }
       // Guardar token en localStorage o en el contexto
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));
       login(data.user);
       setUser(data.user);
       setErrorLogin("");

    } catch (error) {
      setErrorLogin(error.response.data?.message || "Credenciales incorrectas");
      console.log(error);
      setTimeout(() => {
      }, 3000);
    } finally {
      setLoadingLogin(false);
    }

  }

  const startLogout = async() => {
    logout();
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) { startLogout() }
    try {
      const { data } = await tuTurnoApi.get("admin/auth/renew");
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      startLogout();
    }
  };

  const startRegister = async ({ name, email, phone, password }) => {
    setLoadingRegister(true);

    try {
      const response = await tuTurnoApi.post("/admin/auth/new", { name, email, phone, password });

      const data = response.data;

      if (!data.ok) {
        throw new Error(error.response.data?.message || "Error en el Registro de usuario");
      }

    } catch (error) {
      setErrorRegister(error.response.data?.message || "Error en el Registro de usuario");
    } finally {
      setLoadingRegister(false);
    }
  }


    return {
      startLogin,
      startLogout,
      checkAuthToken,
      startRegister
    }


}