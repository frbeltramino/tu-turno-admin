import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { AdminTurnoRoutes } from "../adminTurno/routes/AdminTurnoRoutes"
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useAuth } from "../hooks";


export const AppRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { checkAuthToken } = useAuth();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>

      {
        isAuthenticated
          ? <Route path="/*" element={<AdminTurnoRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/adminTurno" : "/auth/login"} />}
      />

    </Routes>
  )
}
