import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../firebase/auth'

export default function HeaderDashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result) {
        toast.success('Sesión cerrada correctamente', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        })
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('No se pudo cerrar sesión. Intenta de nuevo.')
    }
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Links</Link>
          </li>
          <li>
            <Link to="/dashboard/profile">Edit Profile</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </header>
  )
}
