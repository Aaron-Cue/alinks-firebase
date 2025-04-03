import { Route, Routes } from 'react-router-dom'
import App from '../App'
import ChooseUsername from '../pages/ChooseUsername'
import Dashboard from '../pages/Dashboard'
import EditProfile from '../pages/EditProfile'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import PublicProfile from '../pages/PublicProfile'
import SignOut from '../pages/SignOut'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<EditProfile />} />
      <Route path="signout" element={<SignOut />} />
      <Route path="u/:username" element={<PublicProfile />} />
      <Route path="choose-username" element={<ChooseUsername />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
