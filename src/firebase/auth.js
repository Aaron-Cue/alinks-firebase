import { getAuth } from 'firebase/auth'
import app from './config.js'

const auth = getAuth(app)

export const loginWithGoogle = () => {
  console.log(auth)
}

export const logout = () => {}
