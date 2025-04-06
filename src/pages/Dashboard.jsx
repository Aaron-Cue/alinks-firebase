import { useEffect, useRef, useState } from 'react'
import HeaderDashboard from '../components/HeaderDashboard'
import { getLinksUser, updateUser } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'

export default function Dashboard() {
  const { currentUser } = useAuth()

  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  const titleRef = useRef()
  const urlRef = useRef()

  useEffect(() => {
    const fetchLinks = async () => {
      if (currentUser) {
        const linksUser = await getLinksUser(currentUser)
        setLinks(linksUser)
        setLoading(false)
      }
    }

    fetchLinks()
  }, [currentUser])

  const handleSubmitCreateLink = async e => {
    e.preventDefault()
    const title = titleRef.current.value
    const url = urlRef.current.value
    const id = crypto.randomUUID()
    const link = { title, url, id }

    const updatedLinks = [...links, link]
    // local
    setLinks(updatedLinks) 
    // firestore
    await updateUser(currentUser, { links: updatedLinks }) 
    titleRef.current.value = ''
    urlRef.current.value = ''
  }
  
  const deleteLink = (id) => {
    const updatedLinks = links.filter(link => link.id !== id)
    setLinks(updatedLinks)
    updateUser(currentUser, { links: updatedLinks }) 
  }

  if (loading) return <p>Cargando...</p>

  return (
    <>
      <HeaderDashboard />
      <div>
        <h1>Hola, {currentUser.username}</h1>
      </div>

      <form onSubmit={handleSubmitCreateLink}>
        <label>
          Title
          <input
            type="text"
            ref={titleRef}
            placeholder="Instagram, Github, Tienda Online"
            minLength={2}
            maxLength={18}
            required
          />
        </label>
        <label>
          Url
          <input
            type="text"
            ref={urlRef}
            placeholder="Github.com/User"
            minLength={4}
            required
          />
        </label>
        <button type="submit">Create Link</button>
      </form>

      <h3>My Links</h3>
      <div className="links-container">
        {links.map(({ title, url, id }) => (
          <article className="link-card" key={id}>
            <div>
              <h4>{title}</h4>
              <p>{url}</p>
            </div>
            <div>
              <button onClick={() => deleteLink(id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  strokeWidth="2"
                >
                  <path d="M4 7l16 0"></path>
                  <path d="M10 11l0 6"></path>
                  <path d="M14 11l0 6"></path>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
