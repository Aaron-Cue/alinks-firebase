import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function AccessRoute({ type, children }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <h1>Cargando...</h1>
  

  switch (type) {
    case 'private':
      return currentUser ? children : <Navigate to="/login" replace />

    case 'public':
      // si no estoy registrado 
      if (currentUser && !('username' in currentUser)) {
        return <Navigate to="/register" replace />
      }
      return currentUser ? <Navigate to="/dashboard" replace /> : children

    case 'register':
      if (currentUser && ('username' in currentUser)) {
        return <Navigate to="/dashboard" replace />
      } else if (currentUser) {
        return children
      } else {
        return <Navigate to="/login" replace />
      }

    default:
      console.warn(`access type: "${type}" no reconocido`)
      return <Navigate to="/" replace />
  }
}
