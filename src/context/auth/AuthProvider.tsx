import { useFirebaseAuth } from '../../hooks/useFirebaseAuth'
import { AuthContext } from './Auth'

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children } : AuthProviderProps) {
  const { currentUser, setCurrentUser, loading } = useFirebaseAuth()
  if(currentUser?.username)
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
