import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  auth,
  handleUserStateChanged,
  loginWithGoogle,
  logout
} from '../firebase/auth'
import db from '../firebase/firestore'

export default function Login() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle()
      if (!user) return // si no hay user, no hacemos nada

      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // si el user no esta registrado, lo registramos
        // guardar el usuario en la bbdd firestore
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        })
        console.log('Usuario registrado')
        // redireccionar a chooseUsername
        navigate('/chooseUsername')
      }
      // aqui el user esta registrado e hizo login
      // redireccionar a dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesion:', error)
    }
  }

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
        <button onClick={handleLogin}>Iniciar sesión con Google</button>
      )}
    </div>
  )
}
