import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { loginWithGoogle } from '../firebase/auth'
import db from '../firebase/firestore'
import useAuth from '../hooks/useAuth'

export default function Login() {
  
  const { loading } = useAuth()
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle()
      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // redireccionar a register
        
        navigate('/register')
        
        return
      }
      // aqui el user esta registrado e hizo login
      // redireccionar a dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesion:', error)
    }
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  )
}
