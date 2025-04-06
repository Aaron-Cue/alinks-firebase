import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import app from './config.js'

export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider)
    const user = res.user
    return user
  } catch (error) {
    console.error('Error al iniciar sesion:', error)
    return null
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    console.error('Error al cerrar sesion:', error)
    return false
  }
}

export const handleUserStateChanged = user => {
  if (user) {
    console.log('Usuario:', user.displayName)
  } else {
    console.log('No hay usuario autenticado')
  }
}
