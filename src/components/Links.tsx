import { updateUser } from '../firebase/firestore'
import useAuth from '../hooks/useAuth'
import { Link } from '../types/user'

import '../styles/Links.css'

interface LinksProps {
  linksRender: Link[]
  setLinksRender: React.Dispatch<React.SetStateAction<Link[]>>
}

export default function Links({ linksRender, setLinksRender }: LinksProps) {
  const { currentUser } = useAuth()
  const deleteLink = (id: string) => {
    const updatedLinks = linksRender.filter(link => link.id !== id)
    setLinksRender(updatedLinks)
    if (!currentUser) {
      console.error('No current user found')
      return
    }
    updateUser(currentUser, { links: updatedLinks })
  }

  return (
    <>
      {linksRender.map(({ title, url, id }) => (
        <article className="link-card" key={id}>
          <div>
            <h4>{title}</h4>
            <p>{url}</p>
          </div>
          <button className="delete-button" onClick={() => deleteLink(id)}>
            <svg viewBox="0 0 448 512" className="delIcon">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </button>
        </article>
      ))}
    </>
  )
}
