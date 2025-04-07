import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usernameExists } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'

export default function PublicProfile() {
  const navigate = useNavigate()
  const { username } = useParams()
  const { currentUser } = useAuth()

  const [exists, setExists] = useState(null)

  useEffect(() => {
    usernameExists(username).then(
      res => {
        setExists(res)
      },
      [exists]
    )
  })

  if (exists === false) {
    navigate('/user/notFound')
  }

  // render su data -> photoURL, username, links[id, title, url]
  return (
    <>
      <main>
        <h1>{currentUser.username}</h1>
        <div>
          <img src={currentUser.photoURL} alt="profile img" />
        </div>
        <section>
          {currentUser.links.map(link => (
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
