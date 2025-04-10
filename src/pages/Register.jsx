import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, usernameAvailable } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'

export default function Register() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser, loading } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const username = formData.get('username')

    // chequear que el username no este en uso.
    const available = await usernameAvailable(username)
    if (!available) {
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
      return
    }

    setCurrentUser({ ...currentUser, username })

    //  y redirigir a dashboard
    navigate('/dashboard')
  }

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <>
      <h1>Elige tu nombre de usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          required
          minLength={3}
          maxLength={20}
          pattern="^[A-Za-z]+( [A-Za-z]+)*$"
          title="Solo letras y espacios entre palabras."
        />
        <button type="submit">Continuar</button>
      </form>
    </>
  )
}
