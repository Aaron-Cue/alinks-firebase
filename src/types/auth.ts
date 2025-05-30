import type { User as FirebaseUser } from 'firebase/auth'

export type ExtendedFirebaseUser = FirebaseUser & {
  username?: string
}

export type AuthContextType = {
  currentUser: ExtendedFirebaseUser | null
  setCurrentUser: React.Dispatch<
    React.SetStateAction<ExtendedFirebaseUser | null>
  >
  loading: boolean
}