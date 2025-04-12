import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../firebase/auth'

import '../styles/HeaderDashboard.css'

export default function HeaderDashboard() {
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setDisabled(true)
      const result = await logout()
      if (result) {
        toast.success('Sesión cerrada correctamente', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark'
        })
        setDisabled(false)
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('No se pudo cerrar sesión. Intenta de nuevo.')
    }
  }

  return (
    <header className="header-dashboard">
      <div className="header-dashboard_content">
        <nav>
          <ul className='header-dashboard_ul'>
            <li>
              <Link to="/dashboard">Links</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Edit Profile</Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          disabled={disabled}
          className="btn-logout"
        >
          <span>Cerrar sesion</span>
        </button>
      </div>
    </header>
  )
}
