import HeaderDashboard from '../components/HeaderDashboard'
import useAuth from '../hooks/useAuth.js'

export default function EditProfile() {
  const { currentUser } = useAuth()

  const handleChangeUsername = async () => {}

  const handleChangePhoto = async () => {}

  return (
    <>
      <HeaderDashboard />
      <h1>My Profile</h1>
      {currentUser && (
        <>
          <form>
            <label>
              New Username
              <input type="text" />
            </label>
            <button onClick={handleChangeUsername}>Confirm</button>
          </form>
          
          <form>
            <label>
              new photo profile
              <input type="file" />
            </label>
            <button onClick={handleChangePhoto}>Confirm</button>
          </form>
        </>
      )}
    </>
  )
}
