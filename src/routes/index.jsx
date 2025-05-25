import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AccessRoute from '../components/AccessRoute'

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
    </Suspense>
  )
}
