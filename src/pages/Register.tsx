import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import { registerUser, usernameAvailable } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'

import '../styles/Register.css'

export default function Register() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser, loading } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const username = formData.get('username')

    if (typeof username !== 'string') {
      throw new Error('Username is required')
    }

    // chequear que el username no este en uso.
    const available = await usernameAvailable(username)
    if (!available) {
      setIsLoading(false)
      toast.error('El nombre de usuario ya está en uso.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'dark'
      })
      return
    }


    
    // si no esta en uso, registrar el user en firestore y actualizar el estado de currentUser
    const result = await registerUser(currentUser, username)
    if (!result) {
      toast.error('Error al registrar el usuario.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'dark'
      })
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setCurrentUser({ ...currentUser, username })

    //  y redirigir a dashboard
    navigate('/dashboard')
  }

  if (loading) {
    return <main className='container'>Cargando...</main>
  }

  return (
    <main className="container">
      <h1 className="login-h1">Elige tu nombre de usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            name="username"
            type="text"
            placeholder="Usuario"
            required
            minLength={3}
            maxLength={20}
            pattern="^[A-Za-z]+( [A-Za-z]+)*$"
            title="Solo letras y espacios entre palabras."
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading ? 'Verificando...' : 'Continuar'}
        </Button>
      </form>
    </main>
  )
}
