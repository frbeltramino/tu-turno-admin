import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import tuTurnoApi from "../api/tuTurnoApi";


export const useAuth = () => {

  const { user, setUser, error, setError, loadingLogin, setLoadingLogin, setAuthStatus } = useContext(AuthContext);


  const startLogin = async( {email, password}) => {

    setLoadingLogin(true);

    try {
      const response = await tuTurnoApi.post("/auth", { email, password });
  
      const data = response.data;
  
      if (!data.ok) {
        throw new Error(data.message || "Error en el login");
      }
       // Guardar token en localStorage o en el contexto
       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));
       setUser(data.user);
       setAuthStatus('authenticated');
       setOnAutenticateAction(false);

    } catch (error) {
      setError(error.response.data?.message || "Credenciales incorrectas");
      console.log(error);
      setTimeout(() => {
      setError("");
      }, 3000);
    } finally {
      setLoadingLogin(false);
    }

  }


    return {
      startLogin
    }


}