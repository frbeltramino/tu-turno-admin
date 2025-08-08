import { Navigate, Route, Routes } from "react-router-dom"
import { AdminTurnoPage } from "../pages/AdminTurnoPage"
import { AdminHistoricoTurnosPage } from "../pages/AdminHistoricoTurnosPage"
import { RegisterPage } from "../pages"
import { HolidaysPage } from "../pages/HolidaysPage"
import { ProfessionalsPage } from "../pages/ProfessionalsPage"
import { ServicesPage } from "../pages/ServicesPage"


export const AdminTurnoRoutes = () => {
  return (
    <Routes>
      <Route path="/adminTurno" element={<AdminTurnoPage />} />

      <Route path="/adminHistoricoTurnos" element={<AdminHistoricoTurnosPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/holidays" element={<HolidaysPage />} />

      <Route path="/professionals" element={<ProfessionalsPage />} />

      <Route path="/services" element={<ServicesPage />} />

      <Route path="*" element={<Navigate to="/adminTurno" />} />

    </Routes>
  )
}
