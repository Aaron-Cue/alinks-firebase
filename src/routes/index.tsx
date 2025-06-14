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
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route path="/login" element={<Login />} />
      <Route path="user/:username" element={<PublicProfile />} />
      <Route path="user/notFound" element={<UserNotFound />} />
      <Route
        path="*"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <NotFound />
          </Suspense>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <AuthProvider>
              <AccessRoute type="private">
                <Dashboard />
              </AccessRoute>
            </AuthProvider>
          </Suspense>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <AuthProvider>
              <AccessRoute type="private">
                <EditProfile />
              </AccessRoute>
            </AuthProvider>
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <AuthProvider>
              <AccessRoute type="register">
                <Register />
              </AccessRoute>
            </AuthProvider>
          </Suspense>
        }
      />
    </Routes>
  )
}
