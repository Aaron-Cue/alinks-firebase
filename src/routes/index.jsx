import { Route, Routes } from 'react-router-dom'
import ChooseUsername from '../pages/ChooseUsername'
import Dashboard from '../pages/Dashboard'
import EditProfile from '../pages/EditProfile'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import PublicProfile from '../pages/PublicProfile'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<EditProfile />} />
      <Route path="u/:username" element={<PublicProfile />} />
      <Route path="choose-username" element={<ChooseUsername />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
