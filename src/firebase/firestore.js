import { toast } from 'react-toastify'
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
import app from './config.js'

const db = getFirestore(app)

export const usernameAvailable = async username => {
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

export const registerUser = async (user, username) => {
  try {
    const userRef = doc(db, 'users', user.uid)

    await setDoc(userRef, {
      username: username,
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

export const updateUser = async (user, data) => {
  try {
    const userRef = doc(db, 'users', user.uid)

    await updateDoc(userRef, {
      ...data
    })

    toast.success('successful update', {
      position: 'bottom-right',
      autoClose: 1800,
      theme: 'dark'
    })
  } catch (error) {
    toast.error('Hubo un error al actualizar. Intenta de nuevo.', {position: 'bottom-right'})
    console.error('Error updating user:', error)
  }
}

export const getLinksUser = async user => {
  try {
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data()
    if (!userData.links) {
      return []
    }

    return userData.links
  } catch (error) {
    console.error('Error getting user links:', error)
    return []
  }
}

export default db
