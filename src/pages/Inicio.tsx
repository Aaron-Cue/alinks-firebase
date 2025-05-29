import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

import '../styles/Inicio.css'

export default function Inicio() {
  const navigate = useNavigate()
  
  const handleClickGoLogin = () => {
    navigate('/login')
  }

  return (
    <> 
      <header className="header-inicio">
        <div className="header-content">
          <div className="logo">
            <img src="/assets/logo.png" alt="logo de la app" />
            A-Links
          </div>
          <Button onClick={handleClickGoLogin}>Iniciar Sesion</Button>
        </div>
      </header>
      <main className="container main-inicio">
        <div className="inicio-content">
          <h1 className="h1-inicio">
            Coloque todos sus enlaces en un solo lugar
          </h1>
          <p>
            <i>Quiero obtener mis links</i>
          </p>
          <Button onClick={handleClickGoLogin}>Crear Cuenta</Button>
        </div>
        <div className="screen">
          <img src="/assets/imageApp.webp" alt="previsualizacion de la app" />
        </div>
      </main>
    </>
  )
}
