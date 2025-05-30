import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import HeaderDashboard from '../components/HeaderDashboard'
import Links from '../components/Links'
import { getLinksUser, updateUser } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'
import { Link } from '../types/user'

import '../styles/Dashboard.css'

export default function Dashboard() {
  const { currentUser } = useAuth()

  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const titleRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

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

  const handleSubmitCreateLink = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const title = titleRef.current?.value ?? ''
    const url = urlRef.current?.value ?? ''
    const id = crypto.randomUUID()
    const link = { title, url, id }

    const updatedLinks = [...links, link] 
    // local
    setLinks(updatedLinks)

    // firestore
    if (!currentUser) {
      console.error('No current user found')
      return
    }
    await updateUser(currentUser, { links: updatedLinks })

    // limpiar inputs
    if (!titleRef.current || !urlRef.current) return

    titleRef.current.value = ''
    urlRef.current.value = ''
  }

  if (loading) return <main className="container">Cargando...</main>

  return (
    <>
      <HeaderDashboard />
      
      <h1 className="dashboard-h1">Hola, {currentUser?.username}</h1>
      <main className="container">
        <form onSubmit={handleSubmitCreateLink}>
          <div className="inputs-container">
            <label>
              Title
              <input
                className="dashboard-input"
                type="text"
                ref={titleRef}
                placeholder="Instagram, Github, etc."
                minLength={2}
                maxLength={18}
                required
              />
            </label>
            <label>
              Url
              <input
                className="dashboard-input"
                type="text"
                ref={urlRef}
                placeholder="Github.com/User"
                minLength={4}
                required
              />
            </label>
          </div>
          <Button>Create Link</Button>
        </form>

        <section className="links">
          <h3>My Links</h3>
          <div className="links-container container">
            <Links linksRender={links} setLinksRender={setLinks} />
          </div>
        </section>
      </main>
    </>
  )
}
