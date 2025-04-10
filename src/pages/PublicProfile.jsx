import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, usernameExists } from '../firebase/firestore'

export default function PublicProfile() {
  const navigate = useNavigate()
  const { username } = useParams()

  const [exists, setExists] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const lowerUsername = username.toLowerCase()
    
    usernameExists(lowerUsername).then(res => {
      setExists(res) 
      console.log('res',res)
    })

    if (exists === false) {
      navigate('/user/notFound')
    }

    getUser(username).then(res => {
      setUser(res)
    })
  }, [username, exists, navigate])

  

  // mostrar si hay datos
  if (user) {
    return (
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
    )
  }
}