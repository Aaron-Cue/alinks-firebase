import { useContext } from 'react'
import { AuthContext } from '../context/auth/Auth'

const useAuth = () => useContext(AuthContext)
export default useAuth
