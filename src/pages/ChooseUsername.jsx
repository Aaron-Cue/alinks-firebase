import { useNavigate } from 'react-router-dom'
import { registerUser, usernameAvailable } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'

export default function ChooseUsername() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const username = formData.get('username')

    // chequear que el username no este en uso.
    const available = await usernameAvailable(username)
    if (!available) {
      // mostrar error de username no disponible
      return
    }

    // si no esta en uso, registrar el user en firestore
    const result = await registerUser(currentUser, username)
    if (!result) {
      // mostrar error de registro
      return
    }

    //  y redirigir a dashboard
    navigate('/dashboard')
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
