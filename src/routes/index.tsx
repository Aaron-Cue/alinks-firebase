import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AccessRoute from '../components/AccessRoute'
import AuthProvider from '../context/auth/AuthProvider'

const PublicProfile = lazy(() => import('../pages/PublicProfile'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const EditProfile = lazy(() => import('../pages/EditProfile'))
const Inicio = lazy(() => import('../pages/Inicio'))
const Login = lazy(() => import('../pages/Login'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Register = lazy(() => import('../pages/Register'))
const UserNotFound = lazy(() => import('../pages/UserNotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="user/:username" element={<PublicProfile />} />
        <Route path="user/notFound" element={<UserNotFound />} />
        <Route path="*" element={<NotFound />} />

        {/* Rutas privadas */}
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <AccessRoute type="private">
                <Dashboard />
              </AccessRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <AuthProvider>
              <AccessRoute type="private">
                <EditProfile />
              </AccessRoute>
            </AuthProvider>
          }
        />
        <Route
          path="/register"
          element={
            <AuthProvider>
              <AccessRoute type="register">
                <Register />
              </AccessRoute>
            </AuthProvider>
          }
        />
      </Routes>
    </Suspense>
  )
}
