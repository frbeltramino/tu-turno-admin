import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { AdminTurnoRoutes } from "../adminTurno/routes/AdminTurnoRoutes"


export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/*" element={<AdminTurnoRoutes />} />

    </Routes>
  )
}
