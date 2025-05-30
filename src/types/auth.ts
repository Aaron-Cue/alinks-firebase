import type { User as FirebaseUser } from 'firebase/auth'

export type AuthContextType = {
  currentUser: FirebaseUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>
  loading: boolean
}