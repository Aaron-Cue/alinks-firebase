import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth } from '../firebase/auth'
import db from '../firebase/firestore'

export function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)
        const userData = userSnap.exists() ? userSnap.data() : {}
        // merge
        setCurrentUser({ ...user, ...userData })
      } else {
        setCurrentUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { currentUser, setCurrentUser, loading }
}
