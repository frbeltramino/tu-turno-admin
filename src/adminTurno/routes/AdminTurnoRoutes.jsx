import { Navigate, Route, Routes } from "react-router-dom"
import { AdminTurnoPage } from "../pages/AdminTurnoPage"
import { AdminHistoricoTurnosPage } from "../pages/AdminHistoricoTurnosPage"
import { RegisterPage } from "../pages"


export const AdminTurnoRoutes = () => {
  return (
    <Routes>
      <Route path="/adminTurno" element={<AdminTurnoPage />} />

      <Route path="/adminHistoricoTurnos" element={<AdminHistoricoTurnosPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<Navigate to="/adminTurno" />} />

    </Routes>
  )
}
