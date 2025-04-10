import { Route, Routes } from 'react-router-dom'
import AccessRoute from '../components/AccessRoute'
import Dashboard from '../pages/Dashboard'
import EditProfile from '../pages/EditProfile'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import PublicProfile from '../pages/PublicProfile'
import Register from '../pages/Register'
import UserNotFound from '../pages/UserNotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route
        path="/login"
        element={
          <AccessRoute type="public">
            <Login />
          </AccessRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AccessRoute type="private">
            <Dashboard />
          </AccessRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <AccessRoute type="private">
            <EditProfile />
          </AccessRoute>
        }
      />
      <Route path="user/:username" element={<PublicProfile />} />
      <Route
        path="/register"
        element={
          <AccessRoute type="register">
            <Register />
          </AccessRoute>
        }
      />
      <Route path="user/notFound" element={<UserNotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
