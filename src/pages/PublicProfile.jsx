import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, usernameExists } from '../firebase/firestore'

export default function PublicProfile() {
  const navigate = useNavigate()
  const { username } = useParams()

  const [exists, setExists] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    usernameExists(username).then(res => setExists(res))

    getUser(username).then(res => {
      setUser(res)
    })
  }, [username])

  if (exists === false) {
    navigate('/user/notFound')
  }

  // render su data -> photoURL, username, links[id, title, url]
  if (user) {
    return (
      <>
        <main>
          <h1>{user?.username}</h1>
          <div>
            <img src={user?.photoURL} alt="profile img" />
          </div>
          <section>
            {user?.links.map(link => (
              <div key={link.id}>
                <h2>{link.title}</h2>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                </a>
              </div>
            ))}
          </section>
        </main>
      </>
    )
  }
}
