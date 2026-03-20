import { Navigate, Outlet } from "react-router-dom"
import { getToken } from "../api/authApi"
import AppNavbar from "../components/AppNavbar"

const ProtectedRoute = () => {
  const token = getToken()
  if (!token) return <Navigate to="/login" replace />

  return (
    <>
      <AppNavbar /> 
      <Outlet />
    </>
  )
}

export default ProtectedRoute