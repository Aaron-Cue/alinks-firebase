import { useNavigate } from 'react-router-dom'

export default function Inicio() {

  const navigate = useNavigate()
  
  return (
    <>
      <div>
        Quiero mis A-links
        <button
          onClick={() => {
            navigate('/login')
          }}
        >
          Crear Cuenta
        </button>
      </div>
      <h1>alinks App</h1>
    </>
  )
}
