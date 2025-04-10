import { toast } from 'react-toastify'
import HeaderDashboard from '../components/HeaderDashboard'
import { updateUser } from '../firebase/firestore.js'
import useAuth from '../hooks/useAuth.js'
import { uploadImageToCloudinary } from '../services/cloudinary'

export default function EditProfile() {
  const { currentUser, setCurrentUser, loading } = useAuth()

  const handleSubmitChangeUsername = async e => {
    e.preventDefault()
    const newUsername = e.target[0].value

    // actualizar el username en firestore y en el estado de currentUser
    const res = await updateUser(currentUser, { username: newUsername })
   
    if (res) setCurrentUser({ ...currentUser, username: newUsername })
    else console.error('Error updating username')
  }

  const handleSubmitChangePhoto = async e => {
    e.preventDefault()
    const file = e.target[0].files[0]

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
    return <p>Cargando...</p>
  }

  return (
    <>
      <HeaderDashboard />
      <h1>My Profile</h1>

      <section>
        <h2>Username </h2>
        <p>{currentUser.username}</p>
        <div>
          <img src={currentUser.photoURL} alt="your profile image" />
        </div>
      </section>

      {currentUser && (
        <>
          <form onSubmit={handleSubmitChangeUsername}>
            <label>
              New Username
              <input
                type="text"
                required
                minLength={3}
                maxLength={20}
                pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                title="Solo letras y sin espacios al comienzo y final."
              />
            </label>
            <button>Confirm</button>
          </form>

          <form onSubmit={handleSubmitChangePhoto}>
            <label>
              new photo profile
              <input type="file" required />
            </label>
            <button>Confirm</button>
          </form>
        </>
      )}
    </>
  )
}
