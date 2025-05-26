import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, usernameExists } from '../firebase/firestore'

import '../styles/PublicProfile.css'

export default function PublicProfile() {
  const navigate = useNavigate()
  const { username } = useParams()

  const [exists, setExists] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const lowerUsername = username.toLowerCase()

    usernameExists(lowerUsername).then(res => {
      setExists(res)
    })

    if (exists === false) {
      navigate('/user/notFound')
      return
    }

    getUser(username).then(res => {
      setUser(res)
    })
  }, [username, exists, navigate])

  const normalizeUrl = url => {
    if (url.startsWith('https://')) {
      return url
    } else if (url.startsWith('www')) {
      return `https://${url}`
    }
    return `https://www.${url}`
  }

  if (user === null) {
    return (
      <div className="background">
        <div className="center">
          <div className="skeleton-img" />
          <h1 className="skeleton-text">Cargando perfil...</h1>
          <div className="skeleton-links">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-link-card" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="background">
      <div className="center">
        <img className="img-profile" src={user?.photoURL} alt="profile img" />
      </div>
      <h1 className="h1-public">{user?.username}</h1>
      <main className="container">
        <section className="container">
          {user?.links.map(link => (
            <a
              key={link.id}
              href={normalizeUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="public-link-card"
            >
              <h2 className="public-link-title">{link.title}</h2>
            </a>
          ))}
        </section>
      </main>
    </div>
  )
}
