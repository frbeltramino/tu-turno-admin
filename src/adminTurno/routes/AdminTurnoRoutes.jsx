import { Navigate, Route, Routes } from "react-router-dom"
import { AdminTurnoPage } from "../pages/AdminTurnoPage"


export const AdminTurnoRoutes = () => {
  return (
    <Routes>
      <Route path="/adminTurno" element={<AdminTurnoPage />} />

      <Route path="*" element={<Navigate to="/adminTurno" />} />

    </Routes>
  )
}
