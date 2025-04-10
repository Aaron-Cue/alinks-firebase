import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function AccessRoute({ type, children }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <h1>Cargando...</h1>

  switch (type) {
    case 'private':
      return currentUser ? children : <Navigate to="/login" replace />

    case 'public':
      return currentUser ? <Navigate to="/dashboard" replace /> : children

    case 'both':
      return currentUser ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Navigate to="/login" replace />
      )

    default:
      console.warn(`access type: "${type}" no reconocido`)
      return <Navigate to="/" replace />
  }
}
