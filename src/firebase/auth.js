import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './config.js'

export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider)
    console.log('Usuario:', res.user)
  } catch (error) {
    console.error('Error al iniciar sesion:', error)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    console.log('Sesion cerrada')
  } catch (error) {
    console.error('Error al cerrar sesion:', error)
  }
}

export const handleUserStateChanged = (user) => {
  if (user) {
    console.log('Usuario:', user.displayName)
  } else {
    console.log('No hay usuario autenticado')
  }
}
