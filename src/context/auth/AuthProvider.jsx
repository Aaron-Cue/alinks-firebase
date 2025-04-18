import { useFirebaseAuth } from '../../hooks/useFirebaseAuth'
import { AuthContext } from './Auth'

export default function AuthProvider({ children }) {
  const { currentUser, setCurrentUser, loading } = useFirebaseAuth()

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
