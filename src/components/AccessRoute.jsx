import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function AccessRoute({ type, children }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <main className='container'>Cargando...</main>
  

  switch (type) {
    case 'private':
      return currentUser ? children : <Navigate to="/login" replace />

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
