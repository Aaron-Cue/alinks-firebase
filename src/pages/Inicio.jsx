import { useNavigate } from 'react-router-dom'

import '../styles/Inicio.css'

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <>
      <header className="header-inicio">
        <div className="header-content">
          <div className="logo">
            <img src="src/assets/logo.png" alt="" />
            A-Links
          </div>
          <button className="inicio-button" onClick={() => navigate('/login')}>
            <span className="button_top"> Crear Cuenta </span>
          </button>
        </div>
      </header>
      <main className="container main-inicio">
        <div className="inicio-content">
          <h1 className="h1-inicio">
            Coloque todos los enlaces necesarios en un solo lugar
          </h1>
          <p>
            <i>Quiero obtener mis links</i>
          </p>
          <button
            className="inicio-button"
            onClick={() => {
              navigate('/login')
            }}
          >
            <span className="button_top"> Obtener </span>
          </button>
        </div>
        <div className="screen">
          <img src="/src/assets/imageApp.webp" alt="" />
        </div>
      </main>
    </>
  )
}
