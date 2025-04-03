import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  auth,
  handleUserStateChanged,
  loginWithGoogle,
  logout
} from '../firebase/auth'

export default function Login() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user) 
      handleUserStateChanged(user) 
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      {currentUser ? (
        <>
          <p>Hola, {currentUser.displayName}!</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>Iniciar sesión</button>
      )}
    </div>
  )
}
