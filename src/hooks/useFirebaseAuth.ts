import { useEffect, useState } from 'react'
import type { User as FirebaseUser } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth } from '../firebase/auth'
import db from '../firebase/firestore'
import { AuthContextType } from '../types/auth'

export function useFirebaseAuth(): AuthContextType {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

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
