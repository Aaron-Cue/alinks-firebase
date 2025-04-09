import { Route, Routes } from 'react-router-dom'
import ChooseUsername from '../pages/ChooseUsername'
import Dashboard from '../pages/Dashboard'
import EditProfile from '../pages/EditProfile'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import PublicProfile from '../pages/PublicProfile'
import UserNotFound from '../pages/UserNotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<EditProfile />} />
      <Route path="user/:username" element={<PublicProfile />} />
      <Route path="register" element={<ChooseUsername />} />
      <Route path="user/notFound" element={<UserNotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
