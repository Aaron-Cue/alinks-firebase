import { toast } from 'react-toastify'
import type { DocumentData } from 'firebase/firestore'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { ExtendedFirebaseUser } from '../types/auth'
import { DataUser, Link } from '../types/user'
import app from './config.js'

const db = getFirestore(app)

export const usernameAvailable = async (username: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))
    const querySnap = await getDocs(q)

    return querySnap.empty
  } catch (error) {
    console.error('Error checking username availability:', error)
    return false
  }
}

export const usernameExists = async (username: string): Promise<boolean> => {
  const res = await usernameAvailable(username)
  return !res
}

export const registerUser = async (
  user: ExtendedFirebaseUser,
  username: string
): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', user.uid)

    await setDoc(userRef, {
      username: username.toLowerCase(),
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    })
    return true
  } catch (error) {
    console.error('Error registering user:', error)
    return false
  }
}

export const updateUser = async (
  user: ExtendedFirebaseUser,
  data: DataUser
): Promise<boolean> => {
  try {
    if (data.username) {
      // chequear si esta disponible
      const available = await usernameAvailable(data.username)
      if (!available) {
        toast.error('El nombre de usuario ya está en uso.', {
          position: 'bottom-right',
          autoClose: 1800,
          theme: 'dark'
        })
        return false
      }
    }

    const userRef = doc(db, 'users', user.uid)

    await updateDoc(userRef, {
      ...data
    })

    toast.success('successful update', {
      position: 'bottom-right',
      autoClose: 1800,
      theme: 'dark'
    })
    return true
  } catch (error) {
    toast.error('Hubo un error al actualizar. Intenta de nuevo.', {
      position: 'bottom-right'
    })
    console.error('Error updating user:', error)
    return false
  }
}

export const getLinksUser = async (
  user: ExtendedFirebaseUser
): Promise<Link[]> => {
  try {
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data()
    if (!userData?.links) {
      return []
    }

    return userData?.links
  } catch (error) {
    console.error('Error getting user links:', error)
    return []
  }
}

export const getUser = async (
  username: string
): Promise<DocumentData | null> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))
    const querySnap = await getDocs(q)

    if (querySnap.empty) {
      return null
    }

    const userDoc = querySnap.docs[0]
    const userData = userDoc.data()

    return userData
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export default db
