import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import ChooseUsername from './routes/ChooseUsername.jsx'
import Dashboard from './routes/Dashboard.jsx'
import EditProfile from './routes/EditProfile.jsx'
import Login from './routes/Login.jsx'
import PublicProfile from './routes/PublicProfile.jsx'
import SignOut from './routes/SignOut.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<EditProfile />} />
      <Route path="signout" element={<SignOut />} />
      <Route path="u/:username" element={<PublicProfile />} />
      <Route path="choose-username" element={<ChooseUsername />} />
    </Routes>
  </BrowserRouter>
)
