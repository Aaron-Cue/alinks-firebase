import { toast } from 'react-toastify'
import HeaderDashboard from '../components/HeaderDashboard'
import { updateUser } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'
import { uploadImageToCloudinary } from '../services/cloudinary'

import '../styles/EditProfile.css'

export default function EditProfile() {
  const { currentUser, setCurrentUser, loading } = useAuth()

  const handleSubmitChangeUsername = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUsername = formData.get('username')

    // actualizar el username en firestore y en el estado de currentUser
    const res = await updateUser(currentUser, { username: newUsername })

    if (res) setCurrentUser({ ...currentUser, username: newUsername })
    else console.error('Error updating username')
  }

  const handleSubmitChangePhoto = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('picture')

    if (!(file instanceof File)) {
      toast.error('No se ha seleccionado un archivo válido', { theme: 'dark' })
      return
    }

    // validaciones
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    const maxSize = 20 * 1024 * 1024 // 20mb

    if (!allowedTypes.includes(file.type)) {
      toast.error('tipo invalido (jpg, jpeg, png, webp)', { theme: 'dark' })
      return
    }

    if (file.size > maxSize) {
      toast.error('imagen demasiado grande (max 20mb)', { theme: 'dark' })
      return
    }

    // subir foto a cloudinary y actualizar photoUrl en el user de firestore
    const url = await uploadImageToCloudinary(file)
    if (!url) {
      console.error('Error uploading image')
    }

    await updateUser(currentUser, { photoURL: url })
    setCurrentUser({ ...currentUser, photoURL: url })
  }

  if (loading) {
    return <main className="container">Cargando...</main>
  }

  return (
    <>
      <HeaderDashboard />
      <h1>My Profile</h1>

      <main className="container">
        <section className="">
          <h2>{currentUser.username}</h2>
          <div>
            <img
              className="img-edit-profile"
              src={currentUser.photoURL}
              alt="your profile image"
            />
          </div>
        </section>

        {currentUser && (
          <section className="section-profile">
            <form
              onSubmit={handleSubmitChangeUsername}
              className="form form-inline"
            >
              <label className="form-label">New Username</label>
              <div className="input-button-row">
                <input
                  className="dashboard-input input-username-profile"
                  placeholder="Enter username"
                  type="text"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                  title="Solo letras y sin espacios al comienzo y final."
                />
                <button className="button-profile">Confirm</button>
              </div>
            </form>

            <form
              onSubmit={handleSubmitChangePhoto}
              className="form form-inline"
            >
              <label className="form-label" htmlFor="picture">
                New photo profile
              </label>
              <div className="input-button-row">
                <input id="picture" name='picture' type="file" required />
                <button className="button-profile">Confirm</button>
              </div>
            </form>
          </section>
        )}
      </main>
    </>
  )
}

